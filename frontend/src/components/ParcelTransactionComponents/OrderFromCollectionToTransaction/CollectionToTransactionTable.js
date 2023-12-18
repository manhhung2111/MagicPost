function CollectionToTransactionTable({ orders }) {
  return (
    <table className="collection-to-transaction-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Parcel ID</th>
          <th>Type</th>
          <th>From</th>
          <th>Pending From</th>
          <th>Notes</th>
          <th>Status</th>
          <th>Confirm Receipt</th>
        </tr>
      </thead>
      <tbody>
        {orders?.map((order, index) => {
          return (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{order.parcelId}</td>
              <td>{order.type ?? "Document"}</td>
              <td>{order.from}</td>
              <td className="amount">{order.date}</td>
              <td className="notes">Deliver as fast as possible, dsadsa deqwe2123213213</td>
              <td>
                <p className="status status-pending">Pending</p>
              </td>
              <td>
                <button className="confirm">Confirm</button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default CollectionToTransactionTable;
