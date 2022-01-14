import UsersRepository from '@modules/users/infra/prisma/repositories/UsersRepository';
import IUsersRepository from '@modules/users/infra/repositories/IUsersRepository';
import { container } from 'tsyringe';

import '@shared/container/providers';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);
