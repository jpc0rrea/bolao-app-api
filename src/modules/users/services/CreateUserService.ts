import { User } from '@prisma/client';
import { inject, injectable } from 'tsyringe';

import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProvider';
import AppError from '@shared/errors/AppError';

import IUsersRepository from '../infra/repositories/IUsersRepository';

interface ICreateUserRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  permissionLevel?: number;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    firstName,
    lastName,
    email,
    password,
    passwordConfirmation,
    permissionLevel,
  }: ICreateUserRequest): Promise<User> {
    if (password !== passwordConfirmation) {
      throw new AppError('Password confirmation does not match');
    }

    const checkUserExists = await this.usersRepository.findByEmail(email);

    if (checkUserExists) {
      throw new AppError('Email address already used');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = await this.usersRepository.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      permissionLevel,
    });

    return user;
  }
}

export default CreateUserService;
