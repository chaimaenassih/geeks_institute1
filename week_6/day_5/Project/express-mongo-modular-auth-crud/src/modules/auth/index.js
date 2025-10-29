import { Router } from 'express';
import { register, login, me } from '#@/modules/auth/services/index.js';
import { auth } from '#@/middlewares/auth.js';

const r = Router();

r.post('/register', async (req, res, next) => {
  try { const out = await register(req.body); res.status(201).json(out); }
  catch (e) { next(e); }
});

r.post('/login', async (req, res, next) => {
  try { const out = await login(req.body); res.json(out); }
  catch (e) { next(e); }
});

r.get('/me', auth, async (req, res, next) => {
  try { const out = await me(req.user.id); res.json(out); }
  catch (e) { next(e); }
});

export default r;
