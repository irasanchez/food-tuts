import React, { useEffect, useState } from "react";
import Recipe from "./components/Recipe/Recipe";

import "./App.css";

const App = () => {
  const APP_KEY = "627bf3099466bac11c07f03014e67f0f";
  const APP_ID = "865c7412";

  const [recipes, setRecipes] = useState([] /*starting state value*/);

  const [search, setSearch] = useState("");

  const [query, setQuery] = useState("chicken");

  const getSearch = event => {
    event.preventDefault(); //because forms auto refresh the page when submitted
    setQuery(search); //take the value from the end result of search and store it in query. Doing it this way keeps you from calling the API for every character typed and only calls it when the search is done officially submitted
  };

  useEffect(
    () =>
      getRecipes() /* 👈 has to be in return of a callback. don't just call the function here*/,
    [query]
    /* this array as the 2nd arg makes it only run once if empty. with query here, it'll run every time query updates, which is every time the search gets submitted*/
  );

  const getRecipes = async () => {
    const responseFromAPI = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
    ); // data from API gets eventually, not immediately. hence, "await"

    const data = await responseFromAPI.json(); //take data from API and convert it to json (js object). also needs await, because the data it uses is being awaited.

    setRecipes(data.hits); //take relevant data and set it to state in "recipes" array
  };

  const updateSearch = event => {
    setSearch(event.target.value);
  };

  return (
    <div className="App">
      <h1>Recipes</h1>
      <form className="search-form" onSubmit={getSearch}>
        <input
          className="search-bar"
          type="text"
          value={search}
          onChange={updateSearch}
        />
        <button className="search-button" type="submit">
          Search
        </button>
      </form>
      <div className="recipes">
        {recipes.map(recipe => (
          <Recipe
            key={Math.random()}
            title={recipe.recipe.label}
            calories={recipe.recipe.calories}
            image={recipe.recipe.image}
            ingredients={recipe.recipe.ingredients}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
