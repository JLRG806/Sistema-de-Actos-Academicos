-- Crear tabla Roles
CREATE TABLE Roles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

-- Crear tabla Users
CREATE TABLE Users (
    id SERIAL PRIMARY KEY,
    fullName VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    role_id INT REFERENCES Roles(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear tabla Events
CREATE TABLE Events (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    start_date TIMESTAMP NOT NULL,
    end_date TIMESTAMP NOT NULL,
    ubicacion VARCHAR(200),
    status VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear tabla UserEvents (relación muchos a muchos entre Users y Events)
CREATE TABLE UserEvents (
    id SERIAL PRIMARY KEY,
    event_id_fk INT REFERENCES Events(id) ON DELETE CASCADE,
    user_id_fk INT REFERENCES Users(id) ON DELETE CASCADE
);

-- Crear tabla Notifications
CREATE TABLE Notifications (
    id SERIAL PRIMARY KEY,
    event_id_fk INT REFERENCES Events(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear tabla UserNotifications (relación entre Users y Notifications)
CREATE TABLE UserNotifications (
    id SERIAL PRIMARY KEY,
    user_id_fk INT REFERENCES Users(id) ON DELETE CASCADE,
    notification_id_fk INT REFERENCES Notifications(id) ON DELETE CASCADE,
    status VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insertar roles predeterminados
INSERT INTO Roles (name) VALUES 
('profesor'),
('alumno'),
('invitado');