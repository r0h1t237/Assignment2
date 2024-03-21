import { Box, Grid, Rating, Typography } from '@mui/material'
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from './api/recipe'

import Slider from './Slider';



const Recipe = () => {
  const { id } = useParams()
  const [recipe, setRecipe] = useState<any>()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await api.get(`/recipe/getRecipe/${id}`)
        console.log(response.data)
        setRecipe(response.data[0])
      } catch (err: any) {
        if (err.response) {
          console.log(err.response.data)
          console.log(err.response.status)
          console.log(err.response.headers)
        }
        else {
          console.log(`Error : ${err.message}`);
        }
      } finally {
        setIsLoading(false)
      }
    }
    fetchRecipe()
  }, [])




  return (
    <>
      {isLoading ? ' ' :
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Typography variant='h3' component='h1' marginTop={3} >
                {recipe.name}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
              <img className='topImage' src={recipe.image} alt={recipe.name} />
              <Box sx={{
                display: 'flex',
                alignItems: 'center',
                marginTop: 1

              }} >
                <Rating name="read-only" value={recipe.rating} precision={0.1} size="large" readOnly />
                <Typography marginLeft={1}> {recipe.rating}</Typography>
                <Box>
                  <Typography variant='body2' component='p' marginLeft={3}> ({recipe.reviewCount} reviews)</Typography>
                </Box>

              </Box>
            </Box>
          </Grid>
          <Grid item xs={5}>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
              <Slider {...recipe} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }}>
                <Box sx={{ backgroundColor:'orange', color:'white',marginX:2  ,padding:1 }}>  <Typography variant='h6' component='span' marginX={1} > Preparation Time  </Typography>
                  <Typography variant='body1' component='p'   textAlign='center'>
                    {recipe.prepTimeMinutes } minutes
                  </Typography></Box>
                <Box sx={{ backgroundColor:'orange', color:'white',marginX:2,padding:1  }}>  <Typography variant='h6' component='span' marginX={0.5} > Cooking Time  </Typography>
                  <Typography variant='body1' component='p'  textAlign='center'>
                    { recipe.cookTimeMinutes} minutes
                  </Typography></Box>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={8}>

          </Grid>
        </Grid>
      }
    </>

  )
}

export default Recipe