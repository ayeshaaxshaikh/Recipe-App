const inputBox = document.querySelector('.txt-search');
const searchBtn = document.querySelector('.btn-search');
const recipeContainer = document.querySelector('.recipe-container');
const recipeContent = document.querySelector('.recipe-content');
const closeBtn = document.querySelector('.btn-close');

const fetchRecipes = async (query)=>{
    recipeContainer.innerHTML = '<h2>Fetching Recipes...</h2>';

    try {
        
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const response = await data.json();

    recipeContainer.innerHTML = '';

    response.meals.forEach(meal => {
        const recipeDiv = document.createElement('div');
        recipeDiv.classList.add('recipe');
        recipeDiv.innerHTML = `
        <img src="${meal.strMealThumb}">
        <h3>${meal.strMeal}</h3>
        <p><span>${meal.strArea}</span> Dish</p>
        <p>Belongs to <span>${meal.strCategory}</span> Category</p>
        `;

        const button = document.createElement('button');
        button.textContent = 'View Recipe';
        
        recipeDiv.appendChild(button);

        button.addEventListener('click', ()=>{
            openRecipe(meal);
        });

        recipeContainer.appendChild(recipeDiv);
    });
    }   
    catch (error) {
    recipeContainer.innerHTML = '<h2>Error in Fetching Recipes...</h2>';
    }
}

const fetchIngredients = (meal)=>{
    let ingredientsList = '';
    for(let i=1; i<=20; i++){
        const ingredient = meal[`strIngredient${i}`];
        if(ingredient){
            const measure = meal[`strMeasure${i}`];
            ingredientsList += `<li>${measure} ${ingredient}</li>`;
        } else {
            break;
        }
    }
    return ingredientsList;
}

const openRecipe = (meal)=>{
    recipeContent.innerHTML = `
    <h2 class="recipe-name">${meal.strMeal}</h2>
    <h3>Ingredient:</h3>
    <ul class="ingredient-list">${fetchIngredients(meal)}</ul>
    <div class="instructions">
        <h3>Instruction:</h3>
        <p>${meal.strInstructions}</p>
    </div>
    `;

    recipeContent.parentElement.style.display = 'block';
}

closeBtn.addEventListener('click', ()=>{
    recipeContent.parentElement.style.display = 'none';
});

searchBtn.addEventListener('click', (e)=>{
    e.preventDefault();
    const searchInput = inputBox.value.trim();
    if(!searchInput){
        recipeContainer.innerHTML = `<h2>Type the meal in the search box.</h2>`;
        return;
    }
    fetchRecipes(searchInput);
});