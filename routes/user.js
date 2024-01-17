const router = require("express").Router();
const CryptoJS = require("crypto-js");
const User = require("../model/User");
const verify = require("../varifyToken");
//update

router.put("/:id", verify, async (req, res) => {
  if (req.user.id === req.params.id || req.user.isAdmon) {
    if (req.body.password) {
      req.body.password = CryptoJS.AES.encrypt(
        req.body.password,
        process.env.SECRET_KEY
      ).toString();
    }
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("you can update only your account");
  }
});
//delete
router.delete("/:id", verify, async (req, res) => {
  if (req.user.id === req.params.id || req.user.isAdmin) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("user Hase Been deleted");
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("you can delete only your account");
  }
});
//get
router.get("/find/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...info } = user._doc;
    res.status(200).json(info);
  } catch (error) {
    res.status(500).json(error);
  }
});
//get All user
router.get("/", verify, async (req, res) => {
  const qurrey = req.query.new;
  if (req.user.isAdmin) {
    try {
      const user = qurrey
        ? await User.find().sort({ _id: -1 }).limit(5)
        : await User.find();
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("you are not allowed to see all you users ");
  }
});
//GTE USER STATUS
router.get("/status", async (req, res) => {
  const today = new Date();
  const lastYear = today.setFullYear(today.setFullYear() - 1);
  try {
    const data = await User.aggregate([
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
});
module.exports = router;
