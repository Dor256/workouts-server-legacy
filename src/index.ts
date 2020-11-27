import express, { json } from 'express';
import { workoutRouter } from './routers/workout';

const PORT = process.env.PORT ?? 8080;

const app = express();

app.use(json());
app.use('/workout', workoutRouter);

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
