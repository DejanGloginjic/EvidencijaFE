import classes from "./DeleteModal.module.scss";
import { useState } from "react";
import Backdrop from "../UI/Backdrop";
import Button from "../UI/Button";

export default function DeleteModal({ onDelete, onClose }) {
  return (
    <>
      <Backdrop onClose={onClose} />
      <div className={classes.dialog}>
        <div className={classes.header}>
          <h2>Upozorenje</h2>
        </div>
        <div className={classes.message}>
          <p>Da li ste sigurni da želite obrisati evidenciju?</p>
        </div>
        <div className={classes["buttons-container"]}>
          <Button type="create" label="Obriši" onClick={onDelete} />
          <Button type="cancel" label="Otkaži" onClick={onClose} />
        </div>
      </div>
    </>
  );
}
