import Mongoose, { Document, Schema } from 'mongoose';

const dbUrl = 'mongodb://workouts-db:27017';
Mongoose.connect(dbUrl, { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: true });

const WorkoutSchema = new Schema({
  name: String
});

const Workout = Mongoose.model<Document & IWorkout>('Program', WorkoutSchema, 'programs');

async function addWorkout(workout: IWorkout) {
  const newWorkout = new Workout(workout);
  newWorkout.isNew = true;
  await newWorkout.save();
}

async function getWorkoutById(id: string) {
  return await Workout.findById(id).exec();
}

async function getWorkoutByName(name: string) {
  return await Workout.findOne({ name }).exec();
}

async function getWorkouts() {
  return await Workout.find().exec();
}

export type IWorkout = {
  name: string;
};

type Repository = {
  getWorkouts(): Promise<IWorkout[]>;
  addWorkout(workout: IWorkout): Promise<void>;
}

export const repository: Repository = {
  async getWorkouts(): Promise<IWorkout[]> {
    return await getWorkouts();
  },

  async addWorkout(workout: IWorkout) {
    await addWorkout(workout);
  }
};
