-- Init Database Script
-- Run this script in MySQL to create all required tables

CREATE DATABASE IF NOT EXISTS charity_platform CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE charity_platform;

-- Drop tables if they exist (in correct order due to foreign keys)
DROP TABLE IF EXISTS event_registrations;
DROP TABLE IF EXISTS donations;
DROP TABLE IF EXISTS events;
DROP TABLE IF EXISTS campaigns;
DROP TABLE IF EXISTS users;

-- Create users table
CREATE TABLE users (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) DEFAULT 'user',
    password_reset_token VARCHAR(255),
    reset_token_expiry DATETIME,
    created_at DATETIME(3),
    updated_at DATETIME(3),
    PRIMARY KEY (id),
    UNIQUE KEY idx_users_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create campaigns table
CREATE TABLE campaigns (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    target DOUBLE NOT NULL,
    collected DOUBLE DEFAULT 0,
    image_url VARCHAR(255),
    created_at DATETIME(3),
    updated_at DATETIME(3),
    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create events table
CREATE TABLE events (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    location VARCHAR(255) NOT NULL,
    event_date DATETIME NOT NULL,
    photo_url VARCHAR(255),
    category VARCHAR(100) NOT NULL,
    created_at DATETIME(3),
    updated_at DATETIME(3),
    PRIMARY KEY (id),
    KEY idx_events_category (category)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create donations table
CREATE TABLE donations (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    amount DOUBLE NOT NULL,
    proof_of_payment VARCHAR(255),
    status VARCHAR(20) DEFAULT 'pending',
    user_id BIGINT UNSIGNED NOT NULL,
    campaign_id BIGINT UNSIGNED NOT NULL,
    created_at DATETIME(3),
    updated_at DATETIME(3),
    PRIMARY KEY (id),
    KEY fk_donations_user (user_id),
    KEY fk_donations_campaign (campaign_id),
    CONSTRAINT fk_donations_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    CONSTRAINT fk_donations_campaign FOREIGN KEY (campaign_id) REFERENCES campaigns (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create event_registrations table
CREATE TABLE event_registrations (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    status VARCHAR(20) DEFAULT 'pending',
    documentation_upload VARCHAR(255),
    user_id BIGINT UNSIGNED NOT NULL,
    event_id BIGINT UNSIGNED NOT NULL,
    created_at DATETIME(3),
    updated_at DATETIME(3),
    PRIMARY KEY (id),
    KEY fk_event_registrations_user (user_id),
    KEY fk_event_registrations_event (event_id),
    CONSTRAINT fk_event_registrations_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    CONSTRAINT fk_event_registrations_event FOREIGN KEY (event_id) REFERENCES events (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

SELECT 'Database and tables created successfully!' AS Status;
