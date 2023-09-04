import { Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import { UserInfoFromToken } from '../../../interfaces/common';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { OrderService } from './orders.service';

const CreateOrder: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const user = req.user;

    const result = await OrderService.CreateOrder(
      user as UserInfoFromToken,
      req.body.orderedBooks
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      data: result,
      message: 'Order created successfully.',
    });
  }
);

const GetAllOrders: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const user = req.user;
    const result = await OrderService.GetAllOrders(user as UserInfoFromToken);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      data: result,
      message: 'Orders retrieved successfully.',
    });
  }
);

const GetSingleOrder: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const user = req.user;
    const orderId = req.params.id;
    const result = await OrderService.GetSingleOrder(
      user as UserInfoFromToken,
      orderId
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      data: result,
      message: 'Order fetched successfully.',
    });
  }
);

export const OrderController = {
  CreateOrder,
  GetAllOrders,
  GetSingleOrder,
};
