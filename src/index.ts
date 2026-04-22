import express, { Request, Response } from 'express';
import { RocketsService, ValidationError, NotFoundError } from './rockets.service';
import { validateCreateRocketInput, validateUpdateRocketInput } from './validation';
import { CreateRocketInput, UpdateRocketInput } from './types';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const respond = {
  badRequest: (res: Response, errors: Array<{ field: string; message: string }>) => res.status(400).json({ errors }),
  notFound: (res: Response, message: string) => res.status(404).json({ error: message }),
  internalServerError: (res: Response) => res.status(500).json({ error: 'Internal server error' }),
};

function handleServiceError(res: Response, error: unknown) {
  if (error instanceof ValidationError) {
    return respond.badRequest(res, error.errors);
  }

  if (error instanceof NotFoundError) {
    return respond.notFound(res, error.message);
  }

  return respond.internalServerError(res);
}

app.get('/health', (_req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
  });
});

app.post<{}, unknown, CreateRocketInput>('/rockets', (req: Request<{}, unknown, CreateRocketInput>, res) => {
  const errors = validateCreateRocketInput(req.body);
  if (errors.length > 0) {
    return respond.badRequest(res, errors);
  }

  try {
    const rocket = RocketsService.createRocket(req.body);
    return res.status(201).json(rocket);
  } catch (error) {
    return handleServiceError(res, error);
  }
});

app.get('/rockets', (_req, res) => {
  try {
    const rockets = RocketsService.getAllRockets();
    return res.status(200).json(rockets);
  } catch (error) {
    return handleServiceError(res, error);
  }
});

app.get('/rockets/:id', (req: Request<{ id: string }>, res) => {
  try {
    const rocket = RocketsService.getRocketById(req.params.id);
    if (!rocket) {
      return respond.notFound(res, `Rocket with id ${req.params.id} not found`);
    }
    return res.status(200).json(rocket);
  } catch (error) {
    return handleServiceError(res, error);
  }
});

app.put<{ id: string }, unknown, UpdateRocketInput>('/rockets/:id', (req: Request<{ id: string }, unknown, UpdateRocketInput>, res) => {
  const errors = validateUpdateRocketInput(req.body);
  if (errors.length > 0) {
    return respond.badRequest(res, errors);
  }

  try {
    const rocket = RocketsService.updateRocket(req.params.id, req.body);
    return res.status(200).json(rocket);
  } catch (error) {
    return handleServiceError(res, error);
  }
});

app.delete('/rockets/:id', (req: Request<{ id: string }>, res) => {
  try {
    RocketsService.deleteRocket(req.params.id);
    return res.status(204).send();
  } catch (error) {
    return handleServiceError(res, error);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
