import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import {TabContext,TabList,TabPanel} from '@mui/lab';


interface Props {
  recipeid: number,
  name: string,
  ingredients: string[],
  instructions: string[],
  prepTimeMinutes: number,
  cookTimeMinutes: number,
  servings: number,
  difficulty: string,
  cuisine: string,
  caloriesPerServing: number,
  tags: string[],
  userId: number,
  image: string,
  rating: number,
  reviewCount: number,
  mealType: string[]
}

const Slider=(props: Props)=> {
  const [value, setValue] = React.useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label='Ingredients' value="1" />
            <Tab label="Instructions" value="2" />
         
          </TabList>
        </Box>
        <TabPanel value="1">{props.ingredients.map(el=>(<div><li>{el}</li></div>))}</TabPanel>
        <TabPanel value="2">{props.instructions.map(el=>(<div><li>{el}</li></div>))}</TabPanel>
        
      </TabContext>
    </Box>
  );
}
export default Slider