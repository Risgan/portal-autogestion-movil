-- Crear tablas
CREATE TABLE plans (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  price NUMERIC(10,2) NOT NULL,
  data_gb INTEGER NOT NULL,
  minutes INTEGER NOT NULL,
  sms INTEGER NOT NULL,
  description TEXT
);

CREATE TABLE users (
  id BIGSERIAL PRIMARY KEY,
  account_number VARCHAR(50) NOT NULL,
  number_id VARCHAR(20) NOT NULL,
  phone_number VARCHAR(20) NOT NULL,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  plan_id BIGINT REFERENCES plans(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE bills (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT REFERENCES users(id),
  plan_id BIGINT REFERENCES plans(id),
  period VARCHAR(20) NOT NULL,
  amount NUMERIC(10,2) NOT NULL,
  due_date DATE NOT NULL,
  issue_date DATE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE usage (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT REFERENCES users(id),
  data_gb INTEGER NOT NULL,
  minutes INTEGER NOT NULL,
  sms INTEGER NOT NULL,
  last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Poblar datos de prueba
INSERT INTO plans (name, price, data_gb, minutes, sms, description) VALUES
  ('Plan Básico', 10.00, 5, 100, 50, 'Plan básico para usuarios de bajo consumo'),
  ('Plan Intermedio', 20.00, 20, 500, 200, 'Plan intermedio para usuarios promedio'),
  ('Plan Premium', 35.00, 50, 2000, 1000, 'Plan premium para usuarios exigentes');

INSERT INTO users (account_number, number_id, phone_number, name, email, plan_id) VALUES
  ('ACC001', '12345678', '5551001001', 'Juan Pérez', 'juan.perez@email.com', 1),
  ('ACC002', '87654321', '5551001002', 'Ana Gómez', 'ana.gomez@email.com', 2),
  ('ACC003', '11223344', '5551001003', 'Carlos Ruiz', 'carlos.ruiz@email.com', 3);

-- Corrige: todas las filas de usage deben tener last_updated
INSERT INTO usage (user_id, data_gb, minutes, sms, last_updated) VALUES
  (1, 2, 40, 10, '2025-07-22'),
  (2, 10, 200, 50, '2025-07-22'),
  (3, 30, 1500, 500, '2025-07-22'),
  (1, 3, 60, 15, '2025-04-15'),
  (1, 4, 80, 20, '2025-05-15'),
  (1, 5, 100, 25, '2025-06-15'),
  (2, 12, 300, 80, '2025-04-15'),
  (2, 15, 350, 100, '2025-05-15'),
  (2, 18, 400, 120, '2025-06-15'),
  (3, 35, 1600, 600, '2025-04-15'),
  (3, 38, 1700, 700, '2025-05-15'),
  (3, 40, 1800, 800, '2025-06-15');

INSERT INTO bills (user_id, plan_id, period, amount, due_date, issue_date) VALUES
  (1, 1, '2024-01', 10.00, '2024-02-10', '2024-01-31'),
  (1, 1, '2024-02', 10.00, '2024-03-10', '2024-02-29'),
  (2, 2, '2024-01', 20.00, '2024-02-10', '2024-01-31'),
  (3, 3, '2024-01', 35.00, '2024-02-10', '2024-01-31'),
  (1, 1, '2024-03', 10.00, '2024-04-10', '2024-03-31'),
  (1, 1, '2024-04', 10.00, '2024-05-10', '2024-04-30'),
  (1, 1, '2024-05', 10.00, '2024-06-10', '2024-05-31'),
  (1, 1, '2024-06', 10.00, '2024-07-10', '2024-06-30'),
  (1, 1, '2025-04', 10.00, '2025-05-10', '2025-04-30'),
  (1, 1, '2025-05', 10.00, '2025-06-10', '2025-05-31'),
  (1, 1, '2025-06', 10.00, '2025-07-10', '2025-06-30'),
  (2, 2, '2024-03', 20.00, '2024-04-10', '2024-03-31'),
  (2, 2, '2024-04', 20.00, '2024-05-10', '2024-04-30'),
  (2, 2, '2024-05', 20.00, '2024-06-10', '2024-05-31'),
  (2, 2, '2024-06', 20.00, '2024-07-10', '2024-06-30'),
  (2, 2, '2025-04', 20.00, '2025-05-10', '2025-04-30'),
  (2, 2, '2025-05', 20.00, '2025-06-10', '2025-05-31'),
  (2, 2, '2025-06', 20.00, '2025-07-10', '2025-06-30'),
  (3, 3, '2024-03', 35.00, '2024-04-10', '2024-03-31'),
  (3, 3, '2024-04', 35.00, '2024-05-10', '2024-04-30'),
  (3, 3, '2024-05', 35.00, '2024-06-10', '2024-05-31'),
  (3, 3, '2024-06', 35.00, '2024-07-10', '2024-06-30'),
  (3, 3, '2025-04', 35.00, '2025-05-10', '2025-04-30'),
  (3, 3, '2025-05', 35.00, '2025-06-10', '2025-05-31'),
  (3, 3, '2025-06', 35.00, '2025-07-10', '2025-06-30'); 

  