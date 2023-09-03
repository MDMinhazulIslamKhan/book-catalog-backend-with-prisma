"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidation = void 0;
const zod_1 = require("zod");
const CreateUserZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: 'Name is required',
        }),
        role: zod_1.z.enum(['admin', 'customer'], {
            required_error: 'role is required',
        }),
        email: zod_1.z.string({
            required_error: 'Email is required',
        }),
        password: zod_1.z.string({
            required_error: 'Password is required',
        }),
        contactNo: zod_1.z.string({
            required_error: 'Contact Number is required',
        }),
        address: zod_1.z.string({
            required_error: 'Address is required',
        }),
        profileImg: zod_1.z.string({
            required_error: 'Profile Img Url is required',
        }),
    }),
});
const LoginUserZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({
            required_error: 'Email is required',
        }),
        password: zod_1.z.string({
            required_error: 'Password is required',
        }),
    }),
});
exports.AuthValidation = {
    CreateUserZodSchema,
    LoginUserZodSchema,
};
