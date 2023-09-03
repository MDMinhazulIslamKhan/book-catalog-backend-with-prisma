import { User } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';
import { UserResult } from './users.interface';

const GetAllUsers = async (): Promise<UserResult[]> => {
  const result = await prisma.user.findMany({
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

  return result;
};

const GetSingleUser = async (id: string): Promise<UserResult | null> => {
  const result = await prisma.user.findUnique({
    where: {
      id,
    },
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
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'No user is matching with this id.'
    );
  }

  return result;
};

const UpdateUser = async (
  id: string,
  updatedData: Partial<User>
): Promise<UserResult | null> => {
  const result = await prisma.user.update({
    where: {
      id,
    },
    data: updatedData,
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
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'No user is matching with this id.'
    );
  }
  return result;
};

const DeleteUser = async (id: string): Promise<UserResult | null> => {
  const result = await prisma.user.delete({
    where: {
      id,
    },
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

  return result;
};
export const UsersService = {
  GetAllUsers,
  GetSingleUser,
  UpdateUser,
  DeleteUser,
};
