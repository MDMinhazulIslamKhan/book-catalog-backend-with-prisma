"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderValidation = void 0;
const zod_1 = require("zod");
const CreateOrdersZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        orderedBooks: zod_1.z.array(zod_1.z.object({
            bookId: zod_1.z.string({ required_error: 'Book Id is required.' }),
            quantity: zod_1.z.number({ required_error: 'Book quantity is required.' }),
        }, { required_error: 'Books are required.' }), { required_error: 'Ordered Books are required.' }),
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
exports.OrderValidation = {
    CreateOrdersZodSchema,
};
