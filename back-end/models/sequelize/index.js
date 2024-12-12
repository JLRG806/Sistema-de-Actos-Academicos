import { DataTypes } from "sequelize";
import { Event } from "./Event.js";
import { User } from "./User.js";
import { Role } from "./Role.js";
import { Notification } from "./Notification.js";
import { UserEvents } from "./UserEvents.js";
import { UserNotifications } from "./UserNotifications.js";

// Event have a 1..1 relation with Notification
Event.hasOne(Notification);
Notification.belongsTo(Event, {
    foreignKey: {
        name: 'eventId',
        type: DataTypes.INTEGER,
        allowNull: false
    },targetKey: 'id'
});

// User have a 1..1 relation with Role
User.belongsTo(Role, {
    foreignKey: {
        name: 'roleId',
        type: DataTypes.INTEGER,
        allowNull: false
    }, targetKey: 'id'
});
Role.hasMany(User, {
    foreignKey: {
        name: 'roleId',
        type: DataTypes.INTEGER,
        allowNull: false
    }, sourceKey: 'id'
})

// User have a n..n relation with UserEvents

User.belongsToMany(Event, {
    through: UserEvents,
    foreignKey: 'userId',
    otherKey: 'eventId',
    through: UserEvents
});
Event.belongsToMany(User, {
    through: UserEvents,
    foreignKey: 'eventId',
    otherKey: 'userId',
    through: UserEvents
});

// User have a n..n relation with UserNotifications
User.belongsToMany(Notification, {
    through: UserNotifications,
    foreignKey: 'userId',
    otherKey: 'notificationId',
    through: UserNotifications
});
Notification.belongsToMany(User, {
    through: UserNotifications,
    foreignKey: 'notificationId',
    otherKey: 'userId',
    through: UserNotifications
});



export const models = {
    Event,
    User,
    Role,
    Notification,
    UserEvents,
    UserNotifications
}