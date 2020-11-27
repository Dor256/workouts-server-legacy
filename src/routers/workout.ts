import { Router } from 'express';
import { IWorkout, repository } from '../../db';
import { CODE } from '../consts';

export const workoutRouter = Router();

workoutRouter.get('/', async (req, res) => {
  const workouts = await repository.getWorkouts();
  res.status(CODE.OK).send(workouts);
});

workoutRouter.post('/', async (req, res) => {
  const workout: IWorkout = req.body;
  if (!workout?.name) {
    res.status(CODE.BAD_REQUEST);
  } else {
    await repository.addWorkout(workout);
    res.status(CODE.OK);
  }
  res.send();
});
