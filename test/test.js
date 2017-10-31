var assert = require('assert');
let parser = require('../src/recipe-parser')

describe('recipe-parser', function() {
    it('should parse an HTML page with a recipe', async function() {
      let parsed = await parser(recipeHtml);

      console.debug(parsed)
      
      assert.equal(parsed.name, Recipe.name);
      assert.equal(parsed.description, Recipe.description);
      assert.equal(parsed.image, Recipe.image);
      assert.equal(parsed.servingSize, Recipe.servingSize);
      assert.equal(parsed.calories, Recipe.calories);
      assert.equal(parsed.ingredients.length, 6);
    });
});


const Recipe = {
  name: 'Air Fryer French Fries',
  description: 'Crispy french fries made in the air-fryer, with just a small amount of oil!',
  image: 'http://www.skinnytaste.com/wp-content/uploads/2017/10/Air-Fryer-French-Fries-1-3-170x255.jpg',
  servingSize: '1 potato',
  calories: 176,
  ingredients: [
    'nonstick spray',
    '1 medium potatoes (6 oz), yukon gold or russet, washed and dried',
    '1 teaspoon olive oil',
    '1/8 teaspoon kosher salt',
    '1/8 teaspoon garlic powder',
    'fresh cracked black pepper, to taste'
  ]
}

const recipeHtml = `
<div class="recipe" itemscope itemtype="http://schema.org/Recipe">

<img src="${Recipe.image}" itemprop="image" align="right" class="photo nopin" nopin="nopin" />
<h2 itemprop="name"><span>${Recipe.name}</span></h2>
<div class="post-meta">
<div class="recipe-meta">
		<span class="icon-sp">5 Smart Points</span>
		<span class="icon-star" itemprop="calories">176 calories</span>
		<span class="time icon-clock"><strong>Total:</strong><meta itemprop="totalTime" content="PT30M">30 minutes</span>
</div></div>
	<div class="summary" itemprop="description"><p>${Recipe.description}</p></div>
<h3 id="ingredients">Ingredients:</h3>
<div class="ingredients">
  <ul>
  ${Recipe.ingredients.map(ingredient =>
    `<li class="ingredient" itemprop="ingredients">${ingredient}</li>`
  )}
  </ul>
</div>

<h3 id="directions">Directions:</h3>
<div class="instructions">
<span itemprop="recipeInstructions">
<ol>
  <li>Preheat the air fryer 380°F.  Spray the basket with oil.</li>
  <li>Cut the potato lengthwise into 1/4 inch thin slices; then cut each slice into 1/4 inch fries. (A mandolin is helpful here).</li>
  <li>In a  medium bowl toss the potatoes and oil. Season with salt, garlic powder and black pepper to taste; toss to coat.</li>
  <li>Place the potatoes in the basket in an even layer without overlapping or crowding, cook the potatoes 15 minutes, turning halfway until crisp.</li>
</ol>
</span>
</div>

<div class="nutrition" itemprop="nutrition">
<span itemscope itemtype="http://schema.org/NutritionInformation">
<h3 id="nutrition">Nutrition Information</h3>
<p>Yield: <span class="yield" itemprop="recipeYield">1 serving</span>, Serving Size: <span itemprop="servingSize">${Recipe.servingSize}</span></p>
<ul>
<li><strong>Amount Per Serving:</strong> </li>
<li>Smart Points: <span itemprop="calories">5</span></li>
<li>Points +: <span itemprop="calories">5</span></li>
<li>Calories: <span itemprop="calories">${Recipe.calories}</span></li>
<li>Total Fat: <span itemprop="fatContent">4.5g</span></li>
<li>Saturated Fat: <span itemprop="saturatedFatContent">0.5g</span></li>
<li>Cholesterol: <span itemprop="cholesterolContent">0mg</span></li>
<li>Sodium: <span itemprop="sodiumContent">6.5mg</span></li>
<li>Carbohydrates: <span itemprop="carbohydrateContent">31.5g</span></li>
<li>Fiber: <span itemprop="fiberContent">2.5g</span></li>
<li>Sugar: <span itemprop="sugarContent">1g</span></li>
<li>Protein: <span itemprop="proteinContent">4g</span></li>
</ul>
</span>
</div>
`