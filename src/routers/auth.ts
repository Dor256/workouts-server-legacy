import { Request, Router } from 'express';
import { STATUS } from '../consts';
import { IUser, userRepository } from '../../db/users';
import { generateHash } from '../utils';

type RequestBody = Omit<IUser, 'salt'>;

export const authRouter = Router();

authRouter.post('/login', async (req, res) => {
  const { password, email } = req.body;
  const user = await userRepository.getUser(email);
  const authenticated = user?.password === generateHash(password) + user?.salt;
  if (!authenticated || !user) {
    res.status(STATUS.UNAUTHORIZED).send('Error 401: Unauthorized!');
  } else {
    res.status(STATUS.OK).send({ id: user.id }); 
  }
});

authRouter.post('/signup', async (req: Request<any, any, RequestBody>, res) => {
  const user = req.body;
  await userRepository.addUser(user);
  res.status(STATUS.OK).send();
});
