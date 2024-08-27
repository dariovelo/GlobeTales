const express = require("express");
const router = express.Router();
const {
  register,
  login,
  profile,
  updateVisitedCountries,
  getUserDetailsById,
} = require("../controllers/userControllers");
const { protect } = require("../middleware/authMiddleware");

router.post("/register", register);
router.post("/login", login);
router.get("/profile", protect, profile);
router.put("/profile/visited-countries", protect, updateVisitedCountries);
router.get("/:userId", getUserDetailsById);

module.exports = router;
