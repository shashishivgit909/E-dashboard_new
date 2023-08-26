const express = require("express");
const cors = require("cors"); // "cors " is installed using termial below and imported here to resolve cors issue which may occur while integrating backend and frontend; 
require("./database/config");
const Product = require("./database/Product");
const User = require('./database/User');
const app = express();

const Jwt = require("jsonwebtoken");
const jwtkey = "e-comm"; // this is kept secret  , otherwise any user  cangenerate token by this.

app.use(express.json());

app.use(cors());
//this is sign up API : data(registration detail of a user)  save  to database which is coming from signUP (react)
app.post("/register", async (req, resp) => {

    const user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password; // we cannot use .select("-password") in save() s we delete it like this below line ; 
    console.log(result);
    //resp.send(result); // (replaces reso.send( with jwt applly function ))

    //jwt token apply in this API 
    Jwt.sign({ result }, jwtkey , { expiresIn: "2h" }, (error, token) => {
        if (error) {
            resp.send({ result: "something occur plaease try agaian" });
        }
      resp.send({ result, auth: token });
        
    })

})

// NOte://way to use JWT authentication in API is hown below in this API
//Note:post() method is always used for login API for security purpose.(but there is nothing to save to dtabsse in this API)
app.post("/login", async (req, resp) => {
    //  now we want that if both req.body.email and req.body.password are given then only this serach opreation and rest will be be done for that we use below condition.
    if (req.body.email && req.body.password) {
        let user = await User.findOne(req.body).select("-password");  //finds req.body sent by postman or react in database and return record if found by eliminating password , else return error.

        if (user) {
            // resp.send(user); //body is not function ,its aproperty so use "body" not "body()"
            Jwt.sign({ user }, jwtkey , { expiresIn: "2h" }, (error, token) => {
                if (error) {
                    resp.send({ result: "something occur plaease try agaian" });
                }
              resp.send({ user, auth: token });
                
            })
        }
        else {
            resp.send({ result: "user not found" });
        }
    }
    else {
        resp.send({ result: "user not found" });
    }


})

//api  for Add-product: we have used post route method
app.post("/add-product", async (req, resp) => {
    let product = new Product(req.body);
    let result = await product.save();
    resp.send(result);
});

//api for listing product : find  all doc from collection: Products and send it  as response.
app.get("/products", async (req, resp) => {
    let products = await Product.find(); // this gives arrays of all documeents in Products collection.
    products.length > 0 ? resp.send(products) : resp.send({ result: "No products found" });
})

//API to delete doc from  database for given ID
app.delete("/delete/:id", async (req, resp) => {
    let id = req.params.id;
    const result = await Product.deleteOne({ _id: id });
    resp.send(result);
}
)

//API to get data  from Databse for specific given Id 
app.get("/update/:id", async (req, resp) => {
    let result = await Product.findOne({ _id: req.params.id });
    if (result) {
        resp.send({ result });
    }
    else {
        resp.send({ result: "record cannot found" });
    }
})

//API TO update data(given from frontend) for given ID :, To update we use put() method
app.put("/update/:id", async (req, resp) => {

    let result = await Product.updateOne(
        { _id: req.params.id }, // condition 
        { $set: req.body }) //req.body is kept  for that ID
    resp.send(result);
})

//Api to seacrc document(i.e row) for  particular key(value) in database 
app.get("/search/:key", async (req, resp) => {
    //below find searches in 3 colums name, company, category , this syntax need to follow if we want to search for any random column 
    let result = await Product.find({
        "$or": [
            {
                name: { $regex: req.params.key }
            },
            {
                company: { $regex: req.params.key }
            },
            {
                category: { $regex: req.params.key }
            }
        ]
    });
    resp.send(result);
})

app.listen(5000);
