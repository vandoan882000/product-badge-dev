import { z, ZodType } from 'zod';

// FIXME: Nên được gen ra bởi "ts-to-zod"
export const schema: ZodType<App.Setting> = z.object({
  max: z
    .number({
      required_error: '"max" is required',
      invalid_type_error: '"max" must be a number',
    })
    .min(0, { message: '"max" must be greater than 0' })
    .max(1000, { message: '"max" must be less than 1000' }),
  min: z
    .number({
      required_error: '"max" is required',
      invalid_type_error: '"max" must be a number',
    })
    .min(0, { message: '"max" must be greater than 0' })
    .max(1000, { message: '"max" must be less than 1000' }),
});
