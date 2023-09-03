import { z } from 'zod';

const CreateUserZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required',
    }),
    role: z.enum(['admin', 'customer'] as [string, ...string[]], {
      required_error: 'role is required',
    }),
    email: z.string({
      required_error: 'Email is required',
    }),
    password: z.string({
      required_error: 'Password is required',
    }),
    contactNo: z.string({
      required_error: 'Contact Number is required',
    }),
    address: z.string({
      required_error: 'Address is required',
    }),
    profileImg: z.string({
      required_error: 'Profile Img Url is required',
    }),
  }),
});

const LoginUserZodSchema = z.object({
  body: z.object({
    email: z.string({
      required_error: 'Email is required',
    }),
    password: z.string({
      required_error: 'Password is required',
    }),
  }),
});
export const AuthValidation = {
  CreateUserZodSchema,
  LoginUserZodSchema,
};
