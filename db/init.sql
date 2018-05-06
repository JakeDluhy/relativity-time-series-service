CREATE USER grafanareader WITH PASSWORD 'super_secret_password';
GRANT USAGE ON SCHEMA public TO grafanareader;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO grafanareader;

ALTER DEFAULT PRIVILEGES
  IN SCHEMA public
  GRANT SELECT ON TABLES TO grafanareader;
