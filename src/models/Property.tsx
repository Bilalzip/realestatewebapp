import mongoose from "mongoose";

const PropertySchema = new mongoose.Schema({
    state: String,  name:String, streetaddress:String, pincode:String, landmark:String,  imgarray: [{ type: String }], slug:String,  description:String,price:String, bedrooms:String, bathrooms:String,
    features: [String],
    embedding: { type: [Number], index: "2dsphere" }, 
})
const Property = mongoose.models.property ||  mongoose.model("property", PropertySchema);
export default Property;