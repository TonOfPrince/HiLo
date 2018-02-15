module.exports = (sequelize, DataTypes) => {
    const List = sequelize.define('List', {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    List.associate = models => {
        List.hasMany(models.Link, {
            foreignKey: 'id',
            as: 'links',
        })
    }
    return List;
};
