import View from "./View";

class AddRecipeView extends View {
  _parentEl = document.querySelector(".upload");
  _message = "Recipe was successfuly uploaded";

  _window = document.querySelector(".add-recipe-window");
  _overlay = document.querySelector(".overlay");
  _btnOpen = document.querySelector(".nav__btn--add-recipe");
  _btnClose = document.querySelector(".btn--close-modal");
  _addIngredient = document.querySelector(".ingredients__btn-add");
  _IngredientsNum = 1;
  _IngredientsColumn = document.querySelector(".upload__column--igredients");

  constructor() {
    super(); // get parent methods from View class
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
    this._addHandlerAddIngredient();
    this._addHandlerDeleteIng();
  }

  toggleWindow() {
    this._overlay.classList.toggle("hidden");
    this._window.classList.toggle("hidden");
  }

  _addHandlerShowWindow() {
    this._btnOpen.addEventListener("click", this.toggleWindow.bind(this));
  }

  _addHandlerHideWindow() {
    this._btnClose.addEventListener("click", this.toggleWindow.bind(this));
    this._overlay.addEventListener("click", this.toggleWindow.bind(this));
  }

  addHandlerUpload(handler) {
    this._parentEl.addEventListener("submit", function (e) {
      e.preventDefault();
      // Select all the input elements with class 'upload__column--ingredient'
      const ingredientInputs = document.querySelectorAll(
        '.upload__column--ingredient input[type="text"]'
      );

      // Create an empty array to store the ingredient arrays
      const ingredientsArray = [];

      // Iterate over the input elements in groups of 3 and create arrays
      for (let i = 0; i < ingredientInputs.length; i += 3) {
        const quantity = ingredientInputs[i].value.trim();
        const unit = ingredientInputs[i + 1].value.trim();
        const description = ingredientInputs[i + 2].value.trim();
        const ingredientArray = [quantity, unit, description];
        ingredientsArray.push(ingredientArray);
      }

      const dataArr = [...new FormData(this)];

      const filterdData = new FormData();
      for (let [key, value] of dataArr) {
        if (!key.startsWith("ingredient-")) filterdData.append(key, value);
      }

      const data = Object.fromEntries(filterdData);
      data.ingredients = ingredientsArray;

      handler(data);
    });
  }

  _createIngredient() {
    this._IngredientsNum++;
    const html = `
    <div class="new-ingredient">
     <label>
      Ingredient ${this._IngredientsNum}
      <i class="fa-solid fa-trash ingredient-delete"></i>
     </label>
     <div class="upload__column--ingredient">
      <input type="text" name="ingredient-${this._IngredientsNum}" placeholder="'Quantity', example: 0.5" />
      <input type="text" name="ingredient-${this._IngredientsNum}" placeholder="'Unit', example: kg" />
      <input type="text" name="ingredient-${this._IngredientsNum}" required placeholder="'Description', example: Rice" />
     </div>
    </div>
    `;
    this._IngredientsColumn.insertAdjacentHTML("beforeend", html);
  }

  _addHandlerAddIngredient() {
    this._addIngredient.addEventListener(
      "click",
      this._createIngredient.bind(this)
    );
  }

  _addHandlerDeleteIng() {
    this._IngredientsColumn.addEventListener("click", (e) => {
      if (e.target.classList.contains("ingredient-delete"))
        e.target.closest(".new-ingredient").remove();
    });
  }

  // _generateMarkup() {}
}

export default new AddRecipeView();
