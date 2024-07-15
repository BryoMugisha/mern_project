import mongoose from "mongoose"

const PatientSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    phone: {
        type: String,
        require: true,
        unique: true
    },
    bmi: {
        type: String,
        require: true
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }
    
})

const PatientModel = mongoose.model("patient", PatientSchema)
export {PatientModel}