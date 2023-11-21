import mongoose from "mongoose";
import mongoose_delete from "mongoose-delete";

const urlSchema = new mongoose.Schema({
  url_name: { type: String, unique: true },
  url: { type: [String] },
});

urlSchema.plugin(mongoose_delete, { overrideMethods: "all" });

const URL = mongoose.model("URL", urlSchema);
export default URL;
