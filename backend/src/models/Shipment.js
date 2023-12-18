import mongoose from "mongoose";
import mongoose_delete from "mongoose-delete";

const shipmentSchema = new mongoose.Schema({
  user_name: String,
  dispatchedCenter: String,
  parcelId: { type: String, unique: true },
  status: { type: String, default: "In transit" },
  timeDelivered: { type: String, default: null },
});

shipmentSchema.plugin(mongoose_delete, { overrideMethods: "all" });

const Shipment = mongoose.model("Shipment", shipmentSchema);
export default Shipment;
