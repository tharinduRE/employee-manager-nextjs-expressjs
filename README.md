# Employee Manager 

<!---
![Next.js](https://img.shields.io/badge/Next-20232A?style=for-the-badge&logo=next.js)
![Express.js](https://img.shields.io/badge/express-20232A?style=for-the-badge&logo=express)
![Mongo](https://img.shields.io/badge/mongo-20232A?style=for-the-badge&logo=mongodb)
![Redux](https://img.shields.io/badge/redux-20232A?style=for-the-badge&logo=redux)
![Turborepo](https://img.shields.io/badge/turborepo-20232A?style=for-the-badge&logo=turborepo)
![typescript](https://img.shields.io/badge/typescript-20232A?style=for-the-badge&logo=typescript)
--->

Next.js + Express.js Full Stack Web Application.

### Apps and Packages

- `apps/api`: a [Express.js](https://expressjs.com/) app
- `apps/web`: a [Next.js](https://nextjs.org/) app
- `packages`
  - `eslint-config-custom`: custom `eslint` config used throughout the monorepo
  - `tsconfig`: `tsconfig.json`s used throughout the monorepo

### Develop

Download dependencies
```shell
npm install
```
Create a `.env` file on the <b>root</b> and add `MongoDB Connection String/URL` as Environment Variable

```
MONGODB_URL=mongodb+srv://...
```
To develop all apps and packages, run the following command:

```
npm run dev
```
- Open [http://localhost:3000](http://localhost:3000) to see the frontend
- Open [http://localhost:8080](http://localhost:8080) to see the backend

To Start frontend and backend indvidually, run following command

```bash
# to run backend
npm run dev:api

# to run frontend
npm run dev:web
```

### Test

To test all apps, run the following command:

```
npm run test
```

To run tests in watch mode
```
npm run test:watch
```

### Build

To build all apps and packages, run the following command:

```
npm run build
```
## API Documentation
API Documentation available via Swagger UI endpoint located at
[http://localhost:8080/api/v1/docs](http://localhost:8080/api/v1/docs)
## Useful Links

- [TurboRepo](https://turbo.build/) - MonoRepo used in this application.
