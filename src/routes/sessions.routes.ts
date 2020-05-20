import { Router } from 'express';

const sessionsRouter = Router();

import AuthenticateUserService from './../services/AuthenticateUserService';

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const authenticateuser = new AuthenticateUserService();

  const { user, token } = await authenticateuser.execute({ email, password });

  delete user.password;

  return response.json({ user, token });
});

export default sessionsRouter;
