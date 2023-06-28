import express from 'express';
import cors from 'cors';
import diagnosesRouter from './routes/diagnoses';
import patientsRouter from './routes/patients';
import middleware from './utils/middleware';
import path from 'path';

const app = express();

app.use(express.static('client'));

app.use(cors());
app.use(express.json());
app.use(middleware.loggerRequest);

app.get('/api/ping', (_req, res) => {
    res.send("pong");
});

app.use('/api/diagnoses', diagnosesRouter);
app.use('/api/patients', patientsRouter);


app.use(middleware.errorHandler);
app.use((_req, res) => {
    res.sendFile(path.join(__dirname, "..", "../client", "index.html"));
  });
app.use(middleware.unknowEndpoint);

export default app;