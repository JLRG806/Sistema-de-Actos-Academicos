import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../db/db.js";

export const UserEvents = sequelize.define('user_events', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    eventId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})