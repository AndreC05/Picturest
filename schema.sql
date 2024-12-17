CREATE TABLE users(
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  username TEXT,
  bio TEXT,
  clerk_id TEXT NOT NULL UNIQUE,
  date_joined DATE NOT NULL DEFAULT CURRENT_DATE
);
CREATE TABLE posts(
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title TEXT,
  content TEXT,
  clerk_id TEXT REFERENCES users(clerk_id),
  post_date DATE NOT NULL DEFAULT CURRENT_DATE,
  likes INT NOT NULL DEFAULT 0,
  image TEXT
);

CREATE TABLE comments(
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    content TEXT,
    clerk_id TEXT REFERENCES users(clerk_id),
    post_id INT REFERENCES posts(id),
    likes INT NOT NULL DEFAULT 0,
    comment_date DATE NOT NULL DEFAULT CURRENT_DATE 
);

CREATE TABLE likes (
    id SERIAL PRIMARY KEY,
    clerk_id TEXT NOT NULL REFERENCES users(clerk_id),
    post_id INT REFERENCES posts(id),
    comment_id INT REFERENCES comments(id),
    like_state BOOLEAN NOT NULL DEFAULT false
);
