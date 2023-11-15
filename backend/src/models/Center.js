import mongoose from "mongoose";
import mongoose_delete from "mongoose-delete";

const centerSchema = new mongoose.Schema({
  name: { type: String, unique: true },
  location: String,
  phone: String,
  email: String,
  orders: [{ order_id: String, next_center_id: String }],
});

centerSchema.plugin(mongoose_delete, { overrideMethods: "all" });

const Center = mongoose.model("Center", centerSchema);
export default Center;
