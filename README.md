# news-explorer-api server
version : 1.0.0
## Public test server

https://oshusha.ru/api/ or https://api.oshusha.ru/
## How to develop the server

**Initialize the environment**

1\. Clone the repository:

```bash
git clone https://github.com/oshusha/places-backend.git
cd places-backend
```


2\. Install the dependencies:

```bash
npm install
```


**Launch the server**

1\. Run the development server 

In development mode with hot reload:
```bash
npm run dev
```
In production mode:
```bash
npm run start
```

2\. Open [localhost:3000](http://localhost:3000) to see the live server.



`By default, this server runs on port 3000.
To change the default port the nodejs server instance is listening on, 
simply use the .env file:`

ex:
DATABASE_URL=mongodb://127.0.0.1:27017/news

PORT=3000

API methods:

POST /signup - create user

POST /signin - log in as user

GET /users/me - get user's info

GET /articles - get all user's articles

POST /articles - create an article

DELETE /articles/:articleId - delete article by id
