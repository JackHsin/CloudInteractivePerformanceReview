This is Jack Hsin Cloud Interactive Interview Homework

Backend: pr-server(Nest.JS)

Frontend: pr-client(Next.JS)

## Server Install and Run

```bash
# Move to pr-server folder
$ cd pr-server

# Install packages
$ npm install

# Create local .env via .env.example
$ cp .env.example .env

# Install and Run MySQL Container
$ docker-compose up -d

# Migrate MySQL DB
$ npm run migration run local

# Run Server at 3000
$ npm run start:dev


```

## Client Install and Run

```bash
# Move to pr-client folder
$ cd pr-client

# Install packages
$ npm install

# Run Server at 3001
$ npm run dev
```

## Manual

- Admin

1. Default Admin Account/Password: admin/admin
2. Login into admin
3. Go to Account page by upper-left navigation
4. Add accounts
5. Go to Review
6. Add new review

- Employee

1. Open a incognito(private) or another browser
2. Login with non-admin account
3. Go to Review submit feedback

# TODO for Future

- Add update actions for admin review and account editing
