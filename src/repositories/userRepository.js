const { response } = require('express');
const User = require('../models/User');

class userRepository {

    async createUser(userData){
        try {
            const user = new User(userData);
            await user.save();
            return user;
        } catch (error) {
            console.log(error);
        }
    }

    async findUserByEmail(email){
        try {
            const response = await User.findOne({email});
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async createUser(id){
        try {
            const response = await User.findById(id);
            return response
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = userRepository;