import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middleware/auth';
import validateRequest from '../../middleware/validateRequest';
import { CategoryController } from './category.controller';
import { CategoryValidation } from './category.validation';
const router = express.Router();

router.get('/', CategoryController.GetAllCategories);

router.get('/:id', CategoryController.GetSingleCategory);

router.patch(
  '/:id',
  validateRequest(CategoryValidation.CreateOrUpdateCategoryZodSchema),
  auth(ENUM_USER_ROLE.ADMIN),
  CategoryController.UpdateCategory
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  CategoryController.DeleteCategory
);

router.post(
  '/create-category',
  validateRequest(CategoryValidation.CreateOrUpdateCategoryZodSchema),
  auth(ENUM_USER_ROLE.ADMIN),
  CategoryController.CreateCategory
);

export const CategoryRoutes = router;
