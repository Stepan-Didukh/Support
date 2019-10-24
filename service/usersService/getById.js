const dataBase = require('../../dataBase').getInstance();

module.exports = async user_id => {
    const UserModel = dataBase.getModel('User');
    const user = await UserModel.findByPk(user_id);

    if (!user) {
        throw new Error('Error');
    }

    return user;
};
