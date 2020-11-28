import { Router } from 'express';
import { IWorkout, repository } from '../../db';
import { STATUS } from '../consts';

export const workoutRouter = Router();

workoutRouter.get('/', async (req, res) => {
  const workouts = await repository.getWorkouts();
  res.status(STATUS.OK).send(workouts);
});

workoutRouter.post('/', async (req, res) => {
  const workout: IWorkout = req.body;
  if (!workout?.name) {
    res.status(STATUS.BAD_REQUEST);
  } else {
    await repository.addWorkout(workout);
    res.status(STATUS.OK);
  }
  res.send();
});
