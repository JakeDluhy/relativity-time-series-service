# Relativity Time Series Solution
This is a solution to the relativity candidate project: https://github.com/RelativitySpace/sw_candidate_proj2. It uses TimescaleDB as a time series database with Grafana as an analytics dashboard. Node.js scripts are used to populate the database.

## Installation
- Pull the repo `git clone git@github.com:JakeDluhy/relativity-time-series-service.git`
- Prepare grafana `docker volume create grafana-storage`
- Prepare timescaledb `docker volume create timescaledb-storage`
- Run `docker-compose up`, navigate to http://localhost:3000, and log in using username `admin` and password `temporary_admin_password`
- Configure a data source:
  * Name: `timescaledb`
  * Type: `PostgreSQL`
  * Host: `db:5432` (db connects to the db service with docker-compose)
  * Database: `relativity`
  * User: `grafanareader`
  * Password: `super_secret_password`
  * SSL Mode: `disable`
