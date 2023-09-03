"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationRouters = void 0;
const express_1 = __importDefault(require("express"));
const auth_route_1 = require("../modules/auth/auth.route");
const book_route_1 = require("../modules/books/book.route");
const category_route_1 = require("../modules/category/category.route");
const users_route_1 = require("../modules/users/users.route");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/auth',
        route: auth_route_1.AuthRoutes,
    },
    {
        path: '/users',
        route: users_route_1.UsersRoutes,
    },
    {
        path: '/categories',
        route: category_route_1.CategoryRoutes,
    },
    {
        path: '/books',
        route: book_route_1.BookRoutes,
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.ApplicationRouters = router;
