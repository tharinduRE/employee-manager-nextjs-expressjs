# Employee Manager 

NextJs + ExpressJs Full Stack Web Application.


### Apps and Packages

- `api`: a [Express.js](https://expressjs.com/) app
- `web`: another [Next.js](https://nextjs.org/) app
- `tsconfig`: `tsconfig.json`s used throughout the monorepo

### Develop

Download dependencies
```shell
npm install
```
Create a `.env` file on the root and add `MongoDB Connection String/URL` as Environment Variable

```
MONGODB_URL=mongodb+srv://...
```
To develop all apps and packages, run the following command:

```
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to see the frontend


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
