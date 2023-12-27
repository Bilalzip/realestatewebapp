import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema({
    fullName:{
        type: 'string',
    },
    email: {
        type: 'string',
    },
    message: {
        type: 'string',
    }
   
})
const Contact = mongoose.models.property ||  mongoose.model("contactus", ContactSchema);
export default Contact;