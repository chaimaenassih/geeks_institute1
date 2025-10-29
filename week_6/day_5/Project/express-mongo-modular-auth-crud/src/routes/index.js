import { Router } from 'express';
import auth from '#@/modules/auth/index.js';
import products from '#@/modules/products/index.js';

const router = Router();

router.get('/', (req, res) => {
  res.json({ ok: true, service: 'API', endpoints: ['/auth/*', '/products/*'] });
});

router.use('/auth', auth);
router.use('/products', products);


export default router;
