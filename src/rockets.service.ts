import { Rocket, CreateRocketInput, UpdateRocketInput } from './types';
import { validateRocketInput } from './validation';
import logger from './logger';

// In-memory data store for rockets
const rocketsStore: Map<string, Rocket> = new Map();

export class RocketsService {
  static createRocket(input: CreateRocketInput): Rocket {
    const errors = validateRocketInput(input);
    if (errors.length > 0) {
      throw new ValidationError('Invalid rocket data', errors);
    }

    const id = this.generateId();
    const now = new Date();
    const rocket: Rocket = {
      id,
      ...input,
      createdAt: now,
      updatedAt: now,
    };

    rocketsStore.set(id, rocket);
    logger.info(`Rocket created with ID: ${rocket.id}`);
    return rocket;
  }

  static getAllRockets(): Rocket[] {
    const rockets = Array.from(rocketsStore.values());
    logger.info(`Retrieved all rockets, count: ${rockets.length}`);
    return rockets;
  }

  static getRocketById(id: string): Rocket | null {
    const rocket = rocketsStore.get(id) || null;
    if (rocket) {
      logger.info(`Rocket retrieved: ${id}`);
    } else {
      logger.warn(`Rocket not found: ${id}`);
    }
    return rocket;
  }

  static updateRocket(id: string, updates: UpdateRocketInput): Rocket {
    const rocket = rocketsStore.get(id);
    if (!rocket) {
      throw new NotFoundError(`Rocket with id ${id} not found`);
    }

    const errors = validateRocketInput(updates);
    if (errors.length > 0) {
      throw new ValidationError('Invalid rocket data', errors);
    }

    const updated: Rocket = {
      ...rocket,
      ...updates,
      updatedAt: new Date(),
    };

    rocketsStore.set(id, updated);
    logger.info(`Rocket updated: ${id}`);
    return updated;
  }

  static deleteRocket(id: string): void {
    if (!rocketsStore.has(id)) {
      throw new NotFoundError(`Rocket with id ${id} not found`);
    }
    rocketsStore.delete(id);
    logger.info(`Rocket deleted: ${id}`);
  }

  private static generateId(): string {
    // Simple UUID v4 implementation without external dependency
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }
}

export class ValidationError extends Error {
  constructor(
    message: string,
    public errors: Array<{ field: string; message: string }>,
  ) {
    super(message);
    this.name = 'ValidationError';
  }
}

export class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NotFoundError';
  }
}
