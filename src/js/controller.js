import { async } from "regenerator-runtime";
import { MODAL_CLOSE_SEC, SORTED } from "./config.js";
import * as model from "./model.js";
import View from "./views/View.js";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";
import resultsView from "./views/resultsView.js";
import paginationView from "./views/paginationView.js";
import bookmarksView from "./views/bookmarksView.js";
import addRecipeView from "./views/addRecipeView.js";
import sortView from "./views/sortView.js";

// Polyfills allow web developers to use an API regardless of whether or not it is supported by a browser
import "core-js/stable"; // polyfilling everything else
import "regenerator-runtime/runtime"; // polyfilling async/await
import addRecipeView from "./views/addRecipeView.js";

// https://forkify-api.herokuapp.com/v2
///////////////////////////////////////

const controlRecipes = async function () {
  try {
    // 1) get recipe id, if there's none, return
    const id = window.location.hash.slice(1);
    if (!id) return;

    // 2) Loading spinner
    recipeView.renderSpinner();

    // 3) Update results view to mark selected search result
    resultsView.update(model.resultsPerPage());
    bookmarksView.update(model.state.bookmarks);

    // 4) Load recipe
    await model.loadRecipe(id); // it returns a promise, so we must await it

    // 5) Render recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    View.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    let query;
    // 1) Get search query
    query = searchView.getQuery();
    if (!query) query = model.state.search.query;
    if (!query) return;

    // 2) Load spinner
    resultsView.renderSpinner();

    // 2) Load search results
    await model.loadSearchResults(query);

    // 3) Render results
    //resultsView.render(model.state.search.resutls);
    resultsView.render(model.resultsPerPage());

    resultsView.update(sortView.sorter(model.state.search.currentPageResult));

    // 4) Render initial pagination buttons
    paginationView.render(model.state.search);

    // 5) Render sort button
    sortView.createSorterBtn();

    // 5) Reset page to 1
    model.state.search.page = 1;
  } catch (err) {
    View.renderError();
  }
};

const controlPagination = function (goToPage) {
  model.state.search.page = goToPage;
  controlSearchResults();
};

const controlServings = function (newServings) {
  // Update the recipe servings (in state)
  model.updateServings(newServings);

  // Update the recipe view
  //recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  // 1) Add to bookmarks array
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  // 2) Update recipe view to change bookmark icon
  recipeView.update(model.state.recipe);

  // 3) Render bookmarks
  bookmarksView.render(model.state.bookmarks);

  // 4) Save bookmarks to local storage
  model.saveLocal("bookmarks");
};

const controlAddRecipe = async function (newRecipe) {
  try {
    // Show loading spinner
    addRecipeView.renderSpinner();

    // Upload the new recipe data
    await model.uploadRecipe(newRecipe);

    // Render recipe
    recipeView.render(model.state.recipe);

    // Success message
    addRecipeView.renderMessage;

    // Render bookmark view
    bookmarksView.render(model.state.bookmarks);

    // Change ID in URL
    window.history.pushState(null, "", `#${model.state.recipe.id}`);

    // Close form window
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    addRecipeView.renderError(err.message);
  }
};

const controlSort = function () {
  sortView.sorter(model.state.search.currentPageResult);

  resultsView.render(model.state.search.currentPageResult);
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  bookmarksView.render(model.getLocal("bookmarks"));
  addRecipeView.addHandlerUpload(controlAddRecipe);
  sortView.addEventHandler(controlSort);
};
init();
controlSearchResults();
