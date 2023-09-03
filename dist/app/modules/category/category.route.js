"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middleware/auth"));
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const category_controller_1 = require("./category.controller");
const category_validation_1 = require("./category.validation");
const router = express_1.default.Router();
router.get('/', category_controller_1.CategoryController.GetAllCategories);
router.get('/:id', category_controller_1.CategoryController.GetSingleCategory);
router.patch('/:id', (0, validateRequest_1.default)(category_validation_1.CategoryValidation.CreateOrUpdateCategoryZodSchema), (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), category_controller_1.CategoryController.UpdateCategory);
router.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), category_controller_1.CategoryController.DeleteCategory);
router.post('/create-category', (0, validateRequest_1.default)(category_validation_1.CategoryValidation.CreateOrUpdateCategoryZodSchema), (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), category_controller_1.CategoryController.CreateCategory);
exports.CategoryRoutes = router;
