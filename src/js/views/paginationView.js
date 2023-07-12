import View from "./View";
import icons from "url:../../img/icons.svg";

class PaginationView extends View {
  _parentEl = document.querySelector(".pagination");

  addHandlerClick(handler) {
    this._parentEl.addEventListener("click", (e) => {
      // cloeset searches up in the tree (parents), not down (children)
      const btn = e.target.closest(".btn--inline");
      if (!btn) return;
      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateMarkup() {
    let backwards, forward;
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    let first = `
    <button data-goto="${1}" class="btn--inline pagination__btn--first">
    <i class="fa fa-thin fa-backward"></i>
     <span>First page</span>
    </button>
    `;

    let last = `
    <button data-goto="${numPages}" class="btn--inline pagination__btn--last">
     <span>Last page</span>
     <i class="fa fa-thin fa-forward"></i>
    </button>
    `;

    let pageHead = `
     <h3 class='heading--2'>${curPage}</h3>
    `;

    // Page 1, there are other pages
    if (curPage === 1 && numPages > 1) {
      forward = curPage + 1;
      return `
      ${pageHead}
      <button data-goto="${forward}" class="btn--inline pagination__btn--next">
        <span>Page ${forward}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>
      ${last}
        `;
    }

    // Page 1, there are no other pages
    if (curPage === 1 && numPages === 1) {
      return "";
    }

    // Last page
    if (curPage === numPages && numPages > 1) {
      backwards = numPages - 1;

      return `
        ${pageHead}
        <button data-goto="${backwards}" class="btn--inline pagination__btn--prev">
         <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
         </svg>
         <span>Page ${backwards}</span>
        </button>
        ${first}
      `;
    }

    // Other page
    if (curPage < numPages && curPage > 1) {
      backwards = curPage - 1;
      forward = curPage + 1;

      return `
      ${pageHead}
      <button data-goto="${backwards}" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${backwards}</span>
      </button>
      ${first}
      <button data-goto="${forward}" class="btn--inline pagination__btn--next">
        <span>Page ${forward}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>
      ${last}
        `;
    }
  }
}

export default new PaginationView();
