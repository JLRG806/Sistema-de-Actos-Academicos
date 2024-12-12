import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../db/db.js";

export const UserNotifications = sequelize.define('user_notifications', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    notificationId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false
    }
})