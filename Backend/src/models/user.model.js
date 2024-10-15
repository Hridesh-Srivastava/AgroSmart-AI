import mongoose , { Schema } from "mongoose";

const userSchema = new Schema(
    {
        name : {
            type : String,
            required : true,
            trim : true,
            index : true
        },
        email : {
            type : String,
            required : true,
            lowercase : true,
            trim : true
        },
        message : {
            type : String,
            required : true,
            trim: true
        },
    },
);

export const User = mongoose.model("User", userSchema);