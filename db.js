const mongoose = require("mongoose");

const MONGO_URI =
  process.env.MONGO_URI ||
  "mongodb+srv://albertakpos:megamaner12@albertakpos-mongodb-ltysy.mongodb.net/test?retryWrites=true&w=majority";

//connect db function
const connect = () => {
  mongoose
    .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("DB connected"))
    .catch((err) => console.log(err));

  mongoose.connection.on("error", (err) => {
    console.log("DB connection error" + err);
  });
};

module.exports = { connect };
