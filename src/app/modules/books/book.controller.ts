import { Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { bookFilterableFields } from './book.constant';
import { BookService } from './book.service';

const CreateBook: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await BookService.CreateBook(req.body);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      data: result,
      message: 'Book created successfully.',
    });
  }
);

const GetAllBooks: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, bookFilterableFields);
    const options = pick(req.query, paginationFields);

    const result = await BookService.GetAllBooks(filters, options);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      meta: result.meta,
      data: result.data,
      message: 'Books fetched successfully.',
    });
  }
);

const GetBooksByCategory: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const options = pick(req.query, paginationFields);

    const result = await BookService.GetBooksByCategory(
      req.params.categoryId,
      options
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      meta: result.meta,
      data: result.data,
      message: 'Books with associated category data fetched successfully.',
    });
  }
);

const GetSingleBook: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await BookService.GetSingleBook(req.params.id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      data: result,
      message: 'Book fetched successfully.',
    });
  }
);

const UpdateBook: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await BookService.UpdateBook(req.params.id, req.body);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      data: result,
      message: 'Book updated successfully.',
    });
  }
);

const DeleteBook: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await BookService.DeleteBook(req.params.id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      data: result,
      message: 'Book is deleted successfully.',
    });
  }
);

export const BookController = {
  CreateBook,
  GetAllBooks,
  GetBooksByCategory,
  GetSingleBook,
  UpdateBook,
  DeleteBook,
};
