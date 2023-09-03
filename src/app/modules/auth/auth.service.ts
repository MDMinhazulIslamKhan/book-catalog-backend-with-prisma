import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import prisma from '../../../shared/prisma';
import { ILoginUser, ILoginUserResponse } from './auth.interface';

const CreateUser = async (user: User): Promise<Partial<User>> => {
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  );
  const result = await prisma.user.create({
    data: user,
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      contactNo: true,
      address: true,
      profileImg: true,
    },
  });
  if (!result) {
    throw new ApiError(400, 'Failed to create user!');
  }
  return result;
};

const LoginUser = async (user: ILoginUser): Promise<ILoginUserResponse> => {
  const isUserExist = await prisma.user.findUnique({
    where: {
      email: user.email,
    },
  });

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User doesn't exist.");
  }

  if (!(await bcrypt.compare(user.password, isUserExist.password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect.');
  }

  const token = jwtHelpers.createToken(
    { role: isUserExist.role, userId: isUserExist.id },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );
  return {
    token,
  };
};

export const AuthService = {
  CreateUser,
  LoginUser,
};
