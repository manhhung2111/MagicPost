import mongoose from "mongoose";
import mongoose_delete from "mongoose-delete";

const centerSchema = new mongoose.Schema({
  center_code: { type: String, unique: true },
  name: String,
  location: String,
  phone: String,
  email: String,
  nearby_center: [String],
  postalCode: { type: String, default: "1000" },
});

centerSchema.plugin(mongoose_delete, { overrideMethods: "all" });

const Center = mongoose.model("Center", centerSchema);
export default Center;
