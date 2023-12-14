import mongoose from "mongoose";
import mongoose_delete from "mongoose-delete";

const shipmentSchema = new mongoose.Schema({
  user_id: String,
  start: {
    center_id: { type: String, default: null },
    orders: [String],
  },
  destination: {
    center_id: { type: String, default: null },
    orders: [String],
  },
});

shipmentSchema.plugin(mongoose_delete, { overrideMethods: "all" });

const Shipment = mongoose.model("Shipment", shipmentSchema);
export default Shipment;
