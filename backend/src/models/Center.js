import mongoose from "mongoose";
import mongoose_delete from "mongoose-delete";

const centerSchema = new mongoose.Schema({
  name: { type: String, unique: true },
  full_name : String,
  user_name: String, // TDGD or TDTK
  parent_center_name: String, // = null -> dtk, != null -> dgd
  location: String,
  phone: String,
  email: String,
  orders: [{ order_id: String, next_center_id: String }],
  nearby_center: [{ center_name: String }],
});

centerSchema.plugin(mongoose_delete, { overrideMethods: "all" });

const Center = mongoose.model("Center", centerSchema);
export default Center;
