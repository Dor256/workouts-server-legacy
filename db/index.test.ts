import { repository } from '.';
import fs from 'fs/promises';

describe('Repository', () => {
  it('returns workouts', async () => {
    fs.readFile = jest.fn();
    const mockWorkouts = [{ name: 'mockWorkout' }];
    JSON.parse = jest.fn().mockReturnValue(mockWorkouts);

    const workouts = await repository.getWorkouts();

    expect(workouts).toEqual(mockWorkouts);
  });

  it('adds workout to DB', async () => {
    JSON.parse = jest.fn().mockReturnValue([]);
    fs.writeFile = jest.fn();
    const workout = { name: 'mockWorkout' };

    await repository.addWorkout(workout);

    expect(fs.writeFile).toHaveBeenCalledWith(expect.any(String), JSON.stringify([workout]));
  });
});