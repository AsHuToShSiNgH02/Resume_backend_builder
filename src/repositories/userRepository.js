const User = require('../models/User');

class UserRepository {
  async createUser(userData) {
    try {
      const user = new User(userData);
      await user.save();
      return user;
    } catch (error) {
      console.log(error);
    }
  }

  async findUserByEmail(email) {
    try {
      return await User.findOne({ email });
    } catch (error) {
      console.log(error);
    }
  }

  async findUserById(id) {
    try {
      return await User.findById(id);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new UserRepository();
