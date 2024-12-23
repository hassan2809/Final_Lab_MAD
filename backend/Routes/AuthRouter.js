const { signup, login, postRoomListing, getRoomListing, filterRoomListings, fetchUserDetails, updateUserDetails, forgotPassword, resetPassword, postTourPlan, getTourPackages, getProducts, postProducts } = require("../Controllers/AuthController");
const ensureAuthenticated = require("../Middlewares/Auth");
const { signupValidation, loginValidation } = require("../Middlewares/AuthValidation");
const upload = require("../Middlewares/ImageUploading");

const router = require("express").Router();

// router.post("/signup", signupValidation, signup)
router.post("/signup", signup)
// router.post("/login", loginValidation, login)
router.post("/login", login)

router.post("/postRoomListing", ensureAuthenticated, upload.array('images', 10), postRoomListing)
router.get("/getRoomListings", getRoomListing)
router.post("/filterRoomListings", filterRoomListings)
router.get("/fetchUserDetails", ensureAuthenticated, fetchUserDetails)
router.post("/updateUserDetails", ensureAuthenticated, updateUserDetails)
router.post("/forgotPassword", forgotPassword)
router.post("/resetPassword/:id/:token", resetPassword)
router.post("/postTourPlan", ensureAuthenticated, postTourPlan)
router.get("/getTourPackages", getTourPackages)
router.get("/products", getProducts)
router.post("/products", postProducts)

module.exports = router