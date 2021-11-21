import User from '../models/user.js';

export const findUser = () => {
    return User.findOne
}