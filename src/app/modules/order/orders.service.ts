import { Order } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { UserInfoFromToken } from '../../../interfaces/common';
import prisma from '../../../shared/prisma';
import { OrderedBook } from './orders.interface';

const CreateOrder = async (
  user: UserInfoFromToken,
  bookData: OrderedBook[]
): Promise<Order> => {
  if (!bookData.length) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'You must send bookId!');
  }
  await Promise.all(
    bookData.map(async book => {
      const findBook = await prisma.book.findUnique({
        where: {
          id: book.bookId,
        },
      });
      if (!findBook) {
        throw new ApiError(
          httpStatus.BAD_REQUEST,
          `There is no book with this bookId (${book.bookId})!`
        );
      }
    })
  );

  const result = await prisma.order.create({
    data: {
      userId: user.userId,
      orderedBooks: bookData,
    },
  });
  if (!result) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Failed to create order!'
    );
  }
  return result;
};

const GetAllOrders = async (user: UserInfoFromToken): Promise<Order[]> => {
  let result;

  if (user.role === 'admin') {
    result = await prisma.order.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
            contactNo: true,
            address: true,
            profileImg: true,
          },
        },
      },
    });
  } else {
    result = await prisma.order.findMany({ where: { userId: user.userId } });
  }

  return result;
};

const GetSingleOrder = async (
  user: UserInfoFromToken,
  orderId: string
): Promise<Order | null> => {
  const result = await prisma.order.findUnique({
    where: {
      id: orderId,
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          contactNo: true,
          address: true,
          profileImg: true,
        },
      },
    },
  });

  if (!result) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'No order is matching with this id!'
    );
  }

  if (user.role !== 'admin' && result.userId !== user.userId) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      'Access Denied, this is not your order!'
    );
  }
  return result;
};

export const OrderService = {
  CreateOrder,
  GetAllOrders,
  GetSingleOrder,
};
