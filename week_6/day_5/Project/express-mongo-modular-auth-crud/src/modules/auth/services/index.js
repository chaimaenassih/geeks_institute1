import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '#@/modules/auth/model/index.js';

const JWT_SECRET = process.env.JWT_SECRET ?? 'dev_secret_change_me';

/** @typedef {Error & {status?: number}} HttpError */

function tokenFor(user) {
  return jwt.sign(
    { sub: user._id.toString(), role: user.role },
    JWT_SECRET,
    { expiresIn: '1d' }
  );
}


export async function register({ email, password, role = 'member', name = '' }) {
  const exists = await User.findOne({ email });
  if (exists) {
    /** @type {HttpError} */ const err = new Error('Email already used');
    err.status = 409;
    throw err;
  }
  const hash = await bcrypt.hash(password, 10);
  const user = await User.create({ email, password: hash, role, name });
  return {
    id: user._id.toString(),
    email: user.email,
    role: user.role,
    name: user.name,
    createdAt: user.createdAt
  };
}

export async function login({ email, password }) {
  const user = await User.findOne({ email });
  if (!user) {
    /** @type {HttpError} */ const err = new Error('Invalid credentials');
    err.status = 401;
    throw err;
  }
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) {
    /** @type {HttpError} */ const err = new Error('Invalid credentials');
    err.status = 401;
    throw err;
  }
  return {
    token: tokenFor(user),
    user: { id: user._id.toString(), email: user.email, role: user.role, name: user.name }
  };
}

export async function me(userId) {
  const user = await User.findById(userId).lean();
  if (!user) {
    /** @type {HttpError} */ const err = new Error('Not found');
    err.status = 404;
    throw err;
  }
  return {
    id: user._id.toString(),
    email: user.email,
    role: user.role,
    name: user.name,
    createdAt: user.createdAt
  };
}
