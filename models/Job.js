const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema({
    company: { 
        type: String,
        required: [true,"Must Provied a Company Name"],
        trim: true,
        maxlength: 50
    },
    position: {
        type: String,
        required: [true,"Must Provied a Position"],
        trim: true,
        minlength: 3,
        maxlength: 50
    },
    status: {
        type: String,
        enum: ["interview","declined","pending"],
        default: 'pending',
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        require: [true,"Please provide a user"]
    }
},{timestamps: true})

module.exports = mongoose.model('Job', JobSchema);