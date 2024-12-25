const express = require("express");
const app = express();
const cors = require("cors")
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const xss = require('xss-clean');
const rateLimit = require("express-rate-limit");
const createError = require("http-errors");
const productRouter = require("./router/productRouter");
const { errorResponse } = require("./controller/responesController");
const userRouter = require("./router/userRouter");


app.use(cors());
app.use(morgan("dev"));
app.use(xss());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate Limiting Middleware (e.g., 100 requests per 15 minutes)
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again after 15 minutes',
});

app.use(limiter);

app.use('/api/users', userRouter)
app.use('/api/products', productRouter)



//route  error handler
app.use((req, res, next) => {
    next(createError(404, "route not found"));
});

// server err handler
app.use((err, req, res, next) => {
    return errorResponse(res, {
        statusCode: err.status,
        message: err.message
    })
});



module.exports = app