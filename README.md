# Relativity Time Series Solution
This is a solution to the relativity candidate project: https://github.com/RelativitySpace/sw_candidate_proj2. It uses TimescaleDB as a time series database with Grafana as an analytics dashboard. Node.js scripts are used to populate the database from the https://launchlibrary.net API for rocket launches.

## Installation
- Instructions are assuming Ubuntu 16.04
- Install `git`: `apt-get update && apt-get install git-core`
- Install `docker`: https://docs.docker.com/install/linux/docker-ce/ubuntu/#extra-steps-for-aufs
  * `sudo apt-get install apt-transport-https ca-certificates curl software-properties-common`
  * `curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -`
  * `sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"`
  * `sudo apt-get install docker.io`
- Install `docker-compose`: `sudo curl -L https://github.com/docker/compose/releases/download/1.21.2/docker-compose-$(uname -s)-$(uname -m) -o /usr/local/bin/docker-compose && sudo chmod +x /usr/local/bin/docker-compose`
- Create a new subdirectory `app`, pull the repo `git clone https://github.com/JakeDluhy/relativity-time-series-service.git`, and `cd relativity-time-series-service`
- For safety reasons, sensitive environment variables are not checked into source. However example files are located in `./config/`. For the purposes of this demo, you can copy and rename `grafana.env.example` and `postgres.env.example` to `grafana.env` and `postgres.env`.
- Run `docker-compose up -d` to start the image as a daemon
- Run `docker-compose run data npm run knex migrate:latest && docker-compose run data npm run seed` to seed the database with data from the API
- Navigate to http://localhost:3000 or if running on a server use the IP address instead of localhost, and log in using username `admin` and password `temporary_admin_password`
- Configure a data source:
  * Name: `timescaledb`
  * Type: `PostgreSQL`
  * Host: `db:5432` (db connects to the db service with docker-compose)
  * Database: `relativity`
  * User: `grafanareader`
  * Password: `super_secret_password`
  * SSL Mode: `disable`
- Add the dashboards. Click the `+` on the left hand side, followed by `Import`. The pre-configured dashboards are in `./grafana/dashboards`. Either copy and paste the json into the field presented for importing, or upload the `.json` files directly. This should load up two preconfigured dashboards: `Launch Information` and `Rocket Information`

## Notes
When looking at the dashboards, there's a few things to note:

- The data is not super clean. As such I did ended up just trying out some different graphs and queries and picked some that worked/were interesting.
- Grafana biases towards small timescales in it's configuration. Since we are dealing with rocket launches it makes sense to zoom out.

## Possible Enhancements
Unfortunately, I was not able to add all the bells, whistles, and enhancements that I wanted to. If I had more time, these are some of the changes I would have liked to make:

- Reverse proxy to serve the dashboard on port `80` instead of `3000`
- One-liner initialization. Although `docker` and `docker-compose` certainly reduce setup time and headaches. There are provisioning features in grafana where I could have preconfigured the data source and dashboards.
- Recurring CRON Job to pull fresh data and add it to the database. That was the main purpose of the `data` service after seeding the database, but I didn't get around to it.
- Better utilizing relational data to pull interesting queries. The cool thing about loading (almost) all of the `launchlibrary` data into the db is it offers some interesting relationships (agencies, rockets, rocket families, etc...). It would be cool to explore these.
- PostGIS. The `pads`  table contains longitude and latitude data. It would have been cool to explore that.

## Technical Debt
As I worked, I focused on certain parts of the project and neglected others unfortunately. These are parts I noted that I would want to revisit and fix up.

- Indexes. I did not add any indexes for my tables (except for the default time index by making launches into a hypertable). I partially did this in order to find out which indexes were necessary for the queries I was running on my dashboards, but I ran out of time to go back and implement + verify them.
- Clean up seed code. Although it's pretty clean, I did change approaches to pulling and iterating through the data midway through, and it could be unified a bit.
- Utilizing and understanding timescaledb better. I love the idea of timescaledb, and from what I've read it offers great performance. I would love to better understand how it works internally, and perhaps make use of some of the helper Postgres functions it provides.
