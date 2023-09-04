import { UserInfoFromToken } from '../../../interfaces/common';
import prisma from '../../../shared/prisma';
import { UserResult } from '../users/users.interface';

const GetProfileData = async (user: UserInfoFromToken): Promise<UserResult> => {
  const result = await prisma.user.findUnique({
    where: { id: user.userId },
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

  return result!;
};

export const ProfileService = {
  GetProfileData,
};
