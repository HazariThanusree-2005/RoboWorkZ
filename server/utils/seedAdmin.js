import User from '../models/User.js';

const seedAdmin = async () => {
  try {
    const adminExists = await User.findOne({ role: 'admin' });
    if (!adminExists) {
      await User.create({
        username: 'admin',
        email: 'admin@roboworkz.com',
        password: 'Admin@123',
        role: 'admin',
      });
      console.log('✅ Admin account seeded: admin@roboworkz.com / Admin@123');
    }
  } catch (error) {
    console.error('❌ Error seeding admin:', error.message);
  }
};

export default seedAdmin;
