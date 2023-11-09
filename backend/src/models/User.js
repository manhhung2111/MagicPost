import mongoose from "mongoose";
import mongoose_delete from "mongoose-delete";

const userSchema = new mongoose.Schema({
  user_id: { type: String, unique: true },
  password: String,
  center_id: String,
  role_name: String,
  address: String,
  phone: String,
  email: String,
});

userSchema.plugin(mongoose_delete, { overrideMethods: "all" });

const User = mongoose.model("User", userSchema);
export default User;
