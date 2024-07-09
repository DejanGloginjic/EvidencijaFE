import classes from "./RecordTable.module.scss";
import { useState } from "react";
import DeleteModal from "./DeleteModal";
import EditRecordModal from "./EditRecordModal";
import EditMaintenanceRecordModal from "./EditMaintenanceRecordModal";

export default function MaintenanceRecordTable({
  columns,
  data,
  onEdit,
  onDelete,
}) {
  const [currentlyActivePage, setCurrentlyActivePage] = useState(1);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState();

  const totalNumberOfPages = Math.ceil(data.length / 9);

  const groupedData = [];
  for (let i = 0; i < data.length; i = i + 9) {
    let group = data.slice(i, i + 9);
    groupedData.push(group);
  }

  return (
    <div className={classes["table-container"]}>
      {showDeleteDialog && (
        <DeleteModal
          onDelete={() => {
            onDelete(selectedRecord.id);
            setShowDeleteDialog(false);
          }}
          onClose={() => setShowDeleteDialog(false)}
        />
      )}
      {showEditDialog && (
        <EditMaintenanceRecordModal
          onEdit={onEdit}
          onClose={() => setShowEditDialog(false)}
          id={selectedRecord.id}
        />
      )}
      <table>
        <thead>
          {columns.map((col, ind) => (
            <th key={ind}>{col}</th>
          ))}
          <th>Akcije</th>
        </thead>
        <tbody>
          {groupedData[currentlyActivePage - 1] &&
            groupedData[currentlyActivePage - 1].map((record, ind) => (
              <tr key={ind}>
                <td>{record.firstname}</td>
                <td>{record.lastname}</td>
                <td>{record.paymentyear}</td>
                <td>{record.amount}</td>
                <td>{record.burialplace}</td>
                <td>{record.remark === "" ? "/" : record.remark}</td>
                <td>
                  <td>
                    <div className={classes["buttons-container"]}>
                      <button
                        onClick={() => {
                          setSelectedRecord(record);
                          setShowEditDialog(true);
                        }}
                        className={classes[""]}
                      >
                        Izmjeni
                      </button>
                      <button
                        onClick={() => {
                          setSelectedRecord(record);
                          setShowDeleteDialog(true);
                        }}
                        className={classes[""]}
                      >
                        Obriši
                      </button>
                    </div>
                  </td>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className={classes.navigator}>
        <button
          onClick={() => {
            if (currentlyActivePage > 1) {
              setCurrentlyActivePage((prevState) => prevState - 1);
            }
          }}
        >
          &lt;
        </button>
        <div>{currentlyActivePage}</div>
        <button
          onClick={() => {
            if (currentlyActivePage < totalNumberOfPages) {
              setCurrentlyActivePage((prevState) => prevState + 1);
            }
          }}
        >
          &gt;
        </button>
        <div>{totalNumberOfPages}</div>
      </div>
    </div>
  );
}
