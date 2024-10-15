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
            unique : true,
            lowercase : true,
            trim : true,
            validate: {
           validator: function (v) {
           return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
          },
           message: (props) => `${props.value} is not a valid email!`,
           },
        },
        message : {
            type : String,
            required : true,
            trim: true
        },
    },
);

export const User = mongoose.model("User", userSchema);