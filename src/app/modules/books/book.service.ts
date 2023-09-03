import { Book, Prisma } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { bookSearchableFields } from './book.constant';
import { IBookFilters } from './book.interface';

const CreateBook = async (bookData: Book): Promise<Book> => {
  const result = await prisma.book.create({
    data: bookData,
    include: {
      category: true,
    },
  });
  if (!result) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Failed to create user!'
    );
  }
  return result;
};

const GetAllBooks = async (
  filters: IBookFilters,
  options: IPaginationOptions
): Promise<IGenericResponse<Book[]>> => {
  const { size, page, skip } = paginationHelpers.calculatePagination(options);
  const {
    searchTerm,
    minPrice = 0,
    maxPrice = 1000000,
    category,
    ...filterData
  } = filters;

  const andConditions = [];

  // for filter price
  andConditions.push({
    AND: [{ price: { gte: +minPrice } }, { price: { lte: +maxPrice } }],
  });

  // for category search
  if (category) {
    andConditions.push({
      AND: [
        {
          categoryId: {
            equals: category,
          },
        },
      ],
    });
  }

  // for filter data
  if (searchTerm) {
    andConditions.push({
      OR: bookSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  // for search data
  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map(key => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }

  const whereConditions: Prisma.BookWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const total = await prisma.book.count({ where: whereConditions });
  const result = await prisma.book.findMany({
    where: whereConditions,
    skip,
    take: size,
    include: { category: true },
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : {
            title: 'asc',
          },
  });
  return {
    meta: {
      page,
      size,
      total,
      totalPage: Math.ceil(total / size),
    },
    data: result,
  };
};

const GetBooksByCategory = async (
  categoryId: string,
  options: IPaginationOptions
): Promise<IGenericResponse<Book[]>> => {
  const { size, page, skip } = paginationHelpers.calculatePagination(options);

  const total = await prisma.book.count({
    where: {
      categoryId,
    },
  });
  const result = await prisma.book.findMany({
    where: {
      categoryId,
    },
    skip,
    take: size,
    include: { category: true },
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : {
            title: 'asc',
          },
  });
  return {
    meta: {
      page,
      size,
      total,
      totalPage: Math.ceil(total / size),
    },
    data: result,
  };
};

const GetSingleBook = async (id: string): Promise<Book> => {
  const result = await prisma.book.findUnique({
    where: {
      id,
    },
    include: {
      category: true,
    },
  });
  if (!result) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'No book is matching with this id!'
    );
  }
  return result;
};

const UpdateBook = async (
  id: string,
  updatedData: Partial<Book>
): Promise<Book | null> => {
  const result = await prisma.book.update({
    where: {
      id,
    },
    data: updatedData,
    include: {
      category: true,
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

const DeleteBook = async (id: string): Promise<Book> => {
  const result = await prisma.book.delete({
    where: {
      id,
    },
    include: {
      category: true,
    },
  });

  return result;
};
export const BookService = {
  CreateBook,
  GetAllBooks,
  GetBooksByCategory,
  GetSingleBook,
  UpdateBook,
  DeleteBook,
};
