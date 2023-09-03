import { z } from 'zod';

const CreateOrUpdateCategoryZodSchema = z.object({
  body: z.object({
    title: z.string({ required_error: 'Title is required.' }),
  }),
});
export const CategoryValidation = {
  CreateOrUpdateCategoryZodSchema,
};
