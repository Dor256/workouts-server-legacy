import { Router } from 'express';
import crypto from 'crypto';
import { STATUS } from '../consts';

const hash = crypto.createHash('sha256');
export const authRouter = Router();

authRouter.post('/login', (req, res) => {
  const { password, email } = req.body;

  hash.update(password);
  console.log(hash.digest('hex'));
  res.status(STATUS.OK).send();
});
