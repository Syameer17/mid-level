import React, { useState } from "react";

// MUI Imports
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import { Checkbox } from "@mui/material";

interface Props {
  id: string;
}

const CustomCheckbox: React.FC<Props> = ({ id }) => {
  const [checked, setChecked] = useState(
    localStorage.getItem(`checkboxValue-${id}`) === "true"
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    localStorage.setItem(
      `checkboxValue-${id}`,
      JSON.stringify(event.target.checked)
    );
  };

  return (
    <>
      <Checkbox
        icon={<FavoriteBorder />}
        checkedIcon={<Favorite />}
        checked={checked}
        onChange={handleChange}
      />
    </>
  );
};

export default CustomCheckbox;
