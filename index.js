const express = require("express");
const http = require("http");
const cors = require('cors');
require("dotenv").config();

const app = express();
app.use(
  cors({
    origin: "https://ridgeway-frontend.onrender.com",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);

app.use(express.json());


const AiRouter = require('./src/Helper/Aihelper');

app.use('/', AiRouter);


const server = http.createServer(app);


    server.listen(process.env.PORT|| 3000,() => {
      console.log(`Server is running on ${process.env.PORT_NO} `);
    });
  
