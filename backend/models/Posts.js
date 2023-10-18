const mongoose = require("mongoose");
const OrderSchema = new mongoose.Schema({
    email: {
        type: String,
        default: "",
    },
    url: {
        type: String,
        default: "",
    }, 
    title: {
        type: String,
        default: "",
    },
});
module.exports = mongoose.model("posts", OrderSchema);