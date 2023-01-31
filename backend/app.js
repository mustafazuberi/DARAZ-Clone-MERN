const express = require('express')
const mongoose = require('mongoose')
const userModel = require('./models/userSchema')

const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const { stringToHash, varifyHash } = require('bcrypt-inzi')
const cors = require('cors')

const app = express()
const SECRET = process.env.SECRET || "topsecret"




app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200
}
app.use(cors(corsOptions));
app.use(express.json())
app.use(cookieParser())



app.post('/signup', (req, res) => {
    let body = req.body;

    if (!body.DOB || !body.fullName || !body.email || !body.password) {
        res.status(400).send(
            `required fields missing, request example: 
            {
                "fullName": "abc",
                "email": "abc@gmail.com",
                "password": "abc123",
                "DOB": "1/31/2023"
              }`
        );
        return;
    }
    req.body.email = req.body.email.toLowerCase()

    // Saving in Databse process
    userModel.findOne({ email: body.email }, (err, user) => {
        if (err) {
            // console.log("db error: ", err);
            res.status(500).send({ message: "db error in query" });
            return;
        }
        if (user) { //if  user already exist
            // console.log("user already exist: ", user);
            res.status(400).send({ message: "Sorry, user already exist, please try a different email." });
            return;
        } else {
            // converitng in hash using bcrypt-inzi library
            stringToHash(body.password).then(hashString => {
                userModel.create({
                    fullName: body.fullName,
                    email: body.email.toLowerCase(),
                    password: hashString,
                    DOB: body.DOB
                },
                    (err, result) => {
                        if (!err) {
                            // console.log("data saved: ", result);
                            res.status(201).send({ message: "User Registered Successfully" });
                        } else {
                            // console.log("db error: ", err);
                            res.status(500).send({ message: "internal server error" });
                        }
                    });
            })
        }

    })

})


app.post('/login', (req, res) => {
    let body = req.body;

    if (!body.email || !body.password) { // null check - undefined, "", 0 , false, null , NaN
        res.status(400).send(
            `required fields missing, request example: 
                {
                    "email": "abc@gmail.com",
                    "password": "12345"
                }`
        );
        return;
    }
    req.body.email = req.body.email.toLowerCase()
    // check if user already exist // query email user
    userModel.findOne(
        { email: body.email },
        // { email: 1, firstName: 1, lastName: 1, password: 1 },
        // "email -password",
        "email fullName DOB _id password",
        (err, data) => {
            if (!err) {
                // console.log("data: ", data);

                if (data) { // user found
                    varifyHash(body.password, data.password).then(isMatched => {

                        // console.log("isMatched: ", isMatched);

                        if (isMatched) {

                            const token = jwt.sign({
                                _id: data._id,
                                email: data.email,
                                iat: Math.floor(Date.now() / 1000) - 30,
                                exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24),
                            }, SECRET);

                            // console.log("token: ", token);

                            res.cookie('Token', token, {
                                maxAge: 86_400_000,
                                httpOnly: true
                            });

                            res.send({
                                message: "login successful",
                                profile: {
                                    email: data.email,
                                    fullName: data.fullName,
                                    DOB: data.DOB,
                                    _id: data._id
                                }
                            });
                            return;
                        } else {
                            // console.log("password did'nt match");
                            res.status(401).send({ message: "Incorrect email or password" });
                            return;
                        }
                    })

                } else { // user not already exist
                    // console.log("user not found");/
                    res.status(401).send({ message: "Incorrect email or password" });
                    return;
                }
            } else {
                // console.log("db error: ", err);
                res.status(500).send({ message: "login failed, please try later" });
                return;
            }
        })



})






app.post("/logout", (req, res) => {

    res.cookie('Token', '', {
        maxAge: 0,
        httpOnly: true
    });

    res.send({ message: "You have successfully logged out." });
})









app.get('/', (req, res) => {
    res.send('this is / page')
})





app.listen(4000, () => {
    console.log("server is running on http://localhost:4000")
})

/////////////////////////////////////////////////////////////////////////////////////////////////
let dbURI = "mongodb+srv://mustafa:mustafa123@daraz-clone.moefppx.mongodb.net/daraz-clone?retryWrites=true&w=majority";
// let dbURI = 'mongodb://localhost/mydatabase';
mongoose.connect(dbURI);


////////////////mongodb connected disconnected events///////////////////////////////////////////////
mongoose.connection.on('connected', function () {//connected
    console.log("Mongoose is connected");
    // process.exit(1);
});

mongoose.connection.on('disconnected', function () {//disconnected
    console.log("Mongoose is disconnected");
    process.exit(1);
});

mongoose.connection.on('error', function (err) {//any error
    console.log('Mongoose connection error: ', err);
    process.exit(1);
});

process.on('SIGINT', function () {/////this function will run jst before app is closing
    console.log("app is terminating");
    mongoose.connection.close(function () {
        console.log('Mongoose default connection closed');
        process.exit(0);
    });
});
////////////////mongodb connected disconnected events///////////////////////////////////////////////