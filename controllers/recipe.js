const Recipe = require('../models/receipe')

const getRecipes=async(req,res)=>{
    try{
        const receipes= await Recipe.find()
        res.status(200).json(receipes)
    }catch(err){
        res.status(500).json({errorMessage:'An error occurred while fetching receipes'})
    }

}

const getRecipe=async(req,res)=>{
    try{
        const id=req.params.id
        const receipe = await Recipe.find({recipeid:id})
        res.status(200).json(receipe)
    }catch(err){
        res.status(500).json({errorMessage:'An error occurred while fetching receipes'})
    }
}

module.exports={
    getRecipes,
    getRecipe,
}