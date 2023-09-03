import { Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { AuthService } from './auth.service';

const CreateUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await AuthService.CreateUser(req.body);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      data: result,
      message: 'User created successfully!',
    });
  }
);
const LoginUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const token = await AuthService.LoginUser(req.body);

    res.send({
      statusCode: httpStatus.OK,
      success: true,
      message: 'User signin successfully!',
      ...token,
    });
  }
);

export const AuthController = {
  LoginUser,
  CreateUser,
};
