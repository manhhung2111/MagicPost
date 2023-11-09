import mongoose from "mongoose";
import mongoose_delete from "mongoose-delete";

const roleSchema = new mongoose.Schema({
  role_name: { type: String, unique: true },
  urls_id: { type: [String] },
});

roleSchema.plugin(mongoose_delete, { overrideMethods: "all" });

const Role = mongoose.model("Role", roleSchema);
export default Role;
