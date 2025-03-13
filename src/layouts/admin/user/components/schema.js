import { z as zod } from 'zod';

// Define the user schema with schema helpers
export const userSchema = zod
  .object({
    id: zod.string().optional(),
    firstName: zod.string().min(1, { message: 'First Name is required' }),
    middleName: zod.string().optional(),
    lastName: zod.string().min(1, { message: 'Last Name is required' }),
    placeOfBirth: zod.string().min(1, { message: 'Place of Birth is required' }),
    dob: zod.custom((date) => date.isValid(), {
      message: 'Date of Birth is required',
    }),
    gender: zod.enum(['Male', 'Female'], { message: 'Gender is required' }),
    civilStatus: zod.enum(['Single', 'Married', 'Widowed'], { message: 'Civil Status is required' }),
    nationality: zod.string().min(1, { message: 'Nationality is required' }),
    contactNo: zod.string().min(1, { message: 'Contact No. is required' }),
    email: zod.string().optional(),
    presentAddress: zod
      .object({
        region: zod.string().min(1, { message: 'Region is required' }),
        province: zod.string().min(1, { message: 'Province is required' }),
        municipality: zod.string().min(1, { message: 'Municipality is required' }),
        address: zod.string().min(1, { message: 'Address is required' }),
        zipCode: zod.string().optional(),
      })
      .nullable(),
    permanentAddress: zod
      .object({
        region: zod.string().min(1, { message: 'Region is required' }),
        province: zod.string().min(1, { message: 'Province is required' }),
        municipality: zod.string().min(1, { message: 'Municipality is required' }),
        address: zod.string().min(1, { message: 'Address is required' }),
        zipCode: zod.string().optional(),
      })
      .nullable(),
    religion: zod.string().optional(),
    height: zod.string().optional(),
    weight: zod.string().optional(),
    position: zod
      .union([
        zod.enum(['Administrator', 'Registrar', 'Dean', 'Accountant', 'Faculty', 'Cashier'], {
          message: 'Position is required',
        }),
        zod.literal(''), // Allow empty string
      ])
      .optional(),
    username: zod.union([zod.string().min(1, { message: 'Username is required' }), zod.literal('')]).optional(),

    password: zod
      .union([zod.string().min(6, { message: 'Password must be at least 6 characters long' }), zod.literal('')])
      .optional(),

    password_confirmation: zod
      .union([zod.string().min(6, { message: 'Confirm Password is required' }), zod.literal('')])
      .optional(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: 'Passwords do not match!',
    path: ['password_confirmation'],
  });
