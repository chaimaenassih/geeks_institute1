import { Router } from 'express';
import { Product } from '#@/modules/products/model/index.js';
import { auth } from '#@/middlewares/auth.js';
import { isAdmin, ownerOrAdmin } from '#@/middlewares/roles.js';

const router = Router();


router.get('/', auth, async (req, res) => {
  try {
    const query = req.user.role === 'admin'
      ? {}
      : { ownerId: req.user.id };
    const items = await Product.find(query).sort({ createdAt: -1 });
    res.json(items);
  } catch (e) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/all', auth, isAdmin, async (_req, res) => {
  try {
    const items = await Product.find({}).sort({ createdAt: -1 });
    res.json(items);
  } catch (e) {
    res.status(500).json({ error: 'Server error' });
  }
});


router.post('/', auth, async (req, res) => {
  try {
    const { name, description, price } = req.body || {};
    if (!name) return res.status(400).json({ error: 'name is required' });

    const created = await Product.create({
      name,
      description,
      price,
      ownerId: req.user.id,
    });
    res.status(201).json(created);
  } catch (e) {
    res.status(400).json({ error: e.message || 'Bad request' });
  }
});


router.get('/:id', auth, async (req, res) => {
  try {
    const item = await Product.findById(req.params.id);
    if (!item) return res.status(404).json({ error: 'Not found' });

    if (!ownerOrAdmin(item.ownerId, req.user)) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    res.json(item);
  } catch (e) {
    res.status(400).json({ error: 'Bad request' });
  }
});

/**
 * PUT /products/:id (owner or admin)
 */
router.put('/:id', auth, async (req, res) => {
  try {
    const item = await Product.findById(req.params.id);
    if (!item) return res.status(404).json({ error: 'Not found' });

    if (!ownerOrAdmin(item.ownerId, req.user)) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    const { name, description, price } = req.body || {};
    if (name !== undefined) item.name = name;
    if (description !== undefined) item.description = description;
    if (price !== undefined) item.price = price;

    await item.save();
    res.json(item);
  } catch (e) {
    res.status(400).json({ error: 'Bad request' });
  }
});


router.delete('/:id', auth, async (req, res) => {
  try {
    const item = await Product.findById(req.params.id);
    if (!item) return res.status(404).json({ error: 'Not found' });

    if (!ownerOrAdmin(item.ownerId, req.user)) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    await item.deleteOne();
   
    res.json(item);
  } catch (e) {
    res.status(400).json({ error: 'Bad request' });
  }
});

export default router;
