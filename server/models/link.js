'use strict';
module.exports = (sequelize, DataTypes) => {
    const Link = sequelize.define('Link', {
        url: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    Link.associate = models => {
        Link.belongsTo(models.List, {
            foreignKey: 'listId',
            onDelete: 'CASCADE',
        });
    };

    return Link;
};
