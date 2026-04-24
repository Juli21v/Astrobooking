import { RocketRange, ValidationError, CreateRocketInput } from './types';
import logger from './logger';

const VALID_RANGES = ['suborbital', 'orbital', 'moon', 'mars'] as const satisfies readonly RocketRange[];
const MIN_CAPACITY = 1;
const MAX_CAPACITY = 10;

const VALIDATION_MESSAGES = {
  INVALID_RANGE: `Range must be one of: ${VALID_RANGES.join(', ')}`,
  INVALID_CAPACITY: `Capacity must be an integer between ${MIN_CAPACITY} and ${MAX_CAPACITY}`,
  INVALID_NAME: 'Name must be a non-empty string',
  REQUIRED_NAME: 'Name is required',
  REQUIRED_RANGE: 'Range is required',
  REQUIRED_CAPACITY: 'Capacity is required',
  INVALID_BODY: 'Request body must be a valid object',
} as const;

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

function validateField(field: keyof CreateRocketInput, value: unknown, required: boolean = false): string | null {
  if (value === undefined) {
    return required ? VALIDATION_MESSAGES[`REQUIRED_${field.toUpperCase()}` as keyof typeof VALIDATION_MESSAGES] : null;
  }

  switch (field) {
    case 'name':
      return isNonEmptyString(value) ? null : VALIDATION_MESSAGES.INVALID_NAME;
    case 'range':
      return validateRange(value);
    case 'capacity':
      return validateCapacity(value);
    default:
      return null;
  }
}

function validateRange(value: unknown): string | null {
  if (typeof value !== 'string' || !VALID_RANGES.includes(value as RocketRange)) {
    return VALIDATION_MESSAGES.INVALID_RANGE;
  }
  return null;
}

function validateCapacity(value: unknown): string | null {
  if (typeof value !== 'number' || !Number.isInteger(value) || value < MIN_CAPACITY || value > MAX_CAPACITY) {
    return VALIDATION_MESSAGES.INVALID_CAPACITY;
  }
  return null;
}

export function validateRocketInput(input: Partial<CreateRocketInput>): ValidationError[] {
  const errors: ValidationError[] = [];

  if (input.name !== undefined && !isNonEmptyString(input.name)) {
    errors.push({ field: 'name', message: VALIDATION_MESSAGES.INVALID_NAME });
  }

  if (input.range !== undefined) {
    const rangeError = validateRange(input.range);
    if (rangeError) {
      errors.push({ field: 'range', message: rangeError });
    }
  }

  if (input.capacity !== undefined) {
    const capacityError = validateCapacity(input.capacity);
    if (capacityError) {
      errors.push({ field: 'capacity', message: capacityError });
    }
  }

  return errors;
}

export function validateCreateRocketInput(input: unknown): ValidationError[] {
  if (typeof input !== 'object' || input === null) {
    const errors = [{ field: 'body', message: VALIDATION_MESSAGES.INVALID_BODY }];
    logger.error(`Validation failed for create rocket: ${errors.map(e => e.message).join(', ')}`);
    return errors;
  }

  const body = input as Record<string, unknown>;
  const errors: ValidationError[] = [];
  const fields: (keyof CreateRocketInput)[] = ['name', 'range', 'capacity'];

  for (const field of fields) {
    const error = validateField(field, body[field], true);
    if (error) {
      errors.push({ field, message: error });
    }
  }

  if (errors.length > 0) {
    logger.error(`Validation failed for create rocket: ${errors.map(e => e.message).join(', ')}`);
  }

  return errors;
}

export function validateUpdateRocketInput(input: unknown): ValidationError[] {
  if (typeof input !== 'object' || input === null) {
    const errors = [{ field: 'body', message: VALIDATION_MESSAGES.INVALID_BODY }];
    logger.error(`Validation failed for update rocket: ${errors.map(e => e.message).join(', ')}`);
    return errors;
  }

  const errors = validateRocketInput(input as Partial<CreateRocketInput>);
  if (errors.length > 0) {
    logger.error(`Validation failed for update rocket: ${errors.map(e => e.message).join(', ')}`);
  }

  return errors;
}
