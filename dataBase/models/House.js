module.exports = (sequelize, DataTypes)=>{
    const House = sequelize.define('House', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        city: {
            type: DataTypes.STRING,
        },
        area: {
            type: DataTypes.DECIMAL,
        },
        price: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER,
         },
    },{
        tableName: 'house',
        timestamps: false
    });

    const User = sequelize.import('User.js');
    House.belongsTo(User, {foreignKey: 'user_id'});

    return House;
};
