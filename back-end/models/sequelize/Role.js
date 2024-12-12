import { DataTypes } from "sequelize";
import { sequelize } from "../../db/db.js";

export const Role = sequelize.define("roles", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
})