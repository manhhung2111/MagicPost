import Table from "react-bootstrap/Table";

function ParcelValueTable({ parcelValues }) {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Content</th>
          <th>Quantity</th>
          <th>Value</th>
          <th>Attachments</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Total</td>
          <td>0</td>
          <td>N/A</td>
          <td>N/A</td>
        </tr>
      </tbody>
    </Table>
  );
}

export default ParcelValueTable;
