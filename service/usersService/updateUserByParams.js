const dataBase = require('../../dataBase').getInstance();

module.exports = async (updateObject, user_id) => {
    const UserModel = dataBase.getModel('User');

    await UserModel.update(updateObject, {
        where: {
            id: user_id
        }
    });
};
