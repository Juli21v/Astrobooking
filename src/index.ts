import express, { Request, Response } from 'express';
import { RocketsService, ValidationError, NotFoundError } from './rockets.service';
import { validateCreateRocketInput, validateUpdateRocketInput } from './validation';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Health status endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
  });
});

// Create a new rocket
app.post('/rockets', (req: Request, res: Response) => {
  try {
    const errors = validateCreateRocketInput(req.body);
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    const rocket = RocketsService.createRocket(req.body);
    res.status(201).json(rocket);
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(400).json({ errors: error.errors });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all rockets
app.get('/rockets', (req: Request, res: Response) => {
  try {
    const rockets = RocketsService.getAllRockets();
    res.status(200).json(rockets);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get a specific rocket by ID
app.get('/rockets/:id', (req: Request, res: Response) => {
  try {
    const rocket = RocketsService.getRocketById(req.params.id);
    if (!rocket) {
      return res.status(404).json({ error: `Rocket with id ${req.params.id} not found` });
    }
    res.status(200).json(rocket);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update a rocket
app.put('/rockets/:id', (req: Request, res: Response) => {
  try {
    const errors = validateUpdateRocketInput(req.body);
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    const rocket = RocketsService.updateRocket(req.params.id, req.body);
    res.status(200).json(rocket);
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(400).json({ errors: error.errors });
    }
    if (error instanceof NotFoundError) {
      return res.status(404).json({ error: error.message });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete a rocket
app.delete('/rockets/:id', (req: Request, res: Response) => {
  try {
    RocketsService.deleteRocket(req.params.id);
    res.status(204).send();
  } catch (error) {
    if (error instanceof NotFoundError) {
      return res.status(404).json({ error: error.message });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
