import 'dotenv/config';
import bcrypt from 'bcryptjs';
import { connectMongo } from '#@/databases/connect-mongo.js';
import { User } from '#@/modules/auth/model/index.js';

(async () => {
  await connectMongo();

  const email = process.env.SEED_ADMIN_EMAIL || 'admin@example.com';
  const pass  = process.env.SEED_ADMIN_PASSWORD || 'ChangeMe123!';

  const exists = await User.findOne({ email });
  if (exists) {
    console.log('Admin already exists:', email);
    process.exit(0);
  }

  const password = await bcrypt.hash(pass, 10);
  const doc = await User.create({ email, password, role: 'admin', name: 'Admin' });
  console.log('Admin created:', { id: doc._id.toString(), email });
  process.exit(0);
})().catch(err => { console.error(err); process.exit(1); });
