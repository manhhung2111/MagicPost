function DelvieryOrderRecipientTable({ orders }) {
  return (
    <table className="delivery-to-recipient-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Parcel ID</th>
          <th>Recipient's address</th>
          <th>District</th>
          <th>Status</th>
          <th>Create order</th>
        </tr>
      </thead>
      <tbody>
        {orders?.map((order, index) => {
          return (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{order.parcelId}</td>
              <td className="address">{order.address}</td>
              <td class="amount">{order.district}</td>
              <td>
                <p class="status status-pending">Pending</p>
              </td>
              <td>
                <button className="confirm">Create</button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default DelvieryOrderRecipientTable;
