import { Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { CategoryService } from './category.service';

const CreateCategory: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await CategoryService.CreateCategory(req.body);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      data: result,
      message: 'Category created successfully.',
    });
  }
);

const GetAllCategories: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await CategoryService.GetAllCategories();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      data: result,
      message: 'Categories fetched successfully.',
    });
  }
);

const GetSingleCategory: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await CategoryService.GetSingleCategory(req.params.id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      data: result,
      message: 'Category fetched successfully.',
    });
  }
);

const UpdateCategory: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await CategoryService.UpdateCategory(
      req.params.id,
      req.body
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      data: result,
      message: 'Category updated successfully.',
    });
  }
);

const DeleteCategory: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await CategoryService.DeleteCategory(req.params.id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      data: result,
      message: 'Category deleted successfully.',
    });
  }
);

export const CategoryController = {
  CreateCategory,
  GetAllCategories,
  GetSingleCategory,
  UpdateCategory,
  DeleteCategory,
};
