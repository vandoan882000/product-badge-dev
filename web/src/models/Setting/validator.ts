import { handleZodError } from 'utils/handleZodError';
import { ZodError } from 'zod';
import { SchemaException } from './@const/Exception';
import { schema } from './schema';

export const validator = async (data: unknown) => {
  try {
    return await schema.parseAsync(data);
  } catch (error) {
    if (error instanceof ZodError) {
      throw new SchemaException(handleZodError(error));
    } else if (error instanceof Error) {
      throw error;
    }
  }
};
