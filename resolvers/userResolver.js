const { User } = require('../schema.js');
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
          return { success: false, message: 'Username or email already exists' };
        }

        const hashedPassword = await bcrypt.hash(input.password, 10);
        const newUser = new User({
          username: input.username,
          email: input.email,
          password: hashedPassword,
        });

        await newUser.save();

        return { success: true, message: 'Signup successful' };
      } catch (error) {
        return { success: false, message: error.message };
      }
    },
    login: async (_, { identifier, password }) => {
      try {
        const user = await User.findOne({
          $or: [{ username: identifier }, { email: identifier }],
        });

        if (!user) {
          return { success: false, message: 'User not found' };
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
          return { success: false, message: 'Invalid password' };
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return { success: true, message: 'Login successful', token };
      } catch (error) {
        return { success: false, message: error.message };
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
        return { success: true, message: 'User deleted successfully' };
      } catch (error) {
        return { success: false, message: error.message };
      }
    },
  },
};

module.exports = userResolver;
