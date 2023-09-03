import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middleware/auth';
import validateRequest from '../../middleware/validateRequest';
import { BookController } from './book.controller';
import { BookValidation } from './book.validation';
const router = express.Router();

router.post(
  '/create-book',
  validateRequest(BookValidation.CreateBookZodSchema),
  auth(ENUM_USER_ROLE.ADMIN),
  BookController.CreateBook
);

router.get('/', BookController.GetAllBooks);

router.get('/:categoryId/category', BookController.GetBooksByCategory);

router.get('/:id', BookController.GetSingleBook);

router.patch(
  '/:id',
  validateRequest(BookValidation.UpdateCategoryZodSchema),
  auth(ENUM_USER_ROLE.ADMIN),
  BookController.UpdateBook
);

router.delete('/:id', auth(ENUM_USER_ROLE.ADMIN), BookController.DeleteBook);

export const BookRoutes = router;
