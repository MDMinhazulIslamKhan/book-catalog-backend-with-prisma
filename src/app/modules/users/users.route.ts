import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middleware/auth';
import validateRequest from '../../middleware/validateRequest';
import { UsersController } from './users.controller';
import { UsersValidation } from './users.validation';
const router = express.Router();

router.get('/', auth(ENUM_USER_ROLE.ADMIN), UsersController.GetAllUsers);

router.get('/:id', auth(ENUM_USER_ROLE.ADMIN), UsersController.GetSingleUser);

router.patch(
  '/:id',
  validateRequest(UsersValidation.UpdateUserZodSchema),
  auth(ENUM_USER_ROLE.ADMIN),
  UsersController.UpdateUser
);

router.delete('/:id', auth(ENUM_USER_ROLE.ADMIN), UsersController.DeleteUser);

export const UsersRoutes = router;
