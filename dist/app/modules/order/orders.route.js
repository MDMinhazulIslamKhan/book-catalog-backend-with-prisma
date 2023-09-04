"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middleware/auth"));
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const orders_controller_1 = require("./orders.controller");
const orders_validation_1 = require("./orders.validation");
const router = express_1.default.Router();
router.post('/create-order', (0, validateRequest_1.default)(orders_validation_1.OrderValidation.CreateOrdersZodSchema), (0, auth_1.default)(user_1.ENUM_USER_ROLE.CUSTOMER), orders_controller_1.OrderController.CreateOrder);
router.get('/', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.CUSTOMER), orders_controller_1.OrderController.GetAllOrders);
router.get('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.CUSTOMER), orders_controller_1.OrderController.GetSingleOrder);
// router.patch(
//   '/:id',
//   validateRequest(OrderValidation.UpdateCategoryZodSchema),
//   auth(ENUM_USER_ROLE.ADMIN),
//   BookController.UpdateBook
// );
// router.delete('/:id', auth(ENUM_USER_ROLE.ADMIN), BookController.DeleteBook);
exports.OrderRoutes = router;
