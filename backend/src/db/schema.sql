CREATE TABLE IF NOT EXISTS conversations (
  id TEXT PRIMARY KEY,
  createdAt TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS messages (
  id TEXT PRIMARY KEY,
  conversationId TEXT NOT NULL,
  sender TEXT NOT NULL CHECK(sender IN ('user', 'assistant')),
  text TEXT NOT NULL,
  timestamp TEXT NOT NULL,
  FOREIGN KEY (conversationId) REFERENCES conversations(id)
);
