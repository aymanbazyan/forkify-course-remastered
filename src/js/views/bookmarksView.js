import View from "./View";
import icons from "url:../../img/icons.svg"; // Parcel 2

class BookmarksView extends View {
  _parentEl = document.querySelector(".bookmarks__list");

  _generateMarkup() {
    return this._data.map(this._generateMarkupPreview);
  }

  _generateMarkupPreview(recipe) {
    const id = window.location.hash.slice(1);
    return `
        <li class="preview">
        <a class="preview__link ${
          id === recipe.id ? "preview__link--active" : ""
        }" href="#${recipe.id}">
          <figure class="preview__fig">
            <img src="${recipe.image}" alt="recipe image" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">
              ${recipe.title}
            </h4>
            <p class="preview__publisher">
            ${recipe.publisher}
            </p>
           
          </div>
        </a>
      </li>
      `;

    //   <div class="preview__user-generated ${recipe.key ? "" : "hidden"}">
    //   <svg>
    //    <use href="${icons}#icon-user"></use>
    //   </svg>
    // </div>
  }

  renderError() {
    const markup = `
    <div class="message">
      <div>
        <svg>
         <use href="${icons}#icon-smile"></use>
        </svg>
      </div>
      <p>
        No bookmarks yet. Find a nice recipe and bookmark it :)
      </p>
    </div>
        `;
    this._parentEl.innerHTML = markup;
  }
}

export default new BookmarksView();
