import axios from "../config/axiosConfig";

const handleGetOrdersFromTransactionHubs = async (sort, transactionHubs) => {
  const data = {
    query: {
      sort,
      transactionHubs,
    },
  };
  const result = await axios.post(
    "collection-emp/transaction/incoming-order",
    data
  );
  return result;
};

const handleConfirmOrderFromTransactionHubs = async (parcelId) => {
  const result = await axios.put("collection-emp/transaction/incoming-order", {
    parcelId,
  });
  return result;
};

const handleGetNearbyTransactionHubs = async () => {
  const result = await axios.get("collection-emp/transaction-nearby");
  return result;
};

const handleGetTransferTransactionOrders = async () => {
  const result = await axios.get("collection-emp/transfer/order-transaction");
  return result;
}

const handleTransferOrdersToTransactionHub = async (parcelIds) => {
  const result = await axios.put("collection-emp/transfer/order-transaction", {parcelIds: parcelIds});
  return result;
}
export {
  handleGetOrdersFromTransactionHubs,
  handleConfirmOrderFromTransactionHubs,
  handleGetNearbyTransactionHubs,
  handleGetTransferTransactionOrders,
  handleTransferOrdersToTransactionHub
};
