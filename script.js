axios.get('https://www.themealdb.com/api.php')
.then (response=>{
    console.log(response.data)
})
function displayCard(data){
    
    const recipeSection = document.querySelector(".recipe-display");

     // Create the recipe card container
     const recipeContainer = document.createElement('div');
     recipeContainer.className = 'recipe-container';

     // Create the image element
     const recipeImage = document.createElement('img');
     recipeImage.className = 'recipe-imag';
     recipeImage.src = 'R.jpeg';
     recipeImage.alt = 'Recipe Image';
     recipeContainer.appendChild(recipeImage);
     // Create the recipe info container
     const recipeInfo = document.createElement('div');
     recipeInfo.className = 'recipe-info';
     recipeContainer.appendChild(recipeInfo);

     // Create the unordered list (ingredients)
     const unOrderlist = document.createElement('div');
     unOrderlist.className = 'unOrderlist';
     recipeInfo.appendChild(unOrderlist);

     const ingredientsHeading = document.createElement('h2');
     ingredientsHeading.textContent = 'Vegan Chocolate Cake';

     const ingredientsSubHeading = document.createElement('h4');
     ingredientsSubHeading.textContent = 'Ingredients';

     const ingredientsList = document.createElement('ul');
     ingredientsList.className = 'ingredients-list';

     // Add ingredients to the list
     const ingredients = [
         '1/4 cup - salt',
         '1/4 cup - salt',
         '1/4 cup - salt',
         '1/4 cup - salt',
         '1/4 cup - salt',
         '1/4 cup - salt',
     ];

     ingredients.forEach(ingredient => {
         const listItem = document.createElement('li');
         listItem.textContent = ingredient;
         ingredientsList.appendChild(listItem);
     });

     // Append ingredients section to the unordered list container
     unOrderlist.appendChild(ingredientsHeading);
     unOrderlist.appendChild(ingredientsSubHeading);
     unOrderlist.appendChild(ingredientsList);

     // Create the ordered list (instructions)
     const orderList = document.createElement('div');
     orderList.className = 'orderList';
     recipeInfo.appendChild(orderList);


     const instructionsHeading = document.createElement('h4');
     instructionsHeading.textContent = 'Instructions';
     orderList.appendChild(instructionsHeading);

     const instructionsList = document.createElement('ol');
     instructionsList.className = 'instructions-list';
      
     orderList.appendChild(instructionsList);
     // Add instructions to the list
     const instructions = ['First, you boil the water'];

     instructions.forEach(instruction => {
         const listItem = document.createElement('li');
         listItem.textContent = instruction;
         instructionsList.appendChild(listItem);
     });


     // Create the video tutorial section
     const videoTutorial = document.createElement('div');
     videoTutorial.className = 'video-tutorial';

     const videoHeading = document.createElement('h4');
     videoHeading.textContent = 'Video Tutorial';
     videoTutorial.appendChild(videoHeading);
     recipeInfo.appendChild(videoTutorial);

    
     recipeSection.appendChild(recipeContainer);

     return recipeSection
}

const button = document.querySelector(".btn");
button.addEventListener('click',displayCard)