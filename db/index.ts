import fs from 'fs/promises';
import path from 'path';

type DB = IWorkout[];

export type IWorkout = {
  name: string;
};

async function read(): Promise<DB> {
  return JSON.parse(await fs.readFile(path.resolve(__dirname, './db.json'), 'utf-8'));
}

async function write(db: DB): Promise<void> {
  await fs.writeFile(path.resolve(__dirname, './db.json'), JSON.stringify(db));
}

type Repository = {
  getWorkouts(): Promise<IWorkout[]>;
  addWorkout(workout: IWorkout): Promise<void>;
}

export const repository: Repository = {
  async getWorkouts(): Promise<IWorkout[]> {
    return await read();
  },

  async addWorkout(workout: IWorkout) {
    const db = await read();
    const updatedDB = [...db, workout];

    await write(updatedDB);
  }
};
