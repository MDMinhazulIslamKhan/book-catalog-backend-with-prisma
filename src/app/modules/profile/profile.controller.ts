import { Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import { UserInfoFromToken } from '../../../interfaces/common';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { ProfileService } from './profile.service';

const GetProfileData: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const user = req.user;
    const result = await ProfileService.GetProfileData(
      user as UserInfoFromToken
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      data: result,
      message: 'Profile retrieved successfully.',
    });
  }
);

export const ProfileController = {
  GetProfileData,
};
