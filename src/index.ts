import express, { json } from 'express';
import { IWorkout, repository } from '../db';
import { CODE } from './consts';

const PORT = process.env.PORT ?? 8080;

const app = express();

app.use(json());

app.get('/', async (req, res) => {
  const workouts = await repository.getWorkouts();
  res.status(CODE.OK).send(workouts);
});

app.post('/', async (req, res) => {
  const workout: IWorkout = req.body;
  if (!workout?.name) {
    res.status(CODE.BAD_REQUEST);
  } else {
    await repository.addWorkout(workout);
    res.status(CODE.OK);
  }
  res.send();
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
