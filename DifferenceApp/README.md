# Nuxt 3 Minimal Starter

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup
Remove node_modules and package-lock.json (if you have npm) or yarn.lock (if you have yarn) before installing dependencies.  
Make sure to install the dependencies:  


```bash
# yarn
npm install -g yarn
yarn install

# npm
npm install

# pnpm
npm install -g pnpm
pnpm install
```

### dépendance non trouvée 

```bash
yarn  i -D @sidebase/nuxt-auth
yarn add next-auth
yarn add  @next-auth/prisma-adapter

yarn i
```

## Development Server

Start the development server on http://localhost:3000

```bash
npm run dev
```

## Production

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```


## Prisma ORM integration add client

Check out the [prisma documentation](https://www.prisma.io/docs) for more information.


```bash
npx prisma generate 
```


### Prisma Migrate if changes in the schema (schema.prisma)
```bash
npx prisma migrate dev --name init
```

### Verify the database
```bash
sqlite3 .\prisma\dev.db
```
show users table
```bash
select * from "User";
```


Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
