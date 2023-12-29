function CollectionManagementParcelTable({ orders, isIncoming }) {
  return (
    <table className="collection-management-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Parcel ID</th>
          <th>{isIncoming ? "Source" : "Dest"}</th>
          <th>{isIncoming ? "Service" : "Issued date"}</th>
          <th>{isIncoming ? "Status" : "Service"}</th>
        </tr>
      </thead>
      <tbody>
        {orders?.map((order, index) => {
          return (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{order.parcelId}</td>
              <td>{isIncoming ? order.source : order.destination}</td>
              <td className="amount">
                {isIncoming ? order.service || "None" : order.dispatch_date}
              </td>
              <td>
                <p
                  className={`${
                    order?.status === "Pending"
                      ? "status status-pending"
                      : order?.status === "Confirmed"
                      ? "status status-paid"
                      : ""
                  }`}
                >
                  {isIncoming ? order.status : order.service || "None"}
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
