import { Router } from 'express';
import type { Request, Response } from 'express';

const router = Router();

router.get('/:id', (req: Request, res: Response) => {
  res.json({ id: req.params.id });
});

export default router; 