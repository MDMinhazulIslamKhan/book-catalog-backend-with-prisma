"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const CreateOrder = (user, bookData) => __awaiter(void 0, void 0, void 0, function* () {
    if (!bookData.length) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'You must send bookId!');
    }
    yield Promise.all(bookData.map((book) => __awaiter(void 0, void 0, void 0, function* () {
        const findBook = yield prisma_1.default.book.findUnique({
            where: {
                id: book.bookId,
            },
        });
        if (!findBook) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, `There is no book with this bookId (${book.bookId})!`);
        }
    })));
    const result = yield prisma_1.default.order.create({
        data: {
            userId: user.userId,
            orderedBooks: bookData,
        },
    });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, 'Failed to create order!');
    }
    return result;
});
const GetAllOrders = (user) => __awaiter(void 0, void 0, void 0, function* () {
    let result;
    if (user.role === 'admin') {
        result = yield prisma_1.default.order.findMany({
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
    }
    else {
        result = yield prisma_1.default.order.findMany({ where: { userId: user.userId } });
    }
    return result;
});
const GetSingleOrder = (user, orderId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.order.findUnique({
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
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'No order is matching with this id!');
    }
    if (user.role !== 'admin' && result.userId !== user.userId) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Access Denied, this is not your order!');
    }
    return result;
});
exports.OrderService = {
    CreateOrder,
    GetAllOrders,
    GetSingleOrder,
};
