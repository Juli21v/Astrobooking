import { RocketRange, ValidationError, CreateRocketInput } from './types';

const VALID_RANGES: RocketRange[] = ['suborbital', 'orbital', 'moon', 'mars'];
const MIN_CAPACITY = 1;
const MAX_CAPACITY = 10;

export function validateRocketInput(input: Partial<CreateRocketInput>): ValidationError[] {
  const errors: ValidationError[] = [];

  if (input.name !== undefined) {
    if (typeof input.name !== 'string' || input.name.trim().length === 0) {
      errors.push({ field: 'name', message: 'Name must be a non-empty string' });
    }
  }

  if (input.range !== undefined) {
    if (!VALID_RANGES.includes(input.range)) {
      errors.push({
        field: 'range',
        message: `Range must be one of: ${VALID_RANGES.join(', ')}`,
      });
    }
  }

  if (input.capacity !== undefined) {
    if (!Number.isInteger(input.capacity) || input.capacity < MIN_CAPACITY || input.capacity > MAX_CAPACITY) {
      errors.push({
        field: 'capacity',
        message: `Capacity must be an integer between ${MIN_CAPACITY} and ${MAX_CAPACITY}`,
      });
    }
  }

  return errors;
}

export function validateCreateRocketInput(input: unknown): ValidationError[] {
  if (typeof input !== 'object' || input === null) {
    return [{ field: 'body', message: 'Request body must be a valid object' }];
  }

  const body = input as Record<string, unknown>;
  const errors: ValidationError[] = [];

  if (body.name === undefined) {
    errors.push({ field: 'name', message: 'Name is required' });
  } else if (typeof body.name !== 'string' || body.name.trim().length === 0) {
    errors.push({ field: 'name', message: 'Name must be a non-empty string' });
  }

  if (body.range === undefined) {
    errors.push({ field: 'range', message: 'Range is required' });
  } else if (!VALID_RANGES.includes(body.range as RocketRange)) {
    errors.push({
      field: 'range',
      message: `Range must be one of: ${VALID_RANGES.join(', ')}`,
    });
  }

  if (body.capacity === undefined) {
    errors.push({ field: 'capacity', message: 'Capacity is required' });
  } else if (
    !Number.isInteger(body.capacity) ||
    (body.capacity as number) < MIN_CAPACITY ||
    (body.capacity as number) > MAX_CAPACITY
  ) {
    errors.push({
      field: 'capacity',
      message: `Capacity must be an integer between ${MIN_CAPACITY} and ${MAX_CAPACITY}`,
    });
  }

  return errors;
}

export function validateUpdateRocketInput(input: unknown): ValidationError[] {
  if (typeof input !== 'object' || input === null) {
    return [{ field: 'body', message: 'Request body must be a valid object' }];
  }

  const body = input as Record<string, unknown>;
  return validateRocketInput(body);
}
