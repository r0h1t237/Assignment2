import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

type Props = {
    field: string;
    setField: (val: string) => void;
    // handleSelectChange: () => void;
    type: string;
    options:string[]
  };

const BasicSelect:React.FC<Props>=({
field,
setField,
// handleSelectChange,
type,
options
}) =>{




  return (
    <Box sx={{ minWidth: 160 }}>
       <FormControl sx={{ m: 1, minWidth: 160 }} size="small">
      <InputLabel id="demo-select-small-label">{type}</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={field}
        label="Age"
        onChange={(e)=>(setField(e.target.value))}
      >
        <MenuItem value="">
          All
        </MenuItem>
        {/* <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem> */}
        {options.map(el=><MenuItem value={el}>{el}</MenuItem>)}
      </Select>
    </FormControl>
    </Box>
  );
}

export default  BasicSelect