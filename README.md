# E-commerce_App
Micro-service based App

## frontend dependencies
1. react
2. react-router-dom
3. react-icons
4. Formik
5. [tailwind config](https://tailwindcss.com/docs/guides/create-react-app#setting-up-tailwind-css)

## backend dependencies

1. express
2. dotenv
3. cors 
4. mongooose (Database)  
5. express-session
6.  passport.js for OAuth & passport-google-oauth20 (<!-- kssk3487@gmail.com -->) 
7.  http-proxy-middleware (API Gateway) 

<!--19. kafka-node (Distributed Transaction)-->


## Service 1 User Registration and Login at PORT 4950 Using Google OAuth 
![image](https://github.com/kotharismeet-3/ED_mern/blob/main/images/google_oauth_flow.jpg)

Backend routes were
1. config passport.js with GoogleAPIKey & GoogleAPISecret
2. 4950/auth/google demands profile and gmail of user
3. 4950/auth/google/callback login users and intiate session
4. 4950/logout logouts user and clears session
5. 4950/ redirects to frontend used proxy

Corresponding Frontned Routes are
1. /auth/google
proxy was created in frontend as follows 
```
const {createProxyMiddleware} = require('http-proxy-middleware');
module.exports = function(app) {
    app.use('/auth/google', 
        createProxyMiddleware({ 
            "target" : 'http://localhost:4950/',
            "headers": {
                "Connection": "keep-alive"
            },
            "changeOrigin" : true 
        })
    )
};
```

## Service 2 Product Creation Updation and Deletion at 5000

Backend rooutes were

1. GET 5000/api/product gives all the products at frontend
2. POST 5000/api/product creates a new product
3. PUT 5000/api/product/:id Updates a product with it's ID
4. DELETE 5000/api/product/:id Deletes a product with it's ID
5. GET 5000/api/product/:id gets a specific product used in updating and placing orders

Frontend Routes were

1. 3000/product/create
2. 3000/product/update/:id
3. 3000/product/dalete/:id

## Service 3 Order Creation Updation and Deletion at 50505

Backend Routes were 

1.  POST 5050/api/order 

Corresponding Frontend Route
3000/myOrder/:id Order Product with it's id

Other Backend Routes related to admin stuff

1. GET 5050/api/orders gives all orders
2. GET 5050/api/orders/myOrders gives Order with specific User ID
3. GET 5050/api/order/:id gives Order with specific ID
4. PUT 5050/api/order/:id/pay Updates order to paid
5. PUT 5050/api/order/:id/deliver Updates order status to deliver

## Service 4 Frontend React.js Server at 3000

## Docker 
```
FROM node:16
WORKDIR /home/backend/
COPY backend ./
COPY backend/package.json ./
COPY backend/package-lock.json ./
RUN npm install
CMD ["npm", "run", "dev"]
EXPOSE 4950 5000 5050
```

Image Creation :- docker build -t kotharismeet/combinednodeapp .
Running Container from image :- docker run -p 4950:4950 -p 5000:5000 -p 5050:5050 kotharismeet/combinednodeapp
