import Mongoose, { Document, Schema } from 'mongoose';

export type IWorkout = {
  name: string;
};

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

async function deleteWorkout(id: string) {
  await Workout.findByIdAndDelete(id);
}

type WorkoutsRepository = {
  getWorkouts(): Promise<IWorkout[]>;
  addWorkout(workout: IWorkout): Promise<void>;
  deleteWorkout(id: string): Promise<void>;
}

export const workoutRepository: WorkoutsRepository = {
  async getWorkouts(): Promise<IWorkout[]> {
    return await getWorkouts();
  },

  async addWorkout(workout: IWorkout) {
    await addWorkout(workout);
  },
  
  async deleteWorkout(id: string) {
    await deleteWorkout(id);
  }
};
