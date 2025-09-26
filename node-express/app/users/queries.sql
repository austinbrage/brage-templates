-- getAll 
SELECT id, name, email FROM users

-- getByID 
SELECT id, name, email FROM users WHERE id = ?

-- addNew
INSERT INTO users (name, email) VALUES (?, ?)

-- changeAll 
UPDATE users SET name = ?, email = ? WHERE id = ?

-- remove
DELETE FROM users WHERE id = ?