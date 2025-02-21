function fetchData(){
return axios.get('https://www.themealdb.com/api/json/v1/1/random.php')
.then ((response)=>{
    if (response.data.meals) {
        return response.data.meals[0]; 
    }

    
})
.catch(error => {
    console.error("Error fetching data:", error);
});
}
function displayCard(data){
    
    // check if data received
    if (!data) {
        console.error("No data received to display!");
        return;
    }
    const recipeSection = document.querySelector(".recipe-display");
    recipeSection.innerHTML = '';

     // Create the recipe card container
     const recipeContainer = document.createElement('div');
     recipeContainer.className = 'recipe-container';

     // Create the image element
     const recipeImage = document.createElement('img');
     recipeImage.className = 'recipe-imag';
     recipeImage.src = data.strMealThumb;
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
     ingredientsHeading.textContent = data.strMeal;

     const ingredientsSubHeading = document.createElement('h4');
     ingredientsSubHeading.textContent = 'Ingredients';

     const ingredientsList = document.createElement('ul');
     ingredientsList.className = 'ingredients-list';

for (let i = 1; i <= 20; i++) {
    const ingredient = data[`strIngredient${i}`];
    const measure = data[`strMeasure${i}`];

    if (ingredient && ingredient.trim() !== '') {
        const listItem = document.createElement('li');
        listItem.textContent = `${measure} - ${ingredient}`;
        ingredientsList.appendChild(listItem);
    }
}


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
    
    const instructions = data.strInstructions.split('. '); 
    instructions.forEach(instruction => {
        if (instruction.trim() !== '') {
            const listItem = document.createElement('li');
            listItem.textContent = instruction;
            instructionsList.appendChild(listItem);
        }
    });

        // Create the video tutorial section
        if (data.strYoutube) {
            const videoTutorial = document.createElement('div');
            videoTutorial.className = 'video-tutorial';
    
            const videoHeading = document.createElement('h4');
            videoHeading.textContent = 'Video Tutorial';
            videoTutorial.appendChild(videoHeading);
    
            const videoFrame = document.createElement('iframe');
            videoFrame.width = "500";
            videoFrame.height = "300";
            videoFrame.src = data.strYoutube.replace("watch?v=", "embed/"); 
            videoFrame.allowFullscreen = true;
    
            videoTutorial.appendChild(videoFrame);
            recipeInfo.appendChild(videoTutorial);
        }

    
     recipeSection.appendChild(recipeContainer);

     return recipeSection
}

function displayToDom(){
    fetchData()
    .then((recipe)=>{displayCard(recipe)})
}
const button = document.querySelector(".btn");

button.addEventListener('click',displayToDom)


