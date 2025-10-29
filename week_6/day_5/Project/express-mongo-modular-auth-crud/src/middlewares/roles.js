export function isAdmin(req, res, next) {
  try {
    if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
    if (req.user.role !== 'admin') return res.status(403).json({ error: 'Forbidden: admin only' });
    next();
  } catch (e) {
    res.status(500).json({ error: 'Server error' });
  }
}


export function ownerOrAdmin(ownerId, user) {
  if (!user) return false;
  if (user.role === 'admin') return true;
  return String(ownerId) === String(user.id || user._id);
}
