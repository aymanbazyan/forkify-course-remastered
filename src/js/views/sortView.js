import View from "./View";
import { SORTED, changeSortCondition } from "../config";

class RecipeView extends View {
  _sortBtn = document.querySelector(".search-sort");

  addEventHandler(handler) {
    this._sortBtn.addEventListener("click", handler);
  }

  createSorterBtn() {
    this._sortBtn.innerHTML = `
      <i class="fa-solid fa-arrow-up-a-z"></i>
`;
  }

  sorter(results) {
    changeSortCondition();
    if (SORTED) {
      this._sortBtn.innerHTML = `
      <i class="fa-solid fa-arrow-up-a-z"></i>
      `;
      return results.sort((a, b) => a.title > b.title);
    } else {
      this._sortBtn.innerHTML = `
      <i class="fa-solid fa-arrow-down-a-z"></i>
      `;
      return results.sort((a, b) => a.title < b.title);
    }
  }
}
export default new RecipeView();
