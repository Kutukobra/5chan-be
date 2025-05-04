CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE IF NOT EXISTS creators (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name text DEFAULT NULL,
    password text DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    content text,
    image_url text,
    created_at timestamp DEFAULT CURRENT_TIMESTAMP,
    creator_id UUID REFERENCES creators(id),
    parent_id UUID REFERENCES posts(id)
);

-- Create Creator
INSERT INTO creators (name, password)
VALUES ($1, $2);

-- Create Post
INSERT INTO posts (content, image_url, creator_id, parent_id)
VALUES ($1, $2, $3, $4);

-- Get n Posts
SELECT * FROM posts LIMIT $1;

-- Delete Post
DELETE FROM posts 
WHERE
    id = $1 AND 
    creator_id = $2;