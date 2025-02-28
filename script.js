// This function fetchs data from the API
function fetchData() {
    return axios.get('https://www.themealdb.com/api/json/v1/1/random.php')
        .then((response) => {
            if (response.data.meals) {
                return response.data.meals[0];
            }

        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });
}



// This function displays suggested recipe 
function displayCard(data) {
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

    const categoryAndAreaDiv=document.createElement('div')
    categoryAndAreaDiv.className='categoryAndAreaDiv'
    recipeInfo.append(categoryAndAreaDiv)

    const recipeArea=document.createElement('p')
    recipeArea.className='recipeArea'
    recipeArea.innerText=data.strArea;
    categoryAndAreaDiv.appendChild(recipeArea)

    const recipeCategory=document.createElement('p')
    recipeCategory.className='recipeCategory'
    recipeCategory.innerText=data.strCategory
    categoryAndAreaDiv.appendChild(recipeCategory)

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

    //we need to make this length method instead of using numbers.
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
        videoFrame.width = "400";
        videoFrame.height = "300";
        videoFrame.src = data.strYoutube.replace("watch?v=", "embed/");
        videoFrame.allowFullscreen = true;

        videoTutorial.appendChild(videoFrame);
        recipeInfo.appendChild(videoTutorial);
    }


    recipeSection.appendChild(recipeContainer);

    return recipeSection
}



// This function displays the fetched data to DOM
function displayToDom() {
    fetchData()
        .then((recipe) => { displayCard(recipe) })
}
const button = document.querySelector(".btn");
button.addEventListener('click', displayToDom);


// This is login part
const inputs = document.querySelectorAll(".input-field");
const toggle_btn = document.querySelectorAll(".toggle");
const main = document.querySelector(".auth-container");
const bullets = document.querySelectorAll(".bullets span");
const images = document.querySelectorAll(".image");

inputs.forEach((inp) => {
    inp.addEventListener("focus", () => {
        inp.classList.add("active");
    });
    inp.addEventListener("blur", () => {
        if (inp.value != "") return;
        inp.classList.remove("active");
    });
});

toggle_btn.forEach((btn) => {
    btn.addEventListener("click", () => {
        main.classList.toggle("sign-up-mode");
    });
});

function moveSlider() {
    let index = this.dataset.value;

    let currentImage = document.querySelector(`.img-${index}`);
    images.forEach((img) => img.classList.remove("show"));
    currentImage.classList.add("show");

    const textSlider = document.querySelector(".text-group");
    textSlider.style.transform = `translateY(${-(index - 1) * 2.2}rem)`;

    bullets.forEach((bull) => bull.classList.remove("active"));
    this.classList.add("active");
}

bullets.forEach((bullet) => {
    bullet.addEventListener("click", moveSlider);
});


//login and registration functionality.
let currentUser = null;

// Register a new user
const regist = document.querySelector(".sign-up-form");
regist.addEventListener("submit", (e) => {
    e.preventDefault(); // Corrected the call

    const userName = document.querySelector(".name-input").value; // Getting the value
    const userEmail = document.querySelector(".email-input").value; // Getting the value
    const userPass = document.querySelector(".pass-input").value; // Getting the value
    const users = JSON.parse(localStorage.getItem('users')) || {};

    if (users[userName]) {
        alert("Username already exists");
        return;
    }

    users[userName] = { userEmail, userPass, savedRecipes: [] }; // Updated user object
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registration Successful");
    regist.reset();

    document.querySelector("main").classList.remove("hidden");
});

// Login handler
const handleLogin = (e) => {
    e.preventDefault();

    const userName = document.querySelector(".name").value; // Correctly getting input value
    const userPass = document.querySelector(".password").value; // Correctly getting input value

    const users = JSON.parse(localStorage.getItem("users")) || {};

    // Corrected the login check condition
    if (!users[userName] || users[userName].userPass !== userPass) {
        alert("Invalid username or password");
        return;
    }

    currentUser = userName;
    document.querySelector(".auth-container").classList.add("hidden");
    document.querySelector(".recipe-Wrapper").classList.remove("hidden");

    alert("Login Successful");

    document.querySelector(".sign-in-form").reset();
};

document.querySelector(".sign-in-form").addEventListener("submit", handleLogin);


// This is saving recipe part
document.getElementById("save-recipe-btn").addEventListener("click", () => {
    const meal = JSON.parse(document.getElementById("mealSuggestion").dataset.meal);
    saveRecipe(meal);
});

function saveRecipe(recipe) {
    const users = JSON.parse(localStorage.getItem("users")) || {};
    if (!currentUser) {
        alert("You must be logged in to save recipes");
        return;
    }
    users[currentUser].savedRecipes.push(recipe);
    localStorage.setItem("users", JSON.stringify(users));
    alert("Recipe saved");
}


// This is view saved recipe
document.getElementById("viewSavedBtn").addEventListener("click", viewSavedRecipes);

function viewSavedRecipes() {
    
    const users = JSON.parse(localStorage.getItem("users")) || {};
    if (!currentUser) {
        alert("You must be logged in to view saved recipes");
        return;
    }
    const savedRecipes = users[currentUser].savedRecipes;
    const savedRecipesDiv = document.getElementById("savedRecipes");
    savedRecipesDiv.innerHTML = savedRecipes.map(recipe => `
          <div>
              <h2>${recipe.strMeal}</h2>
              <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}">
          </div>
      `).join("");
    savedRecipesDiv.classList.remove("hidden");
}



// About us section
const teamData = [
    {
        name: "Maria Yusuf",
        role: "Team Lead / Card Designer",
        photo: "./img/IMG_5632.jpeg", 
        github: "https://github.com/Mariayusuf12", 
        bio: "Passionate about design and development."
    },
    {
        name: "Abdulahi",
        role: "API Creator / Designer",
        photo: "./img/abdulahi.jpg",
        github: "https://github.com/abdillahi485",
        bio: "Loves working with APIs and backend development."
    },
    {
        name: "Abdirahman",
        role: "Login Creator",
        photo: "./img/abdirahman.jpg",
        github: "https://github.com/Armanmoham23",
        bio: "Focused on authentication and security."
    }
];

const aboutUsBtn = document.querySelector(".AboutUsButton");

aboutUsBtn.addEventListener('click', displayTeamInfo);



function displayTeamInfo() {
    const teamContainer = document.getElementById('info');
    const teamMember = document.createElement("div")
    teamMember.classList.add("teams")
    

    teamContainer.className = 'team-container';
    teamContainer.innerHTML = ''; // Clear previous content
    teamContainer.appendChild(teamMember)
    


    teamData.forEach(member => {
        const memberDiv = document.createElement('div');
        memberDiv.classList.add('team-member');

        memberDiv.innerHTML = `
            <img src="${member.photo}" alt="${member.name}">
            <h3>${member.name}</h3>
            <p><strong>Role:</strong> ${member.role}</p>
            <p>${member.bio}</p>
            <p><a href="${member.github}" target="_blank">GitHub</a></p>
        `;
        teamContainer.appendChild(memberDiv);
    });
}
