import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { Box, Pagination, Paper } from '@mui/material';
import Card from './Card';
import useAxiosFetch from './hooks/useAxiosFetch';
import { useEffect, useState } from 'react';
import BasicSelect from './Select';

interface Recipe {
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



// const data:Recipe[]=[
//   {
//   "reciped": 1,
//   "name": "Classic Margherita Pizza",
//   "ingredients": [
//       "Pizza dough",
//       "Tomato sauce",
//       "Fresh mozzarella cheese",
//       "Fresh basil leaves",
//       "Olive oil",
//       "Salt and pepper to taste"
//   ],
//   "instructions": [
//       "Preheat the oven to 475°F (245°C).",
//       "Roll out the pizza dough and spread tomato sauce evenly.",
//       "Top with slices of fresh mozzarella and fresh basil leaves.",
//       "Drizzle with olive oil and season with salt and pepper.",
//       "Bake in the preheated oven for 12-15 minutes or until the crust is golden brown.",
//       "Slice and serve hot."
//   ],
//   "prepTimeMinutes": 20,
//   "cookTimeMinutes": 15,
//   "servings": 4,
//   "difficulty": "Easy",
//   "cuisine": "Italian",
//   "caloriesPerServing": 300,
//   "tags": [
//       "Pizza",
//       "Italian"
//   ],
//   "userId": 45,
//   "image": "https://cdn.dummyjson.com/recipe-images/1.webp",
//   "rating": 4.6,
//   "reviewCount": 3,
//   "mealType": [
//       "Dinner"
//   ]
// },
// {
//   "reciped": 2,
//   "name": "Vegetarian Stir-Fry",
//   "ingredients": [
//       "Tofu, cubed",
//       "Broccoli florets",
//       "Carrots, sliced",
//       "Bell peppers, sliced",
//       "Soy sauce",
//       "Ginger, minced",
//       "Garlic, minced",
//       "Sesame oil",
//       "Cooked rice for serving"
//   ],
//   "instructions": [
//       "In a wok, heat sesame oil over medium-high heat.",
//       "Add minced ginger and garlic, sauté until fragrant.",
//       "Add cubed tofu and stir-fry until golden brown.",
//       "Add broccoli, carrots, and bell peppers. Cook until vegetables are tender-crisp.",
//       "Pour soy sauce over the stir-fry and toss to combine.",
//       "Serve over cooked rice."
//   ],
//   "prepTimeMinutes": 15,
//   "cookTimeMinutes": 20,
//   "servings": 3,
//   "difficulty": "Medium",
//   "cuisine": "Asian",
//   "caloriesPerServing": 250,
//   "tags": [
//       "Vegetarian",
//       "Stir-fry",
//       "Asian"
//   ],
//   "userId": 58,
//   "image": "https://cdn.dummyjson.com/recipe-images/2.webp",
//   "rating": 4.7,
//   "reviewCount": 36,
//   "mealType": [
//       "Lunch"
//   ]
// },
// {
//   "reciped": 3,
//   "name": "Chocolate Chip Cookies",
//   "ingredients": [
//       "All-purpose flour",
//       "Butter, softened",
//       "Brown sugar",
//       "White sugar",
//       "Eggs",
//       "Vanilla extract",
//       "Baking soda",
//       "Salt",
//       "Chocolate chips"
//   ],
//   "instructions": [
//       "Preheat the oven to 350°F (175°C).",
//       "In a bowl, cream together softened butter, brown sugar, and white sugar.",
//       "Beat in eggs one at a time, then stir in vanilla extract.",
//       "Combine flour, baking soda, and salt. Gradually add to the wet ingredients.",
//       "Fold in chocolate chips.",
//       "Drop rounded tablespoons of dough onto ungreased baking sheets.",
//       "Bake for 10-12 minutes or until edges are golden brown.",
//       "Allow cookies to cool on the baking sheet for a few minutes before transferring to a wire rack."
//   ],
//   "prepTimeMinutes": 15,
//   "cookTimeMinutes": 10,
//   "servings": 24,
//   "difficulty": "Easy",
//   "cuisine": "American",
//   "caloriesPerServing": 150,
//   "tags": [
//       "Cookies",
//       "Dessert",
//       "Baking"
//   ],
//   "userId": 39,
//   "image": "https://cdn.dummyjson.com/recipe-images/3.webp",
//   "rating": 4.9,
//   "reviewCount": 23,
//   "mealType": [
//       "Snack",
//       "Dessert"
//   ]
// },
// {
//   "reciped": 4,
//   "name": "Chicken Alfredo Pasta",
//   "ingredients": [
//       "Fettuccine pasta",
//       "Chicken breast, sliced",
//       "Heavy cream",
//       "Parmesan cheese, grated",
//       "Garlic, minced",
//       "Butter",
//       "Salt and pepper to taste",
//       "Fresh parsley for garnish"
//   ],
//   "instructions": [
//       "Cook fettuccine pasta according to package instructions.",
//       "In a pan, sauté sliced chicken in butter until fully cooked.",
//       "Add minced garlic and cook until fragrant.",
//       "Pour in heavy cream and grated Parmesan cheese. Stir until the cheese is melted.",
//       "Season with salt and pepper to taste.",
//       "Combine the Alfredo sauce with cooked pasta.",
//       "Garnish with fresh parsley before serving."
//   ],
//   "prepTimeMinutes": 15,
//   "cookTimeMinutes": 20,
//   "servings": 4,
//   "difficulty": "Medium",
//   "cuisine": "Italian",
//   "caloriesPerServing": 500,
//   "tags": [
//       "Pasta",
//       "Chicken"
//   ],
//   "userId": 46,
//   "image": "https://cdn.dummyjson.com/recipe-images/4.webp",
//   "rating": 4.9,
//   "reviewCount": 38,
//   "mealType": [
//       "Lunch",
//       "Dinner"
//   ]
// }

// ] 

const Home = (): JSX.Element => {
  const { data, fetchError, isLoading }: any = useAxiosFetch('/recipe/getAllRecipes');

  const [temData, setTempData] = useState([{
    "recipeid": 4,
    "name": "Chicken Alfredo Pasta",
    "ingredients": [
      "Fettuccine pasta",
      "Chicken breast, sliced",
      "Heavy cream",
      "Parmesan cheese, grated",
      "Garlic, minced",
      "Butter",
      "Salt and pepper to taste",
      "Fresh parsley for garnish"
    ],
    "instructions": [
      "Cook fettuccine pasta according to package instructions.",
      "In a pan, sauté sliced chicken in butter until fully cooked.",
      "Add minced garlic and cook until fragrant.",
      "Pour in heavy cream and grated Parmesan cheese. Stir until the cheese is melted.",
      "Season with salt and pepper to taste.",
      "Combine the Alfredo sauce with cooked pasta.",
      "Garnish with fresh parsley before serving."
    ],
    "prepTimeMinutes": 15,
    "cookTimeMinutes": 20,
    "servings": 4,
    "difficulty": "Medium",
    "cuisine": "Italian",
    "caloriesPerServing": 500,
    "tags": [
      "Pasta",
      "Chicken"
    ],
    "userId": 46,
    "image": "https://cdn.dummyjson.com/recipe-images/4.webp",
    "rating": 4.9,
    "reviewCount": 38,
    "mealType": [
      "Lunch",
      "Dinner"
    ]
  }])

  const [currentPage, setCurrentPage] = useState(1);
  const [recipePerPage] = useState(8);
  const [mealType, setMealType] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [tags, setTags] = useState('')
  // const [currentRecipe,setCurrentRecipe]=useState<any>()

  const indexOfLastRecipe = currentPage * recipePerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipePerPage;
  var currentRecipe: any = temData ? temData.slice(indexOfFirstRecipe, indexOfLastRecipe) : data.slice(indexOfFirstRecipe, indexOfLastRecipe);

  const mealOptions: string[] = ['Breakfast', 'Lunch', 'Dinner', 'Snack', 'Dessert', 'Appetizer', 'Beverage', 'Side Dish']
  const cuisineOptions: string[] = ['Italian', 'Asian', 'American', 'Mexican', 'Mediterranean', 'Pakistani', 'Japanese', 'Moroccan', 'Korean', 'Greek', 'Thai', 'Indian', 'Turkish', 'Smoothie', 'Russian', 'Lebanese', 'Brazilian', 'Spanish', 'Vietnamese', 'Cocktail', 'Hawaiian']
  const difficultyOptions: string[] = ['Easy', 'Medium']
  const tagsOptions: string[] = ['Pizza', 'Italian', "Vegetarian", "Stir-fry", "Asian", "Cookies", "Dessert", "Baking", "Pasta", "Chicken", "Salsa", "Salad", "Quinoa", "Bruschetta", "Beef", 'Caprese', 'Shrimp', "Biryani",
    "Main course", "Indian", "Pakistani", "Karahi", "Keema", "Potatoes", "Kebabs", "Saag", "Roti", "Ramen", "Soup", "Tagine", "Chickpea", "Moroccan", "Bibimbap", "Korean",    "Rice", "Moussaka", "Greek", "Butter chicken", "Curry", "Thai", "Lassi","Mango", "Tiramisu", "Turkish", "Grilling", "Smoothie", "Blueberry", "Spanakopita", "Banana", "Elote", "Mexican", "Street food", "Borscht", "Russian", "Soup", "Dosa", "Falafel", "Lebanese", "Wrap", "Caipirinha", "Cocktail", "Patatas bravas", "Spanish", "Spring rolls", "Vietnamese", "Quinoa salad", "Mediterranean", "Matcha ice cream", "Japanese", "Brigadeiros", "Brazilian", "Enchiladas", "Shrimp curry", "Couscous salad", "Mojito", "Cuban", "Teriyaki chicken", "Mango salsa", "Shrimp stir-fry",
    "Quick", "Margherita pizza", "Pesto pasta", "Chicken skewers", "Hawaiian", "Sushi rolls", "Chickpea salad", "Pineapple",
    "Coconut"]

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    console.log(value)
    setCurrentPage(value)
  }

  useEffect(() => {
    setTempData(data);
    // setCurrentRecipe(data.slice(indexOfFirstRecipe, indexOfLastRecipe))  
  }, [data])

  useEffect(() => {
    setCurrentPage(1)
    let newData = data;
    newData = mealType ? newData.filter((el: any) => el.mealType.includes(mealType)) : newData
    newData = cuisine ? (newData.filter((el: any) => el.cuisine.toLowerCase() === cuisine.toLowerCase())) : newData
    newData = difficulty ? (newData.filter((el: any) => el.difficulty.toLowerCase() === difficulty.toLowerCase())) : newData
    newData = tags ? newData.filter((el: any) => el.tags.includes(tags)) : newData

    console.log(mealType, newData)
    // setCurrentRecipe(newData.slice(indexOfFirstRecipe, indexOfLastRecipe))
    setTempData(newData)

  }, [mealType, cuisine, difficulty,tags])




  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'row' ,justifyContent:'space-between'}}>
        <Box><BasicSelect field={mealType} setField={setMealType} type="Select Meal" options={mealOptions} /> </Box>
        <Box><BasicSelect field={cuisine} setField={setCuisine} type="Select Cuisine" options={cuisineOptions} /> </Box>
        <Box><BasicSelect field={difficulty} setField={setDifficulty} type="Difficulty" options={difficultyOptions} /> </Box>
        <Box><BasicSelect field={tags} setField={setTags} type="Tags" options={tagsOptions} /> </Box>

      </Box>
      <Container className='App' maxWidth='xl' >
        <Grid container spacing={5} marginTop={1} >

          {(currentRecipe && currentRecipe.length) ? currentRecipe.map((el: Recipe) => (
            <Card {...el} />
          )) : <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', marginTop: 5 }}>No data available as per your choice. Please try something else.</Box>}


        </Grid>
      </Container>
      <Paper sx={{ position: 'fixed', bottom: 0, display: 'flex', justifyContent: 'center', alignContent: 'center', padding: 1, width: '100%' }} elevation={3}>
        <Pagination count={Math.ceil(temData.length / recipePerPage)} page={currentPage} onChange={handleChange} />
      </Paper>
    </>

  )
}

export default Home