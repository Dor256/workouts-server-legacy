import express, { json } from 'express';
import { workoutRouter } from './routers/workout';
import { authRouter } from './routers/auth';

const PORT = process.env.PORT ?? 3000;

const app = express();

app.use(json());
app.use((_, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/workout', workoutRouter);
app.use('/auth', authRouter);

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
