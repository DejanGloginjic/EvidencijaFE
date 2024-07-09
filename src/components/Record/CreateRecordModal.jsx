import { useState } from "react";
import Backdrop from "../UI/Backdrop";
import InputField from "../UI/InputField";
import classes from "./CreateRecordModal.module.scss";
import TextAreaField from "../UI/TextAreaField";
import Button from "../UI/Button";

export default function CreateRecordModal({ onCreate, onClose }) {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [date, setDate] = useState(new Date());
  const [amount, setAmount] = useState(0);
  const [burialPlace, setBurialPlace] = useState("");
  const [remark, setRemark] = useState("");

  const [firstnameError, setFirstnameError] = useState("");
  const [lastnameError, setLastnameError] = useState("");
  const [dateError, setDateError] = useState("");
  const [amountError, setAmountError] = useState("");
  const [burialPlaceError, setBurialPlaceError] = useState("");

  const validate = () => {
    let valid = true;

    if (!firstname) {
      setFirstnameError("Unesite ime.");
      valid = false;
    } else {
      setFirstnameError("");
    }

    if (!lastname) {
      setLastnameError("Unesite prezime.");
      valid = false;
    } else {
      setLastnameError("");
    }

    if (!burialPlace) {
      setBurialPlaceError("Unesite grobno mjesto.");
      valid = false;
    } else {
      setBurialPlaceError("");
    }

    if (amount === 0 || amount < 0) {
      setAmountError("Unesite iznos.");
      valid = false;
    } else {
      setAmountError("");
    }

    return valid;
  };

  const handleCreate = () => {
    if (validate()) {
      onCreate({ firstname, lastname, amount, burialPlace, remark, date });
      onClose();
    }
  };

  return (
    <>
      <Backdrop onClose={onClose} />
      <div className={classes.dialog}>
        <div className={classes.header}>
          <h2>Evidentiraj</h2>
        </div>
        <div className={classes["inputs-container"]}>
          <div className={classes["horisontal-align"]}>
            <InputField
              type="text"
              label="Ime*"
              placeholder="Unesite ime"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              error={firstnameError}
            />
            <InputField
              type="text"
              label="Prezime*"
              placeholder="Unesite prezime"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              error={lastnameError}
            />
          </div>
          <div className={classes["horisontal-align"]}>
            <InputField
              type="text"
              label="Iznos*"
              placeholder="Unesite iznos"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              error={amountError}
            />
            <InputField
              type="text"
              label="Grobno mjesto*"
              placeholder="Unesite grobno mjesto"
              value={burialPlace}
              onChange={(e) => setBurialPlace(e.target.value)}
              error={burialPlaceError}
            />
          </div>
          <div>
            <InputField
              type="date"
              label="Datum*"
              placeholder=""
              value={date}
              onChange={(e) => setDate(e.target.value)}
              error={dateError}
            />
          </div>
          <div>
            <TextAreaField
              type="text"
              label="Napomena"
              placeholder="Unesite napomenu"
              value={remark}
              onChange={(e) => setRemark(e.target.value)}
            />
          </div>
        </div>
        <div className={classes["buttons-container"]}>
          <Button type="create" label="Kreiraj" onClick={handleCreate} />
          <Button type="cancel" label="Otkaži" onClick={onClose} />
        </div>
      </div>
    </>
  );
}
