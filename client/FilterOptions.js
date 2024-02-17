import React, { useState } from "react";
import { FormGroup, FormControlLabel, Checkbox } from "@mui/material";

function FilterOptions({ onFilterChange }) {
  const [filterOptions, setFilterOptions] = useState({
    Merger: true,
    Dividends: true,
    NewCapital: true,
    Hire: true,
  });

  const handleCheckboxChange = (event) => {
    setFilterOptions({
      ...filterOptions,
      [event.target.name]: event.target.checked,
    });

    if (onFilterChange) {
      onFilterChange({
        ...filterOptions,
        [event.target.name]: event.target.checked,
      });
    }
  };

  return (
    <FormGroup row>
      {Object.entries(filterOptions).map(([type, checked]) => (
        <FormControlLabel
          key={type}
          control={
            <Checkbox
              checked={checked}
              onChange={handleCheckboxChange}
              name={type}
            />
          }
          label={type}
        />
      ))}
    </FormGroup>
  );
}

export default FilterOptions;
