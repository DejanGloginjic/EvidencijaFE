import { useState } from "react";
import InputField from "../UI/InputField";
import classes from "./Actions.module.scss";
import Button from "../UI/Button";
import SelectField from "../UI/SelectField";

export default function MaintenanceActions({ onAdd, onSearch }) {
  const [nameAndSurnameInput, setNameAndSurnameInput] = useState("");
  const [burialPlaceInput, setBurialPlaceInput] = useState("");
  const [yearInput, setYearInput] = useState("");

  const handleSearch = () => {
    onSearch(nameAndSurnameInput, burialPlaceInput, yearInput);
  };

  const yearOptions = Array.from({ length: 2030 - 2012 + 1 }, (v, k) => ({
    value: 2012 + k,
    label: 2012 + k,
  }));

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
        <SelectField
          label="Godina"
          options={yearOptions}
          value={yearInput}
          onChange={(e) => setYearInput(e.target.value)}
          error={""}
        />
        <Button type="create" label="Pretraži" onClick={handleSearch} />
      </div>
    </div>
  );
}
