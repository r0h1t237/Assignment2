import { Box, Button, Container, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import api from './api/recipe'
import { useNavigate } from 'react-router-dom'

const NewRecipe = () => {
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState(false);
  const [cuisine, setCuisine] = useState('');
  const [cuisineError, setCuisineError] = useState(false);
  const [ingredients, setIngredients] = useState('');
  const [ingredientsError, setIngredientsError] = useState(false);
  const [instructions, setInstructions] = useState('');
  const [instructionsError, setInstructionsError] = useState(false);
  const [image, setImage] = useState('');
  const [imageError, setImageError] = useState(false);
  const [difficulty, setDifficulty] = useState('');
  const [difficultyError, setDifficultyError] = useState(false);
  const [prepTimeMinutes, setPrepTimeMinutes] = useState('0');
  const [prepTimeMinutesError, setPrepTimeMinutesError] = useState(false);
  const [cookTimeMinutes, setCookTimeMinutes] = useState('0');
  const [cookTimeMinutesError, setCookTimeMinutesError] = useState(false);
  const [tags, setTags] = useState('');
  const [tagsError, setTagsError] = useState(false);
  const [mealType, setMealType] = useState('');
  const [mealTypeError, setMealTypeError] = useState(false);

  const difficultyOption = ['Easy', 'Medium', 'Hard']

  let navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log('submit button clicked')
    setNameError(false);
    setCuisineError(false);
    setIngredientsError(false);
    setInstructionsError(false);
    setImageError(false);
    setDifficultyError(false);
    setPrepTimeMinutesError(false);
    setCookTimeMinutesError(false)


    if (name === '') {
      setNameError(true);
    }
    if (cuisine === '') {
      setCuisineError(true);
    }
    if (ingredients === '') {
      setIngredientsError(true);
    }
    if (instructions === '') {
      setInstructionsError(true)
    }
    if (image === '') {
      setImageError(true)
    }
    if (difficulty === '') {
      setDifficultyError(true)
    }
    if (prepTimeMinutes === '0') {
      setPrepTimeMinutesError(true)
    }
    if (cookTimeMinutes === '0') {
      setCookTimeMinutesError(true)
    }
    if (tags === '') {
      setTagsError(true)
    }
    if (mealType === '') {
      setMealTypeError(true)
    }

    if (name && cuisine && ingredients && instructions && image && difficulty && prepTimeMinutes && cookTimeMinutes && tags && mealType) {

      let data = {
        name, cuisine, ingredients: ingredients.split('\n'), instructions: instructions.split('\n'), image, difficulty, prepTimeMinutes, cookTimeMinutes, tags: tags.split('\n'), mealType: mealType.split('\n')
      }

      try {
        let response = await api.post('/recipe/addrecipe', data);
        navigate('/')

      }
      catch (err) {
        console.warn(err)
      }



    }

    // Here you can handle form submission, e.g., send data to a server
  }


  return (
    <Container >
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Typography variant='h3' component='h2' marginTop={1} >
                Add your recipe.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <FormControl error={nameError} fullWidth>
              <TextField
                label="Recipe Name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                fullWidth
                error={nameError}
              />
              {nameError && <FormHelperText>Recipe name required.</FormHelperText>}
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl error={cuisineError} fullWidth>
              <TextField
                label="Cuisine Type"
                type="text"
                value={cuisine}
                onChange={(e) => setCuisine(e.target.value)}
                required
                fullWidth
                error={cuisineError}
              />
              {cuisineError && <FormHelperText>Cuisine Required</FormHelperText>}
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl error={ingredientsError} fullWidth>
              <TextField
                label="Ingredients"
                type="text"
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                required
                fullWidth
                multiline
                error={ingredientsError}
              />
              {ingredientsError && <FormHelperText>Ingredients required.</FormHelperText>}
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl error={instructionsError} fullWidth>
              <TextField
                label="Instructions"
                type="text"
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                required
                multiline
                fullWidth
                error={instructionsError}
              />
              {instructionsError && <FormHelperText>Instructions are required</FormHelperText>}
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl error={imageError} fullWidth>
              <TextField
                label="Recipe Image URL"
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                required
                fullWidth
                error={imageError}
              />
              {imageError && <FormHelperText>Recipe image is required.</FormHelperText>}
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl error={difficultyError} fullWidth>
              {/* <TextField
                label="Difficulty Type"
                type="text"
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                required
                fullWidth
                error={difficultyError}
              /> */}
              <InputLabel id="demo-simple-select-label">Preparation Difficulty</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={difficulty}
                label="Preparation Difficulty"
                onChange={(e) => setDifficulty(e.target.value)}
              >
                {difficultyOption.map(el => <MenuItem value={el}>{el}</MenuItem>)}
              </Select>
              {difficultyError && <FormHelperText>Difficulty level Required</FormHelperText>}
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl error={prepTimeMinutesError} fullWidth>
              <TextField
                label="Preparation Time (in minutes)"
                type="number"
                value={prepTimeMinutes}
                onChange={(e) => setPrepTimeMinutes(e.target.value)}
                required
                fullWidth
                rows={3}
                error={prepTimeMinutesError}
              />
              {prepTimeMinutesError && <FormHelperText>Preparation time is required.</FormHelperText>}
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl error={cookTimeMinutesError} fullWidth>
              <TextField
                label="Cooking Time (in minutes)"
                type="number"
                value={cookTimeMinutes}
                onChange={(e) => setCookTimeMinutes(e.target.value)}
                required
                fullWidth
                rows={3}
                error={cookTimeMinutesError}
              />
              {cookTimeMinutesError && <FormHelperText>Cooking time is required.</FormHelperText>}
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl error={tagsError} fullWidth>
              <TextField
                label="Tags"
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                required
                fullWidth
                multiline
                error={tagsError}
              />
              {tagsError && <FormHelperText>Tags are required.</FormHelperText>}
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl error={mealTypeError} fullWidth>
              <TextField
                label="Meal Type"
                type="text"
                value={mealType}
                onChange={(e) => setMealType(e.target.value)}
                required
                multiline
                fullWidth
                error={mealTypeError}
              />
              {mealTypeError && <FormHelperText>Meal Type required</FormHelperText>}
            </FormControl>
          </Grid>

        </Grid>
        <Box sx={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: 1,
          // padding: 2

        }}>
          <Button variant="contained" color="primary" type="submit" >
            <Typography variant='h6' component='p' padding='2'>Submit Recipe</Typography>
          </Button >
        </Box>
      </form>
    </Container>
  )
}

export default NewRecipe