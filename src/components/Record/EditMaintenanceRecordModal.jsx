import classes from "./EditRecordModal.module.scss";
import { useEffect, useState } from "react";
import Backdrop from "../UI/Backdrop";
import InputField from "../UI/InputField";
import TextAreaField from "../UI/TextAreaField";
import Button from "../UI/Button";
import SelectField from "../UI/SelectField";

export default function EditMaintenanceRecordModal({ onEdit, onClose, id }) {
  const [record, setRecord] = useState({
    firstname: "",
    lastname: "",
    paymentyear: "",
    amount: "",
    remark: "",
    burialplace: "",
  });

  const [firstnameError, setFirstnameError] = useState("");
  const [lastnameError, setLastnameError] = useState("");
  const [paymentYearError, setPaymentYearError] = useState("");
  const [amountError, setAmountError] = useState("");
  const [burialPlaceError, setBurialPlaceError] = useState("");

  const fetchRecord = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/maintenanceRecord/" + id
      );
      if (response.ok) {
        const data = await response.json();
        setRecord(data);
      } else {
        console.error("Failed to fetch records:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching records:", error);
    }
  };

  const validate = () => {
    let valid = true;

    if (!record.firstname) {
      setFirstnameError("Unesite ime.");
      valid = false;
    } else {
      setFirstnameError("");
    }

    if (!record.lastname) {
      setLastnameError("Unesite prezime.");
      valid = false;
    } else {
      setLastnameError("");
    }

    if (!record.burialplace) {
      setBurialPlaceError("Unesite grobno mjesto.");
      valid = false;
    } else {
      setBurialPlaceError("");
    }

    if (record.amount === 0 || record.amount < 0) {
      setAmountError("Unesite iznos.");
      valid = false;
    } else {
      setAmountError("");
    }

    return valid;
  };

  const handleEdit = () => {
    if (validate()) {
      onEdit(record);
      onClose();
    }
  };

  const yearOptions = Array.from({ length: 2030 - 2012 + 1 }, (v, k) => ({
    value: 2012 + k,
    label: 2012 + k,
  }));

  useEffect(() => {
    if (id) {
      fetchRecord();
    }
  }, [id]);

  return (
    <>
      <Backdrop onClose={onClose} />
      <div className={classes.dialog}>
        <div className={classes.header}>
          <h2>Izmjeni</h2>
        </div>
        <div className={classes["inputs-container"]}>
          <div className={classes["horisontal-align"]}>
            <InputField
              type="text"
              label="Ime*"
              placeholder="Unesite ime"
              value={record?.firstname}
              onChange={(e) =>
                setRecord((prevRecord) => ({
                  ...prevRecord,
                  firstname: e.target.value,
                }))
              }
              error={firstnameError}
            />
            <InputField
              type="text"
              label="Prezime*"
              placeholder="Unesite prezime"
              value={record?.lastname}
              onChange={(e) =>
                setRecord((prevRecord) => ({
                  ...prevRecord,
                  lastname: e.target.value,
                }))
              }
              error={lastnameError}
            />
          </div>
          <div className={classes["horisontal-align"]}>
            <InputField
              type="text"
              label="Iznos*"
              placeholder="Unesite iznos"
              value={record?.amount}
              onChange={(e) =>
                setRecord((prevRecord) => ({
                  ...prevRecord,
                  amount: e.target.value,
                }))
              }
              error={amountError}
            />
            <InputField
              type="text"
              label="Grobno mjesto*"
              placeholder="Unesite grobno mjesto"
              value={record?.burialplace}
              onChange={(e) =>
                setRecord((prevRecord) => ({
                  ...prevRecord,
                  burialplace: e.target.value,
                }))
              }
              error={burialPlaceError}
            />
          </div>
          <div>
            <SelectField
              label="Godina"
              options={yearOptions}
              value={record?.paymentyear}
              onChange={(e) =>
                setRecord((prevRecord) => ({
                  ...prevRecord,
                  paymentYear: e.target.value,
                }))
              }
              error={paymentYearError}
            />
          </div>
          <div>
            <TextAreaField
              type="text"
              label="Napomena"
              placeholder="Unesite napomenu"
              value={record?.remark}
              onChange={(e) =>
                setRecord((prevRecord) => ({
                  ...prevRecord,
                  remark: e.target.value,
                }))
              }
            />
          </div>
        </div>
        <div className={classes["buttons-container"]}>
          <Button type="create" label="Izmjeni" onClick={handleEdit} />
          <Button type="cancel" label="Otkaži" onClick={onClose} />
        </div>
      </div>
    </>
  );
}
