const searchBox = document.querySelector('.searchBox');
const submitBtn = document.querySelector('.submitBtn');
const recipeContainer = document.querySelector('.recipe-container');
const recipeCloseBtn = document.querySelector('.recipe-close-btn');
const recipeDetailsContent = document.querySelector('.recipe-details-content');

// Function to get recipes
const fetchRecipe = async (inputData) => {
    // recipe-container text
    recipeContainer.innerHTML = '<h2>Fethcing Recipe...</h2>';

    // catch error
    try {
        const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputData}`);

        // convert the promises of data to json
        const response = await data.json();

        recipeContainer.innerHTML = '';

        // Loop through the response
        response.meals.forEach((meal) => {
            // console.log(meal);

            // Create a div element
            const recipeDiv = document.createElement('div');
            // Add class to the div element
            recipeDiv.classList.add('recipe');
            recipeDiv.innerHTML = `
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                <h3>${meal.strMeal}</h3>
                <p><span>${meal.strArea}</span> Dish</p>
                <p><span>${meal.strCategory}</span></p>
            `
            // create a button element
            const recipeBtn = document.createElement('button');
            recipeBtn.textContent = 'View Recipe';
            // Add button in recipeDiv
            recipeDiv.appendChild(recipeBtn);

            // Adding eventListner to recipeBtn
            recipeBtn.addEventListener('click', () => {
                openRecipePopUp(meal);
            });

            recipeContainer.appendChild(recipeDiv);
        });
    }
    catch (error) {
        recipeContainer.innerHTML = '<h2>Error in Fethcing Recipes...</h2>';
    }

    // console.log(response.meals[0]);
}

// Create a function for open recipe popup
const openRecipePopUp = (meal) => {
    // add recipe details
    recipeDetailsContent.innerHTML = `
        <h2 class="recipeName">${meal.strMeal}</h2>
        <h3>Ingredients:</h3>
        <ul class="listOfIngredients">${fetchIngredients(meal)}</ul>
        <div class="recipeInstructions">
            <h3>Instructions:</h3>
            <p class="instruction">${meal.strInstructions}</p>
        </div>
    `
    // add style to the parent element
    recipeDetailsContent.parentElement.style.display = "block";
}

// Add style in recipeCloseBtn
recipeCloseBtn.addEventListener('click', () => {
    recipeDetailsContent.parentElement.style.display = "none";
})

// // create a function for fetch Ingredients and measurements
const fetchIngredients = (meal) => {
    // console.log(meal);
    let ingredientList = " ";
    for(let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        // console.log(ingredient);
        if (ingredient) {
            const measure = meal[`strMeasure${i}`];

            ingredientList += `
                <li>${ingredient} - ${measure}</li>
            `

        }
        else {
            break;
        }
    }
    return ingredientList;
}

// Submit Button
submitBtn.addEventListener("click", (e) => {
    // Stop auto submit or auto refresh
    e.preventDefault();
    // to fetch the input value
    const searchInput = searchBox.value.trim();
    fetchRecipe(searchInput);
    // console.log("I am Clicked");
});