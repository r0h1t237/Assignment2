const mongoose = require('mongoose');
 const recipeSchema = new mongoose.Schema({
    recipeid: Number,
    name: String,
    ingredients: [String],
    instructions: [String],
    prepTimeMinutes: Number,
    cookTimeMinutes: Number,
    servings: Number,
    difficulty: String,
    cuisine: String,
    caloriesPerServing: String,
    tags: [String],
    userId: Number,
    image: String,
    rating: { type: Number, min: 1, max: 5 },
    reviewCount: Number,
    mealType: [String]
})

const Recipe= mongoose.model('listofrecipes', recipeSchema);

module.exports = Recipe;