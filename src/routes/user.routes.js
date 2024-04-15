const express = require("express");
const { auth } = require("../middlewares/protectedRoutes.middlewares");
const {
  handleGetAllBrandProduct,
  handleGetAllBoutiqueProduct,
  handleGetAllBrandNames,
} = require("../controllers/user.controllers");

const router = express.Router();

// Brands -->
router.route("/brands").get(auth, handleGetAllBrandProduct);
router.route("/brandname").get(auth, handleGetAllBrandNames);

// Boutique -->
router.route("/boutiques").get(auth, handleGetAllBoutiqueProduct);

// Error handling middleware -->
router.use((err, req, res, next) => {
  console.error("Error in request:", err);
  if (err instanceof multer.MulterError) {
    return res
      .status(400)
      .json({ message: "File upload error: " + err.message });
  }
  res.status(500).json({ message: "Internal server error" });
});

module.exports = router;
