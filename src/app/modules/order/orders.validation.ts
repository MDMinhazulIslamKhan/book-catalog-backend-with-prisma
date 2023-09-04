import { z } from 'zod';

const CreateOrdersZodSchema = z.object({
  body: z.object({
    orderedBooks: z.array(
      z.object(
        {
          bookId: z.string({ required_error: 'Book Id is required.' }),
          quantity: z.number({ required_error: 'Book quantity is required.' }),
        },
        { required_error: 'Books are required.' }
      ),
      { required_error: 'Ordered Books are required.' }
    ),
  }),
});

// const UpdateCategoryZodSchema = z.object({
//   body: z
//     .object({
//       title: z.string().optional(),
//       author: z.string().optional(),
//       genre: z.string().optional(),
//       price: z.number().optional(),
//       publicationDate: z.string().optional(),
//       categoryId: z.string().optional(),
//     })
//     .strict(),
// });

export const OrderValidation = {
  CreateOrdersZodSchema,
};
