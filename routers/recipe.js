const express = require('express');
const receipeContollers = require('../controllers/recipe')

const router = express.Router();

router.get('/getAllRecipes',receipeContollers.getRecipes);
router.get('/getRecipe/:id',receipeContollers.getRecipe)

module.exports=router