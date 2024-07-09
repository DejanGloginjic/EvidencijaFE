import { useEffect, useState } from "react";
import { maintenanceTableColums } from "../data";
import Actions from "../components/Record/Actions";
import classes from "./RecordsPage.module.scss";
import CreateMaintenanceModal from "../components/Record/CreateMaintenanceModal";
import MaintenanceRecordTable from "../components/Record/MaintenanceRecordTable.jsx";
import MaintenanceActions from "../components/Record/MaintenanceActions.jsx";

export default function Maintenance() {
  const [records, setRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const fetchRecords = async () => {
    try {
      const response = await fetch("http://localhost:3000/maintenanceRecords");
      if (response.ok) {
        const data = await response.json();
        setRecords(data);
        setFilteredRecords(data);
      } else {
        console.error("Failed to fetch records:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching records:", error);
    }
  };

  const createRecord = async (record) => {
    console.log(record);
    try {
      const response = await fetch("http://localhost:3000/maintenanceRecord", {
        method: "POST",
        body: JSON.stringify(record),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setRecords((prevState) => [...prevState, data]);
        setFilteredRecords((prevState) => [data, ...prevState]);
      } else {
        console.error("Failed to create record:", response.statusText);
      }
    } catch (error) {
      console.error("Error creating record:", error);
    }
  };

  const editRecord = async (record) => {
    try {
      const response = await fetch(
        "http://localhost:3000/maintenanceRecord/" + record.id,
        {
          method: "PUT",
          body: JSON.stringify(record),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log("Updated record:", data);
        // Ažuriranje postojećeg zapisa u state-u
        setRecords((prevState) =>
          prevState.map((prevRecord) =>
            prevRecord.id === record.id ? data : prevRecord
          )
        );
        // Ažuriranje filtriranih zapisa u state-u, ako je potrebno
        setFilteredRecords((prevState) =>
          prevState.map((prevRecord) =>
            prevRecord.id === record.id ? data : prevRecord
          )
        );
      } else {
        console.error("Failed to edit record:", response.statusText);
      }
    } catch (error) {
      console.error("Error editing record:", error);
    }
  };

  const filterRecords = (
    nameAndSurname = "",
    burialPlace = "",
    paymentYear = ""
  ) => {
    const lowerCaseNameAndSurname = nameAndSurname.toLowerCase().trim();
    const lowerCaseBurialPlace = burialPlace.toLowerCase().trim();

    // Split nameAndSurname into firstName and lastName parts
    const nameParts = lowerCaseNameAndSurname.split(" ");
    const firstNamePart = nameParts[0] || "";
    const lastNamePart = nameParts[1] || "";

    const filtered = records.filter((record) => {
      console.log("Checking record:", record);

      const recordFirstName = record.firstname
        ? record.firstname.toLowerCase()
        : "";
      const recordLastName = record.lastname
        ? record.lastname.toLowerCase()
        : "";
      const recordBurialPlace = record.burialplace
        ? record.burialplace.toLowerCase()
        : "";
      const recordPaymentYear = record.paymentyear ? record.paymentyear : "";

      const matchesNameAndSurname =
        firstNamePart && lastNamePart
          ? recordFirstName.includes(firstNamePart) &&
            recordLastName.includes(lastNamePart)
          : firstNamePart
          ? recordFirstName.includes(firstNamePart) ||
            recordLastName.includes(firstNamePart)
          : true;

      const matchesBurialPlace = lowerCaseBurialPlace
        ? recordBurialPlace.includes(lowerCaseBurialPlace)
        : true;
      const matchesDate = paymentYear
        ? Number(recordPaymentYear) == Number(paymentYear)
        : true;

      console.log(recordPaymentYear, "record");
      console.log(paymentYear);

      return matchesNameAndSurname && matchesBurialPlace && matchesDate;
    });

    setFilteredRecords(filtered);
  };

  const deleteRecord = async (id) => {
    try {
      const response = await fetch(
        "http://localhost:3000/maintenanceRecord/" + id,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        const data = await response.json();
        setRecords((prevState) => prevState.filter((rec) => rec.id != id));
        setFilteredRecords((prevState) =>
          prevState.filter((rec) => rec.id != id)
        );
      } else {
        console.error("Failed to create record:", response.statusText);
      }
    } catch (error) {
      console.error("Error creating record:", error);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  return (
    <>
      <div className={classes["main-container"]}>
        {showCreateModal && (
          <CreateMaintenanceModal
            onCreate={createRecord}
            onClose={() => setShowCreateModal(false)}
          />
        )}
        <div className={classes.container}>
          <MaintenanceActions
            onAdd={() => setShowCreateModal(true)}
            onSearch={filterRecords}
          />
          <MaintenanceRecordTable
            columns={maintenanceTableColums}
            data={filteredRecords}
            onDelete={deleteRecord}
            onEdit={editRecord}
          />
        </div>
      </div>
    </>
  );
}
