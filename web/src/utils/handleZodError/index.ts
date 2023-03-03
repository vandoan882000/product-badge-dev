import { ZodError } from 'zod';

export const handleZodError = (error: ZodError) => {
  const result: Record<string, string> = {};

  Object.entries(error.flatten().fieldErrors).forEach(([path, messages]) => {
    if (messages) {
      result[path] = messages.join('; ');
    }
  });

  return result;
};
