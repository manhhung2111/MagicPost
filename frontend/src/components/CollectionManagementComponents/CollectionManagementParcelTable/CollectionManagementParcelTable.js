function CollectionManagementParcelTable({ orders, isIncoming }) {
    return (
      <table className="collection-management-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Parcel ID</th>
            <th>{isIncoming ? "Source" : "Dest"}</th>
            <th>Dispatch Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders?.map((order, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{order.parcelId}</td>
                <td>{isIncoming ? order.from : order.to}</td>
                <td className="amount">{order.date}</td>
                <td>
                  <p
                    className={`status ${
                      order.status === "Pending"
                        ? "status-pending"
                        : "status-paid"
                    }`}
                  >
                    {order.status}
                  </p>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
  
  export default CollectionManagementParcelTable;
  