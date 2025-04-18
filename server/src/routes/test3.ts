import { Router } from 'express';
import type { Request, Response } from 'express';

const router = Router();

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    res.json({ id });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

 