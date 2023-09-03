import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { AuthController } from './auth.controller';
import { AuthValidation } from './auth.validation';
const router = express.Router();

router.post(
  '/signup',
  validateRequest(AuthValidation.CreateUserZodSchema),
  AuthController.CreateUser
);

router.post(
  '/signin',
  validateRequest(AuthValidation.LoginUserZodSchema),
  AuthController.LoginUser
);

export const AuthRoutes = router;
