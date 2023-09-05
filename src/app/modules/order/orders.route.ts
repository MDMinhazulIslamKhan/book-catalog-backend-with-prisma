import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middleware/auth';
import validateRequest from '../../middleware/validateRequest';
import { OrderController } from './orders.controller';
import { OrderValidation } from './orders.validation';
const router = express.Router();

router.post(
  '/create-order',
  validateRequest(OrderValidation.CreateOrdersZodSchema),
  auth(ENUM_USER_ROLE.CUSTOMER),
  OrderController.CreateOrder
);

router.get(
  '/',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.CUSTOMER),
  OrderController.GetAllOrders
);

router.get(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.CUSTOMER),
  OrderController.GetSingleOrder
);

export const OrderRoutes = router;
