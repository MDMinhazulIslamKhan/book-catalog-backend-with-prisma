import { z } from 'zod';

const UpdateUserZodSchema = z.object({
  body: z
    .object({
      name: z.string().optional(),
      role: z.enum(['admin', 'customer'] as [string, ...string[]]).optional(),
      email: z.string().optional(),
      contactNo: z.string().optional(),
      address: z.string().optional(),
      profileImg: z.string().optional(),
    })
    .strict(),
});
export const UsersValidation = {
  UpdateUserZodSchema,
};
