var ingredientParser = require('recipe-ingredient-parser');
var cheerio = require('cheerio');
var WAE = require('web-auto-extractor').default();

module.exports = function recipeParser(html) {

    return new Promise(function(resolve,reject) {

        let meta = WAE.parse(html);

        let recipe = JSON.parse(JSON.stringify(meta.microdata && meta.microdata.Recipe && meta.microdata.Recipe[0]));
        let nutrition = JSON.parse(JSON.stringify(meta.microdata && meta.microdata.NutritionInformation && meta.microdata.NutritionInformation[0]));

        for(var key in recipe) {
            if(key[0] == '@') delete recipe[key];
        }

        for(var key in nutrition) {
            if(key[0] == '@') delete nutrition[key];
        }
        delete nutrition['nutrition']
        
        recipe.ingredients = recipe.ingredients.map(x => ({ 
            display: x, 
            ...ingredientParser.parse(x) 
        }));

        recipe.instructions = recipe.recipeInstructions.split('.').map(x => x.trim()).filter(x => x && x.length)
        delete recipe.recipeInstructions;

        if(Array.isArray(nutrition.calories)) {
            nutrition.calories = Math.max.apply(null, nutrition.calories.map(x => Number.parseInt(x)));
        }
        
        resolve({ 
            ...recipe,
            ...nutrition
        });
    });
}
