"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middleware/auth"));
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const users_controller_1 = require("./users.controller");
const users_validation_1 = require("./users.validation");
const router = express_1.default.Router();
router.get('/', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), users_controller_1.UsersController.GetAllUsers);
router.get('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), users_controller_1.UsersController.GetSingleUser);
router.patch('/:id', (0, validateRequest_1.default)(users_validation_1.UsersValidation.UpdateUserZodSchema), (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), users_controller_1.UsersController.UpdateUser);
router.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), users_controller_1.UsersController.DeleteUser);
exports.UsersRoutes = router;
