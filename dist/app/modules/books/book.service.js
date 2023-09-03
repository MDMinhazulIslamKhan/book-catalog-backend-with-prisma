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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const book_constant_1 = require("./book.constant");
const CreateBook = (bookData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.book.create({
        data: bookData,
        include: {
            category: true,
        },
    });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, 'Failed to create user!');
    }
    return result;
});
const GetAllBooks = (filters, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { size, page, skip } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    const { searchTerm, minPrice = 0, maxPrice = 1000000, category } = filters, filterData = __rest(filters, ["searchTerm", "minPrice", "maxPrice", "category"]);
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
            OR: book_constant_1.bookSearchableFields.map(field => ({
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
                    equals: filterData[key],
                },
            })),
        });
    }
    const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};
    const total = yield prisma_1.default.book.count({ where: whereConditions });
    const result = yield prisma_1.default.book.findMany({
        where: whereConditions,
        skip,
        take: size,
        include: { category: true },
        orderBy: options.sortBy && options.sortOrder
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
});
const GetBooksByCategory = (categoryId, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { size, page, skip } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    const total = yield prisma_1.default.book.count({
        where: {
            categoryId,
        },
    });
    const result = yield prisma_1.default.book.findMany({
        where: {
            categoryId,
        },
        skip,
        take: size,
        include: { category: true },
        orderBy: options.sortBy && options.sortOrder
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
});
const GetSingleBook = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.book.findUnique({
        where: {
            id,
        },
        include: {
            category: true,
        },
    });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'No book is matching with this id!');
    }
    return result;
});
const UpdateBook = (id, updatedData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.book.update({
        where: {
            id,
        },
        data: updatedData,
        include: {
            category: true,
        },
    });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'No user is matching with this id.');
    }
    return result;
});
const DeleteBook = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.book.delete({
        where: {
            id,
        },
        include: {
            category: true,
        },
    });
    return result;
});
exports.BookService = {
    CreateBook,
    GetAllBooks,
    GetBooksByCategory,
    GetSingleBook,
    UpdateBook,
    DeleteBook,
};
