import { Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { UsersService } from './users.service';

const GetAllUsers: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await UsersService.GetAllUsers();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      data: result,
      message: 'Users retrieved successfully.',
    });
  }
);

const GetSingleUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await UsersService.GetSingleUser(req.params.id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      data: result,
      message: 'User fetched successfully.',
    });
  }
);

const UpdateUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await UsersService.UpdateUser(req.params.id, req.body);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      data: result,
      message: 'User updated successfully.',
    });
  }
);

const DeleteUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await UsersService.DeleteUser(req.params.id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      data: result,
      message: 'User deleted successfully.',
    });
  }
);

export const UsersController = {
  GetAllUsers,
  GetSingleUser,
  UpdateUser,
  DeleteUser,
};
