import { HttpException, HttpStatus, Logger } from '@nestjs/common';
import { QueryFailedError, EntityNotFoundError } from 'typeorm';

const logger = new Logger('APIWrapper');

export const apiWrapper = async <T>(
  logic: () => Promise<T> | T,
): Promise<T> => {
  try {
    return await logic();
  } catch (error: any) {
    logger.error(error?.message || error, error.stack);

    // Handle unique constraint violation (PostgreSQL specific code: 23505)
    if (error instanceof QueryFailedError) {
      if ((error as any).code === '23505') {
        const detail = (error as any).detail || '';
        const fieldMatch = detail.match(/\(([^)]+)\)=\(([^)]+)\)/);
        const field = fieldMatch ? fieldMatch[1] : 'unknown field';

        throw new HttpException(
          `A unique constraint violation occurred on field: ${field}.`,
          HttpStatus.CONFLICT,
        );
      }
    }

    // Handle not found entities
    if (error instanceof EntityNotFoundError) {
      throw new HttpException(
        `Requested entity not found.`,
        HttpStatus.NOT_FOUND,
      );
    }

    // Re-throw any existing HTTP exceptions
    if (error instanceof HttpException) {
      throw error;
    }

    // Default fallback
    throw new HttpException(
      `An internal server error occurred. Please try again later.`,
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
};
