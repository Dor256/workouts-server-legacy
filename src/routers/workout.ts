import { Request, Router } from 'express';
import { IWorkout, workoutRepository } from '../../db/workouts';
import { STATUS } from '../consts';

type RequestBody = Partial<IWorkout>;
type RequestParams = {
  id?: string;
};

export const workoutRouter = Router();

workoutRouter.get('/', async (_, res) => {
  const workouts = await workoutRepository.getWorkouts();
  res.status(STATUS.OK).send(workouts);
});

workoutRouter.post('/', async (req: Request<any, any, RequestBody>, res) => {
  const workout = req.body?.name ? { name: req.body.name } : undefined;
  if (!workout) {
    res.status(STATUS.BAD_REQUEST);
  } else {
    await workoutRepository.addWorkout(workout);
    res.status(STATUS.OK);
  }
  res.send();
});

workoutRouter.delete('/:id', async (req: Request<RequestParams>, res) => {
  const workoutId = req.params.id;
  if (workoutId) {
    await workoutRepository.deleteWorkout(workoutId);
    res.status(STATUS.OK);
  } else {
    res.status(STATUS.BAD_REQUEST);
  }
  res.send();
});
