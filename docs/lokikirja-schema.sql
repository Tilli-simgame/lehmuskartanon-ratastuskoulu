-- Lokikirja (camps and treks log) table
-- Add this to the same D1 database used by the guestbook
CREATE TABLE IF NOT EXISTS lokikirja (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT,
    event_type TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_lokikirja_created ON lokikirja(created_at DESC);
