function ConfirmOrderFromCollectionToCollectionTable({ orders }) {
  return (
    <table className="collection-to-transaction-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Parcel ID</th>
          <th>Type</th>
          <th>From</th>
          <th>Pending Date</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {orders?.length && orders?.map((parcel, index) => {
          return (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{parcel.parcelId}</td>
              <td>{`${parcel.typeOfParcel.isDocument ? "Document" : "Package"}`}</td>
              <td>{parcel.sourceCenter}</td>
              <td className="amount">{`${parcel.pendingFrom.split(",")[1]}, ${parcel.pendingFrom.split(",").pop()}`}</td>
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
