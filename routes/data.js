const router = require("express").Router();
require("dotenv").config();

router.get("/send-garda-order", async (req,res) => {
  try{
    res
    .status(200)
    .send({ message: "Gardi notified!" });
  }catch (err){
    res.status(500).json({ success: false, error: err });
  }
})

module.exports = router;
