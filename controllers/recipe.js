const Recipe = require('../models/receipe')

const getRecipes = async (req, res) => {
    try {
        const receipes = await Recipe.find()
        res.status(200).json(receipes)
    } catch (err) {
        res.status(500).json({ errorMessage: 'An error occurred while fetching receipes' })
    }

}

const getRecipe = async (req, res) => {
    try {
        const id = req.params.id
        const receipe = await Recipe.find({ recipeid: id })
        res.status(200).json(receipe)
    } catch (err) {
        res.status(500).json({ errorMessage: 'An error occurred while fetching receipes' })
    }
}

const addRecipe = async (req, res) => {
    try {
        const incomingdData = req.body
      
        const recipeCount= await Recipe.countDocuments({})
        
        incomingdData['recipeid']=recipeCount+1
        incomingdData['serving']=4;
        incomingdData['caloriesPerServing']=300
        incomingdData['userId']=Math.ceil(Math.random()*50)+10
        incomingdData['rating']=Math.ceil(Math.random()*4)+1
        incomingdData['reviewCount']=Math.ceil(Math.random()*90)+10

        let addedData =await Recipe.create(incomingdData);

        res.status(200).json({message:'Data added in database'})
    } catch (err) {
        res.status(500).json({ errorMessage: 'An error occurred while fetching receipes' })
    }

}

module.exports = {
    getRecipes,
    getRecipe,
    addRecipe,
}