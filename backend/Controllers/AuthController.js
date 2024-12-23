const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const nodemailer = require("nodemailer")
const UserModel = require("../Models/user");
const RoomListingModel = require("../Models/RoomListing");
const TourModel = require("../Models/Tour");
const ProductModel = require("../Models/Products");

const signup = async (req, res) => {
    try {
        // console.log("signup VVV")
        const { fullName, email, confirmPassword } = req.body;
        // console.log("confirm password is",confirmPassword)
        const user = await UserModel.findOne({ email });
        if (user) {
            return res.status(409).json({ message: "User is already exists.", success: false })
        }

        const userModel = new UserModel({ name: fullName, email, password: confirmPassword })
        userModel.password = await bcrypt.hash(confirmPassword, 10)
        await userModel.save()
        res.status(201).json({ message: "Signup Successfully", success: true })
    } catch (error) {
        res.status(500).json({ message: "Internal Server Erorr...", success: false })
        console.log(error)
    }
}

const login = async (req, res) => {
    try {
        // console.log("signup VVV")
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(403).json({ message: "User not exists.Authentication Failed!!!", success: false })
        }

        const passwordCheck = await bcrypt.compare(password, user.password)
        if (!passwordCheck) {
            return res.status(403).json({ message: "Password is wrong.Authentication Failed!!!", success: false })
        }

        const jwtToken = jwt.sign({ email: user.email, _id: user._id },
            process.env.JWT_ENCRYPT,
            { expiresIn: "24h" }
        )

        res.status(201).json({ message: "Login Successfully", success: true, jwtToken, email, name: user.name })
    } catch (error) {
        res.status(500).json({ message: "Internal Server Erorr...", success: false })
        console.log(error)
    }
}

const postRoomListing = async (req, res) => {
    try {
        // console.log("signup VVV")
        const userId = req.user.id;
        const { amenities, description, furnished, location, price, roomType, title } = req.body;

        const imagePaths = req.files.map((file) => `/uploads/${file.filename}`);
        const roomListingModel = new RoomListingModel({ amenities, description, furnished, location, price, roomType, title, user: userId, images: imagePaths })
        await roomListingModel.save()
        res.status(201).json({ message: "Room Listing Successful", success: true })
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Erorr...", success: false })
        console.log(error)
    }
}

const getRoomListing = async (req, res) => {
    try {
        const listings = await RoomListingModel.find();
        res.status(200).json({ success: true, data: listings });
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Erorr...", success: false })
        // console.log(error)
    }
}

const filterRoomListings = async (req, res) => {
    try {
        const { minPrice, maxPrice, roomType, location, furnished } = req.body;
        // console.log(req.body)
        const query = {};
        if (minPrice > 0) {
            query.price = { $gte: 0, $lte: minPrice }
        }
        if (roomType && roomType != 'any') {
            query.roomType = roomType.toLowerCase();
        }
        if (location) {
            query.location = new RegExp(location, "i");
        }
        if (furnished && furnished != 'any') {
            query.furnished = furnished.toLowerCase();
        }

        // console.log("querry is:", query)

        const listings = await RoomListingModel.find(query);
        res.status(200).json({ data: listings, success: true });
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Erorr...", success: false })
        // console.log(error)
    }
}
const fetchUserDetails = async (req, res) => {
    try {
        // console.log(req)
        res.status(200).json({
            message: "Fetch User details...",
            name: req.user.name,
            email: req.user.email,
            success: true,
        });
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Erorr...", success: false })
    }
}
const updateUserDetails = async (req, res) => {
    try {
        // console.log(req.user)
        // console.log("updateUserDetails")
        const { name, email, currentPassword, newPassword } = req.body;
        // console.log(newPassword)
        const userId = req.user._id;
        // console.log(userId)
        const user = await UserModel.findById(userId);
        // console.log(user)
        if (currentPassword && newPassword) {
            const passwordCheck = await bcrypt.compare(currentPassword, user.password)
            // console.log(passwordCheck)
            if (!passwordCheck) {
                return res.status(403).json({ message: "Current Password is wrong.", success: false })
            }
            user.password = await bcrypt.hash(newPassword, 10)
        }
        if (name) user.name = name;
        if (email) user.email = email;

        await user.save();
        res.status(200).json({ message: 'User details updated successfully', success: "true" });
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Erorr...", success: false })
    }
}
const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await UserModel.findOne({ email })
        // console.log(user)
        if (!user) {
            return res.status(403).json({ message: "User not exists.Authentication Failed!!!", success: false })
        }

        const jwtToken = jwt.sign({ _id: user._id },
            process.env.JWT_ENCRYPT,
            { expiresIn: "24h" }
        )

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.NODEMAILER_EMAIL,
                pass: process.env.NODEMAILER_PASSWORD
            }
        });

        var mailOptions = {
            from: process.env.NODEMAILER_EMAIL,
            to: email || 'fa21-bse-069@cuilahore.edu.pk',
            subject: 'Reset Your Password - Action Required',
            // text: `http://localhost:5173/resetPassword/${user._id}/${jwtToken}`
            html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <h2 style="color: #4CAF50;">Reset Your Password</h2>
            <p>Hi ${user.name || 'User'},</p>
            <p>We received a request to reset your password. You can reset it by clicking the button below:</p>
            <a href="http://localhost:5173/resetPassword/${user._id}/${jwtToken}" 
                style="display: inline-block; padding: 10px 15px; font-size: 16px; color: #fff; background-color: #4CAF50; text-decoration: none; border-radius: 5px;">
                Reset Password
            </a>
            <p>If you didn’t request this, please ignore this email. Your password will remain unchanged.</p>
            <p>Thanks, <br>The Team</p>
            </div>
            `
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
        res.status(200).json({ message: 'Reset Password link is send on the email.', success: "true" });
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Erorr...", success: false })
    }
}
const resetPassword = async (req, res) => {
    try {
        // console.log(req)
        // console.log(req.body)
        const { id, token } = req.params
        const { confirmPassword } = req.body

        if (!id || !token) {
            return res.status(400).json({ message: "Invalid request data", success: false });
        }

        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_ENCRYPT);
        } catch (err) {
            return res.status(400).json({ message: "Invalid or expired token", success: false });
        }

        const user = await UserModel.findById(id);
        user.password = await bcrypt.hash(confirmPassword, 10)
        await user.save()
        res.status(200).json({ message: 'Password reset successfully.', success: "true" });
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Erorr...", success: false })
    }
}
const postTourPlan = async (req, res) => {
    try {
        const { destination, startDate, endDate, transportMode, travelCost, foodCost, miscellaneousCost, accommodationCost, numberOfDays, companions, itinerary, totalBudget } = req.body;
        const emails = companions.map(key => key.email);

        const tourPlanModel = new TourModel({
            destination,
            startDate,
            endDate,
            transportMode,
            travelCost,
            foodCost,
            miscellaneousCost,
            accommodationCost,
            numberOfDays,
            companions,
            itinerary,
            totalBudget
        });
        await tourPlanModel.save();

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.NODEMAILER_EMAIL,
                pass: process.env.NODEMAILER_PASSWORD
            }
        });

        const emailPromises = emails.map(email => {
            const mailOptions = {
                from: process.env.NODEMAILER_EMAIL,
                to: email,
                subject: `You're Invited to Join a Tour to ${destination}!`,
                html: `
                <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
                <p>Hi there,</p>
                <p>We are excited to invite you to an unforgettable tour to <strong>${destination}</strong>. Here are the details:</p>
                <ul style="list-style: none; padding: 0;">
                    <li><strong>Destination:</strong> ${destination}</li>
                    <li><strong>Duration:</strong> ${numberOfDays} days Trip</li>
                    <li><strong>Start Date:</strong> ${new Date(startDate).toLocaleDateString()}</li>
                    <li><strong>End Date:</strong> ${new Date(endDate).toLocaleDateString()}</li>
                </ul>
                <p>We hope you can join us for this exciting adventure. Check your account for more details and to confirm your participation.</p>
                <p style="text-align: center;">
                    <a href="#" style="display: inline-block; background-color: #4CAF50; color: white; text-decoration: none; padding: 10px 20px; border-radius: 5px;">View Details & Confirm</a>
                </p>
                <p>We look forward to traveling with you!</p>
                <p>Thanks, <br>The Team</p>
                </div>
                `
            };

            return transporter.sendMail(mailOptions);
        });


        await Promise.all(emailPromises);

        res.status(200).json({ message: 'Tour Plan saved successfully', success: "true" });
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Erorr...", success: false })
    }
}

const getTourPackages = async (req, res) => {
    try {
        const packages = await TourModel.find();
        res.status(200).json({ success: true, data: packages });
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Erorr...", success: false })
        // console.log(error)
    }
}

const getProducts = async (req, res) => {
    try {
        const products = await ProductModel.find();
        res.json(products);
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Erorr...", success: false })
        // console.log(error)
    }
}

const postProducts = async (req, res) => {
    try {
        console.log(req.body)
        const newProduct = new ProductModel(req.body);
        await newProduct.save();
        res.json(newProduct);
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Erorr...", success: false })
        // console.log(error)
    }
}


module.exports = {
    signup, login, postRoomListing, getRoomListing, filterRoomListings, fetchUserDetails, updateUserDetails, forgotPassword, resetPassword, postTourPlan, getTourPackages, getProducts,postProducts
}