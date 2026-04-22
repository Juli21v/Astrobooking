import { RocketRange, ValidationError, CreateRocketInput } from './types';

const VALID_RANGES: readonly RocketRange[] = ['suborbital', 'orbital', 'moon', 'mars'];
const MIN_CAPACITY = 1;
const MAX_CAPACITY = 10;

type Payload = Record<string, unknown>;

function isObject(input: unknown): input is Payload {
  return typeof input === 'object' && input !== null;
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

function validateRange(value: unknown): string | null {
  if (typeof value !== 'string' || !VALID_RANGES.includes(value as RocketRange)) {
    return `Range must be one of: ${VALID_RANGES.join(', ')}`;
  }
  return null;
}

function validateCapacity(value: unknown): string | null {
  if (typeof value !== 'number' || !Number.isInteger(value) || value < MIN_CAPACITY || value > MAX_CAPACITY) {
    return `Capacity must be an integer between ${MIN_CAPACITY} and ${MAX_CAPACITY}`;
  }
  return null;
}

export function validateRocketInput(input: Partial<CreateRocketInput>): ValidationError[] {
  const errors: ValidationError[] = [];

  if (input.name !== undefined) {
    const nameError = isNonEmptyString(input.name) ? null : 'Name must be a non-empty string';
    if (nameError) {
      errors.push({ field: 'name', message: nameError });
    }
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
  if (!isObject(input)) {
    return [{ field: 'body', message: 'Request body must be a valid object' }];
  }

  const body = input as Payload;
  const errors: ValidationError[] = [];

  if (body.name === undefined) {
    errors.push({ field: 'name', message: 'Name is required' });
  } else if (!isNonEmptyString(body.name)) {
    errors.push({ field: 'name', message: 'Name must be a non-empty string' });
  }

  if (body.range === undefined) {
    errors.push({ field: 'range', message: 'Range is required' });
  } else {
    const rangeError = validateRange(body.range);
    if (rangeError) {
      errors.push({ field: 'range', message: rangeError });
    }
  }

  if (body.capacity === undefined) {
    errors.push({ field: 'capacity', message: 'Capacity is required' });
  } else {
    const capacityError = validateCapacity(body.capacity);
    if (capacityError) {
      errors.push({ field: 'capacity', message: capacityError });
    }
  }

  return errors;
}

export function validateUpdateRocketInput(input: unknown): ValidationError[] {
  if (!isObject(input)) {
    return [{ field: 'body', message: 'Request body must be a valid object' }];
  }

  return validateRocketInput(input as Partial<CreateRocketInput>);
}
