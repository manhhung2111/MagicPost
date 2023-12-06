function ConfirmOrderFromCollectionToCollectionTable({ orders }) {
  return (
    <table className="collection-to-transaction-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Parcel ID</th>
          <th>Type</th>
          <th>From</th>
          <th>Dispatched Date</th>
          <th>Status</th>
          <th>Action</th>
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

export default ConfirmOrderFromCollectionToCollectionTable;
