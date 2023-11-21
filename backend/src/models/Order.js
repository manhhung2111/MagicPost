import mongoose from "mongoose";
import mongoose_delete from "mongoose-delete";

const orderSchema = new mongoose.Schema({
  parcelId: { type: String },
  packageInfo: {
    typeOfParcel: {
      isDocument: { type: Boolean, defaul: false },
    },
    parcelContentValue: [
      {
        content: String,
        quantity: { type: String, default: "0" },
        value: { type: String, default: "0" },
        attachment: String,
      },
    ],

    senderInfo: {
      nameAddress: { type: String, defaul: null },
      address: { type: String, defaul: null },
      phoneNum: { type: String, defaul: null },
      zipcode: { type: String, defaul: "10000" },
      customerID: { type: String, default: null },
    },
    recipientInfo: {
      nameAddress: { type: String, defaul: null },
      address: { type: String, defaul: null },
      phoneNum: { type: String, defaul: null },
      zipcode: { type: String, defaul: "10000" },
    },
    additionalService: { type: String, default: null },
    sender_instruction: {
      returnImmediately: { type: Boolean, default: false },
      callRecipient: { type: Boolean, default: false },
      cancel: { type: Boolean, default: false },
      returnBefore: { type: Boolean, default: false },
      returnAfterStorage: { type: Boolean, default: false },
    },
    notes: String,
    deliveryFare: {
      primary: String,
      subordinated: String,
      vat: String,
      another: String,
    },
    weight: {
      actual: String,
      converted: String,
    },
    recipientFare: {
      cod: String,
      another: String,
    },
  },
  paths: [
    {
      center_name: String,
      user_name: { type: String, default: null },
      time: {
        timeArrived: { type: String, default: null },
        timeDeparted: { type: String, default: null}
      },
    },
  ],
  delivered: { type: Boolean, default: false },
});

orderSchema.plugin(mongoose_delete, { overrideMethods: "all" });

const Order = mongoose.model("Order", orderSchema);
export default Order;
