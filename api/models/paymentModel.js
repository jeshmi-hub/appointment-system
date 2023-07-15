const mongoose = require('mongoose');

const paymentSchema = new mongoose({
    user_id :{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    address:{
        type: Object,
        required: true
    }
})

module.exports = mongoose.model("Payments", paymentSchema);