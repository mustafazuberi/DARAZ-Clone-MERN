const express = require('express')
const mongoose = require('mongoose')
const userModel = require('./models/userSchema')
const sellerModel = require('./models/sellerSchema')
const addProductModel = require('./models/addProductSchema')
const chatModel = require('./models/chatSchema')
const orderModel = require('./models/orderSchema')



const PORT = process.env.PORT ||  4000




const jwt = require('jsonwebtoken');
const ObjectId = require('mongodb').ObjectId;


const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const { stringToHash, varifyHash } = require('bcrypt-inzi')
const cors = require('cors')
const { db } = require('./models/addProductSchema')
const productModel = require('./models/addProductSchema')

const app = express()
const SECRET = process.env.SECRET || "topsecret"




app.use(bodyParser.urlencoded({ extended: false }))



// for base64
app.use(bodyParser.urlencoded({ limit: '50mb' }))
app.use(express.json({ limit: '50mb' }))
//////////////////////////////////////////////////////


app.use(bodyParser.json());
const corsOptions = {
    origin: 'https://daraz-clone-mr-zuberi.netlify.app',
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
                                    _id: data._id,
                                    wishlist: data.wishlist
                                },
                                whereToNavigate: "/"
                            });
                            return;
                        }
                    })


                } else if (!data) {
                    sellerModel.findOne(
                        { email: body.email },
                        "email fullName _id password phoneNumber shopName city country productCategory paymentMethod shopImageUrl",
                        (err, data) => {
                            if (!err) {
                                if (data) { // user found
                                    varifyHash(body.password, data.password).then(isMatched => {
                                        if (isMatched) {
                                            const token = jwt.sign({
                                                _id: data._id,
                                                email: data.email,
                                                iat: Math.floor(Date.now() / 1000) - 30,
                                                exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24),
                                            }, SECRET);
                                            res.cookie('Token', token, {
                                                maxAge: 86_400_000,
                                                httpOnly: true
                                            });

                                            res.send({
                                                message: "login successful",
                                                profile: {
                                                    email: data.email,
                                                    fullName: data.fullName,
                                                    _id: data._id,
                                                    phoneNumber: data.phoneNumber,
                                                    shopName: data.shopName,
                                                    country: data.country,
                                                    city: data.city,
                                                    productCategory: data.productCategory,
                                                    paymentMethod: data.paymentMethod,
                                                    shopImageUrl: data.shopImageUrl

                                                },
                                                whereToNavigate: "/sellerHome"
                                            });
                                            return;
                                        } else {
                                            res.send({ message: "Invalid email or password." })
                                        }
                                    })
                                }
                            } else {
                                res.status(500).send({ message: "login failed, please try later" });
                                return;
                            }
                        })
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




app.post('/signupAsSeller', (req, res) => {
    let body = req.body;
    req.body.email = req.body.email.toLowerCase()
    // checking in users collection 
    userModel.findOne({ email: body.email }, (err, user) => {
        if (err) {
            res.status(500).send({ message: "db error in query" });
            return;
        }
        if (user) {
            res.status(400).send({ message: "Sorry, user already exist, please try a different email." });
            return;
        }

        // Now checking in resturants collection if already exists
        sellerModel.findOne({ email: body.email }, (err, user) => {
            if (err) {
                res.status(500).send({ message: "db error in query" });
                return;
            }
            if (user) {
                res.send({ message: "Sorry, user already exist, please try a different email." });
                return;
            } else {
                // converitng in hash using bcrypt-inzi library
                stringToHash(body.password).then(hashString => {
                    sellerModel.create({
                        fullName: body.fullName,
                        email: body.email.toLowerCase(),
                        password: hashString,
                        phoneNumber: body.phoneNumber,
                        shopName: body.shopName,
                        city: body.city,
                        country: body.country,
                        productCategory: body.productCategory,
                        paymentMethod: body.paymentMethod,
                        shopImageUrl: body.shopImageUrl
                    },
                        (err, result) => {
                            if (!err) {
                                // console.log("data saved: ", result);
                                res.status(201).send({ message: "Store Created Successfully" });
                            } else {
                                // console.log("db error: ", err);
                                res.status(500).send({ message: "internal server error" });
                            }
                        });
                })
            }
        })



    })


})










app.post('/addProduct', (req, res) => {
    let body = req.body
    productModel.create(
        {
            _id: body._id + Date.now(),
            sellerId: body._id,
            productName: body.productName,
            productCategory: body.productCategory,
            productDescription: body.productDescription,
            productPrice: body.productPrice,
            productQuantity: body.productQuantity,
            productShippingCost: body.productShippingCost,
            productImage: body.productImage,
            createdOn: Date.now(),

        }
        ,
        (err, result) => {
            if (!err) {
                // result.shopImageUrl = result.shopImageUrl.slice(0, 9)
                console.log("data saved: ", result);
                res.status(201).send({ message: "Your product has been successfully added!" });
            } else {
                console.log("db error: ", err);
                res.status(500).send({ message: "internal server error" });
            }
        });
})









app.get('/getSellerProducts/:_id', (req, res) => {
    productModel.find(
        { sellerId: req.params._id },
        {}, (err, result) => {
            if (!err) {
                // console.log("data received: ", result);
                res.status(201).send(result);
            } else {
                // console.log("db error: ", err);
                res.status(500).send({ message: "internal server error" });
            }
        })
})





app.post('/updateProduct/:id', (req, res) => {
    let body = req.body
    productModel.findOneAndReplace({ _id: req.params.id }, {
        _id: req.params._id,
        sellerId: body.sellerId,
        productName: body.productName,
        productCategory: body.productCategory,
        productDescription: body.productDescription,
        productPrice: body.productPrice,
        productQuantity: body.productQuantity,
        productShippingCost: body.productShippingCost,
        productImage: body.productImage,
        createdOn: Date.now(),

    }, { new: true }, (err, result) => {
        if (!err) {
            console.log("data saved")
            res.send({ message: "Product updated successfully" })
        } else {
            console.log(err)
        }
    })
})








app.delete('/deleteProduct/:id', (req, res) => {
    productModel.deleteOne({ _id: req.params.id }, (err, result) => {
        if (!err) {
            console.log("deleted.")
            res.send({ message: "Product deleted successfully." })
        } else {
            console.log(err)
        }
    });
})











app.get('/getAllProducts', (req, res) => {
    productModel.find({}, (err, result) => {
        if (!err) {
            res.status(201).send(result);
        } else {
            res.status(500).send({ message: "internal server error" });
        }
    })
})





app.get('/detailPageProduct/:id', (req, res) => {
    productModel.findOne({ _id: req.params.id }, (err, result) => {
        if (!err) {
            res.send(result)
        } else {
            res.status(500).send({ message: "internal server error" });
        }
    })
})





app.get('/detailPageSeller/:sellerId', (req, res) => {
    sellerModel.findOne({ _id: req.params.sellerId }, (err, result) => {
        if (!err) {
            res.send(result)
        } else {
            res.status(500).send({ message: "internal server error" });
        }
    })
})








app.post('/followStore/:storeId', (req, res) => {
    sellerModel.findOneAndUpdate({ _id: ObjectId(req.params.storeId) }, {
        $push: {
            followers: { cutomerId: req.body.customerId }
        }
    }, (err, result) => {
        if (!err) {
            res.send({ result, message: "Your are following." })
        } else {
            console.log(err)
        }
    })
})






app.post('/updateShopInfo/:storeId', (req, res) => {
    sellerModel.findOneAndUpdate({ _id: ObjectId(req.params.storeId) }, {
        $set: {
            shopName: req.body.shopName,
            phoneNumber: req.body.shopPhoneNumber,
            city: req.body.city,
            productCategory: req.body.productCategory,
            shopImageUrl: req.body.shopImageUrl,
        }

    }, (err, result) => {
        if (!err) {
            console.log(result)
            // let updatedDoc = sellerModel.findOne({ _id: ObjectId(req.params.storeId) });
            res.send({ result, message: "Your shop information has been updated successfully!." })
        } else {
            console.log(err)
        }
    })
})









app.post('/addToWishlist/:userId', (req, res) => {
    userModel.findOneAndUpdate({ _id: ObjectId(req.params.userId) }, {
        $push: {
            wishlist: { item: req.body.product }
        }
    }, (err, result) => {
        if (!err) {
            res.send({ result, message: "Item Successfully Added to Wishlist!" })
        }
    })
})





app.get('/getUserData/:userId', (req, res) => {
    userModel.findOne({ _id: ObjectId(req.params.userId) }, (err, result) => {
        if (!err) {
            res.send(result)
        } else {
            console.log(err)
        }
    })
})






app.post('/updateWishList/:userId', (req, res) => {
    userModel.findOneAndUpdate({ _id: ObjectId(req.params.userId) },
        { $set: { wishlist: req.body.wishlist } }, (err, result) => {
            if (!err) {
                res.send({ result, message: "Product deleted successfully!" })
            } else {
                console.log(err)
            }
        })
})





app.get('/getChats', (req, res) => {
    chatModel.find({}, (err, result) => {
        if (!err) {
            res.send(result)
        } else {
            console.log(err)
        }
    })
})


app.post('/createChat', (req, res) => {
    chatModel.create({
        _id: req.body.userId + req.body.sellerId,
        userId: req.body.userId,
        sellerId: req.body.sellerId,
        userName: req.body.userName,
        sellerName: req.body.sellerName,
        sellerImageUrl: req.body.sellerImageUrl,
        messages: []
    }, (err, result) => {
        if (!err) {
            res.send({ result, message: "created" })
        } else {
            console.log(err)
        }
    })
})





app.post('/sendMessage', (req, res) => {
    const message = {
        text: req.body.text,
        createdOn: Date.now(),
        sendBy: req.body.sendBy,
        sendTo: req.body.sendTo
    }

    chatModel.findOneAndUpdate({ _id: req.body.chatRoomId }, {
        $push: {
            messages: { msgItem: message }
        }
    }, (err, result) => {
        if (!err) {
            res.send({ result, message: "Message Sent!" })
        } else {
            console.log(err)
        }
    })


})





app.get('/getMessages/:roomId', (req, res) => {
    chatModel.findOne({ _id: req.params.roomId }, (err, result) => {
        if (!err) {
            res.send(result)
        } else {
            console.log(err)
        }
    })
})




app.get('/getRealTimeMessages', (req, res) => {

    const changeStream = chatModel.watch();
    changeStream.on('change', (change) => {
        chatModel.findOne({ _id: req.params.roomId }, (err, result) => {
            if (!err) {
                res.send(result)
            } else {
                console.log(err)
            }
        })        // update the chat interface in real-time
    });

})








app.post('/comment', (req, res) => {
    const commentObj = {
        commentText: req.body.commentText, commentedBy: req.body.commentedBy, commentedbyUserName: req.body.commentedbyUserName
    }
    productModel.findOneAndUpdate({ _id: req.body.productId }, {
        $push: {
            comments: { item: commentObj }
        }
    }, (err, result) => {
        if (!err) {
            res.send({ result, message: "Comment Successfully Added!" })
        } else {
            console.log(err)
        }
    })
})










app.get('/getComments/:productId', (req, res) => {
    productModel.findOne({ _id: req.params.productId }, (err, result) => {
        if (!err) {
            res.send(result)
        } else {
            console.log(err)
        }
    })
})









app.post('/placeOrder', (req, res) => {
    orderModel.create({
        userInfo: req.body.userInfo,
        orderObj: req.body.orderObj,
        userId: req.body.userId,
        sellerId: req.body.sellerId,
    }, (err, result) => {
        if (!err) {
            res.send(result)
        } else {
            console.log(err)
        }
    })
})








app.get('/getOrders/:userId', (req, res) => {
    orderModel.find({ userId: req.params.userId }, (err, result) => {
        if (!err) {
            res.send(result)
        } else {
            console.log(err)
        }
    })
})









app.get('/getOrdersOnSellerPortal/:sellerId', (req, res) => {
    orderModel.find({ sellerId: req.params.sellerId }, (err, result) => {
        if (!err) {
            res.send(result)
        } else {
            console.log(err)
        }
    })
})









app.post('/updateStatus/:orderId', (req, res) => {
    orderModel.findOneAndUpdate({ _id: ObjectId(req.params.orderId) }, {
        $set: { ststus: req.body.status }
    }, (err, result) => {
        if (!err) {
            res.send(result)
        } else {
            console.log(result)
        }
    })
})





app.get('/', (req, res) => {
    res.send('this is / page')
})





































app.listen(PORT, () => {
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