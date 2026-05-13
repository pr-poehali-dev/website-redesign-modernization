CREATE TABLE council_members (
  id SERIAL PRIMARY KEY,
  num INTEGER,
  name VARCHAR(255) NOT NULL,
  organization TEXT,
  region VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW()
);
