function GeneralManagementParcelTable({ orders }) {
  return (
    <table className="general-management-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Center code</th>
          <th>Postal code</th>
          <th>Incoming orders</th>
          <th>Outgoing orders</th>
        </tr>
      </thead>
      <tbody>
        {orders?.map((order, index) => {
          return (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{order.center_code}</td>
              <td>{order.postalCode}</td>
              <td className="amount">{order.totalIncomingOrders}</td>
              <td>
                <p>{order.totalOutgoingOrders}</p>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default GeneralManagementParcelTable;
