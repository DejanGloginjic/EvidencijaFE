import { useState } from "react";
import InputField from "../UI/InputField";
import classes from "./Actions.module.scss";
import Button from "../UI/Button";

export default function Actions({ onAdd, onSearch }) {
  const [nameAndSurnameInput, setNameAndSurnameInput] = useState("");
  const [burialPlaceInput, setBurialPlaceInput] = useState("");
  const [dateInput, setDateInput] = useState("");

  const handleSearch = () => {
    onSearch(nameAndSurnameInput, burialPlaceInput, dateInput);
  };

  return (
    <div className={classes.container}>
      <div className={classes["container-left"]}>
        <Button type="create" label="Dodaj" onClick={onAdd} />
      </div>
      <div className={classes["container-right"]}>
        <InputField
          type="text"
          label="Ime i prezime"
          placeholder="Unesite ime i/ili prezime"
          value={nameAndSurnameInput}
          onChange={(e) => setNameAndSurnameInput(e.target.value)}
        />
        <InputField
          type="text"
          label="Grobno mjesto"
          placeholder="Unesite grobno mjesto"
          value={burialPlaceInput}
          onChange={(e) => setBurialPlaceInput(e.target.value)}
        />
        <InputField
          type="date"
          label="Datum uplate"
          placeholder=""
          value={dateInput}
          onChange={(e) => setDateInput(e.target.value)}
        />
        <Button type="create" label="Pretraži" onClick={handleSearch} />
      </div>
    </div>
  );
}
