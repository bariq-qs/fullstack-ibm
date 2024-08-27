# Nuxt 3 FullStack

## Prerequisites
* This project when intital use node version 18.19.0
* Please ensure your node version is >= 18.19.0
* Install postgres for DBMS
* Create env file and add 
`DATABASE_URL=postgresql://username:password@localhost:5432/name-db`<br />
`JWT_SECRET`

## Project setup
```bash
yarn install
```
```bash
yarn db-push
```
```bash
yarn db-seed
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
yarn dev
```

## Production

Build the application for production:

```bash
yarn build
```

Locally preview production build:

```bash
yarn preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
