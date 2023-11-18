import mongoose from "mongoose";
import mongoose_delete from "mongoose-delete";

const orderSchema = new mongoose.Schema({
  package: {
    category: { type: String },
    weight: { type: Number },
  },
  sender: {
    name: { type: String },
    address: { type: String },
    zip_code: { type: String },
    phone: { type: String },
    email: { type: String },
    request: { type: String },
  },
  receiver: {
    name: { type: String },
    address: { type: String },
    zip_code: { type: String },
    phone: { type: String },
    email: { type: String },
  },
  cost: Number,
  paths: [
    {
      center_name: String,
      user_name: { type: String, default: null },
      time: { type: String, default: null },
    },
  ],
  delivered: { type: Boolean, default: false },
});

orderSchema.plugin(mongoose_delete, { overrideMethods: "all" });

const Order = mongoose.model("Order", orderSchema);
export default Order;
