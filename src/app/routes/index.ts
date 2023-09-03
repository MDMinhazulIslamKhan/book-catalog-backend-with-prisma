import express from 'express';

const router = express.Router();

const moduleRoutes = [
  // ... routes
  // {
  //   path: '/users',
  //   route: UsersRoutes,
  // },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export const ApplicationRouters = router;
