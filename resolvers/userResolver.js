const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userResolver = {
  Query: {
    getAllUsers: async () => {
      try {
        const users = await User.find();
        return users;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    getUserById: async (_, { _id }) => {
      try {
        const user = await User.findById(_id);
        return user;
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },
  Mutation: {
    signup: async (_, { input }) => {
      try {
        const existingUser = await User.findOne({ $or: [{ username: input.username }, { email: input.email }] });

        if (existingUser) {
          throw new Error('Username or email already exists');
        }

        const hashedPassword = await bcrypt.hash(input.password, 10);
        const newUser = new User({
          username: input.username,
          email: input.email,
          password: hashedPassword,
        });

        await newUser.save();

        const welcomeMessage = `Welcome, ${input.username}! Your account has been created successfully.`;
        return { message: welcomeMessage };
      } catch (error) {
        throw new Error(error.message);
      }
    },
    login: async (_, { identifier, password }) => {
      try {
        const user = await User.findOne({
          $or: [{ username: identifier }, { email: identifier }],
        });

        if (!user) {
          throw new Error('User not found');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
          throw new Error('Invalid password');
        }

        // Generate and return a JWT token (optional)
        const token = jwt.sign({ userId: user._id }, 'your-secret-key', { expiresIn: '1h' });
        return { message: 'Login successful', token };
      } catch (error) {
        throw new Error(error.message);
      }
    },
    updateUserById: async (_, { _id, input }) => {
      try {
        const updatedUser = await User.findByIdAndUpdate(_id, input, { new: true });
        return updatedUser;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    deleteUserById: async (_, { _id }) => {
      try {
        await User.findByIdAndDelete(_id);
        return { message: 'User deleted successfully' };
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },
};

module.exports = userResolver;
