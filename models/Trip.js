import mongoose from "mongoose";

const tripSchema = new mongoose.Schema({
    place:{
        type: String,
        required: true,
    },
    startDate:{
        type: Date,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
});

const Trip = mongoose.model("Trip", tripSchema)

export default Trip