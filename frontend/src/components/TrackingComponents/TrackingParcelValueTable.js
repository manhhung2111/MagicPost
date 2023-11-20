import Table from "react-bootstrap/Table";

function TrackingParcelValueTable({ parcelValues }) {
  return (
    <Table striped bordered hover className="parcel-content-value-table">
      <thead>
        <tr>
          <th>Content</th>
          <th>Quantity</th>
          <th>Value</th>
          <th>Attachments</th>
        </tr>
      </thead>
      <tbody>
        {parcelValues?.map((row) => {
          return <tr>
            <td>{row.content}</td>
            <td>{row.quantity}</td>
            <td>{row.value}</td>
            <td>{row.attachment}</td>
          </tr>;
        })}
      </tbody>
    </Table>
  );
}

export default TrackingParcelValueTable;
