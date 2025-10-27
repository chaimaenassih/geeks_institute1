const Post = require('../models/post.model');

exports.getAll = async (req, res, next) => {
  try {
    const data = await Post.findAll();
    res.json(data);
  } catch (e) { next(e); }
};

exports.getOne = async (req, res, next) => {
  try {
    const post = await Post.findById(Number(req.params.id));
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json(post);
  } catch (e) { next(e); }
};

exports.create = async (req, res, next) => {
  try {
    const { title, content } = req.body || {};
    if (!title || !content) return res.status(400).json({ error: 'title and content are required' });
    const post = await Post.create({ title, content });
    res.status(201).json(post);
  } catch (e) { next(e); }
};

exports.update = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const { title, content } = req.body || {};
    const updated = await Post.update(id, { title, content });
    if (!updated) return res.status(404).json({ error: 'Post not found' });
    res.json(updated);
  } catch (e) { next(e); }
};

exports.remove = async (req, res, next) => {
  try {
    const deleted = await Post.remove(Number(req.params.id));
    if (!deleted) return res.status(404).json({ error: 'Post not found' });
    res.json(deleted);
  } catch (e) { next(e); }
};
