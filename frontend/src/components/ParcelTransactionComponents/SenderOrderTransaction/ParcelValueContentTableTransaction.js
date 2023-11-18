import Table from "react-bootstrap/Table";

function ParcelValueContentTableTransaction({parcelValues, isDeletedRows, handleChangeParcelValues, handleRemoveRows, handleAddMoreRow}) {
  
  return (
    <div className="parcel-value-table">
      <Table striped bordered hover className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Content</th>
            <th>Quantity</th>
            <th>Value</th>
            <th>Attachments</th>
          </tr>
        </thead>
        <tbody>
          {parcelValues?.map((row, rowIndex) => {
            return (
              <tr key={rowIndex}>
                <td className="select">
                  <label className="checkBox">
                    <input
                      type="checkbox"
                      onChange={(e) =>
                        handleChangeParcelValues(
                          e.target.checked,
                          rowIndex,
                          "isSelected"
                        )
                      }
                      checked={row.isSelected}
                    />
                    <div className="transition"></div>
                  </label>
                </td>
                <td className="input">
                  <input
                    type="text"
                    value={row.content}
                    onChange={(e) =>
                      handleChangeParcelValues(
                        e.target.value,
                        rowIndex,
                        "content"
                      )
                    }
                  />
                </td>
                <td className="input">
                  <input
                    type="text"
                    value={row.quantity}
                    onChange={(e) =>
                      handleChangeParcelValues(
                        e.target.value,
                        rowIndex,
                        "quantity"
                      )
                    }
                  />
                </td>
                <td className="input">
                  <input
                    type="text"
                    value={row.value}
                    onChange={(e) =>
                      handleChangeParcelValues(
                        e.target.value,
                        rowIndex,
                        "value"
                      )
                    }
                  />
                </td>
                <td className="input">
                  <input
                    type="text"
                    value={row.attachment}
                    onChange={(e) =>
                      handleChangeParcelValues(
                        e.target.value,
                        rowIndex,
                        "attachment"
                      )
                    }
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <div className="btn-group">
        <button className="add-btn" onClick={() => handleAddMoreRow()}>
          Add more row
        </button>
        {isDeletedRows && (
          <button className="delete-btn" onClick={() => handleRemoveRows()}>
            Remove row(s)
          </button>
        )}
      </div>
    </div>
  );
}

export default ParcelValueContentTableTransaction;
