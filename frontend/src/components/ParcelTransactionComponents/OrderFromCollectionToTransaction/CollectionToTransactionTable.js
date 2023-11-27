import Table from "react-bootstrap/Table";

function CollectionToTransactionTable({ orders }) {
  return (
    <table className="collection-to-transaction-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Parcel ID</th>
          <th>From collection hub</th>
          <th>Dispatched Date</th>
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
              <td>{order.from}</td>
              <td class="amount">{order.date}</td>
              <td>
                <p class="status status-pending">Pending</p>
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
