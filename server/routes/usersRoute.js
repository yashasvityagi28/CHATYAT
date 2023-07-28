const User = require("../models/userModel");
const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/authMiddleware");

//user registration

router.post("/register", async (req, res) => {
    try {
        //check for unique email
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.send({
                success: false,
                message: "Email already registred"
            })
        }

        //new user
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        req.body.password = hashedPassword;
        const newUser = new User(req.body);
        await newUser.save();
        res.send({
            success: true,
            message: "Profile Created Successfully"
        });


    } catch (error) {
        res.send({
            message: error.message,
            success: false,
        });
    }
});

//user login

router.post("/", async (req, res) => {

    try {
        //verify user
        const user = await User.findOne({email: req.body.email});

        if (!user) {
            return res.send({
                success: false,
                message: "User not Found",
            });
        }

        //verify password

        const validPassword = await bcrypt.compare(

            req.body.password,
            user.password
        );

        if (!validPassword) {
            return res.send({
                success: false,
                message: "Invalid Password",
            });
        }

        //create and assign a token

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET , {
            expiresIn: "1d",
        });
        res.send({
            success: true,
            message: "User logged in successfully",
            data: token,
        });

    } catch (error) {
        res.send({
            message: error.message,
            success: false,
        });
    }

});


//get current user

router.get("/get-current-user", authMiddleware, async(req, res) =>{
    try {
        const user = await User.findOne({_id:req.body.userId});
        res.send({
            success: true,
            message: "User fetched successfully",
            data: user,
        });
    } catch (error) {
        res.send({
            message: error.message,
            success: false,
        });
    }
});

module.exports = router;
