import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Box, Typography, Rating } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SignalCellularAlt2BarIcon from '@mui/icons-material/SignalCellularAlt2Bar';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import {Link} from 'react-router-dom'


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

const Card = (props: Props) => {
  return (
   
    <Grid item xs={3}>
        
      <Paper elevation={3}>
      <Link to={`/recipe/${props.recipeid}`}>
        <img className='img' src={props.image} alt={props.name} />
        </Link>
        <Box paddingX={1}>
          <Typography component='h2' variant='subtitle1' noWrap>
            {props.name}
          </Typography>
          <Box sx={{
            display: 'flex',
            justifyContent: 'space-between'
          }}
          >
            <Box sx={{
              display: 'flex',
              alignItems: 'center'
            }}
            >
              <AccessTimeIcon sx={{ width: 14 }} />
              <Typography variant='body2' component='p' marginLeft={0.5}>
                {props.prepTimeMinutes + props.cookTimeMinutes} minutes
              </Typography>
            </Box>
            <Box sx={{
              display: 'flex',
              alignItems: 'center'
            }}
            >
              {props.difficulty.toLocaleLowerCase() ==='easy'?  <SignalCellularAlt2BarIcon color='success'/> :props.difficulty.toLocaleLowerCase() ==='medium'? <SignalCellularAltIcon color='warning'/> : props.difficulty.toLocaleLowerCase() ==='hard'?<span>Hard</span>:''}

            </Box>
          </Box>
          <Box sx={{
            display: 'flex',
            alignItems: 'center'

          }} >
            <Rating name="read-only" value={props.rating} precision={0.1} size="small" readOnly />
            <Typography> {props.rating}</Typography>
            <Box>
            <Typography variant='body2' component='p' marginLeft={0.5}> ({props.reviewCount} reviews)</Typography>
            </Box>         

          </Box>
        </Box>
      </Paper>
      
    </Grid>
    
  );

}

export default Card