-- seed.sql
-- --------
-- Seed demo users and some demo transactions.
--
-- Demo passwords (same for all):
--   Password@123
--
-- Note:
-- - password_hash values are bcrypt hashes of "Password@123" with cost=10.
-- - These are safe for demo only. Change passwords in real deployments.
--

-- Clear previous demo data (optional).
DELETE FROM transactions;
DELETE FROM users;

-- Insert users with fixed UUIDs so README credentials are stable.
INSERT INTO users (id, name, email, password_hash, role)
VALUES
  ('11111111-1111-1111-1111-111111111111', 'Admin Demo', 'admin@demo.com',
   '$2b$10$k3pYq3p3Oa1e2wXcX0sHwe9yF0bbmYwIY3eXUu0n1rFZ5hYc3f1pK', 'admin'),
  ('22222222-2222-2222-2222-222222222222', 'User Demo', 'user@demo.com',
   '$2b$10$k3pYq3p3Oa1e2wXcX0sHwe9yF0bbmYwIY3eXUu0n1rFZ5hYc3f1pK', 'user'),
  ('33333333-3333-3333-3333-333333333333', 'ReadOnly Demo', 'readonly@demo.com',
   '$2b$10$k3pYq3p3Oa1e2wXcX0sHwe9yF0bbmYwIY3eXUu0n1rFZ5hYc3f1pK', 'read-only');

-- Some demo transactions for the "user" account.
INSERT INTO transactions (user_id, title, amount, type, category, date)
VALUES
  ('22222222-2222-2222-2222-222222222222', 'Salary', 2500.00, 'income', 'Salary', CURRENT_DATE - INTERVAL '25 days'),
  ('22222222-2222-2222-2222-222222222222', 'Groceries', 120.50, 'expense', 'Food', CURRENT_DATE - INTERVAL '20 days'),
  ('22222222-2222-2222-2222-222222222222', 'Rent', 800.00, 'expense', 'Housing', CURRENT_DATE - INTERVAL '18 days'),
  ('22222222-2222-2222-2222-222222222222', 'Freelance', 400.00, 'income', 'Side Income', CURRENT_DATE - INTERVAL '15 days'),
  ('22222222-2222-2222-2222-222222222222', 'Electricity Bill', 60.00, 'expense', 'Utilities', CURRENT_DATE - INTERVAL '10 days'),
  ('22222222-2222-2222-2222-222222222222', 'Coffee', 8.50, 'expense', 'Food', CURRENT_DATE - INTERVAL '2 days');

