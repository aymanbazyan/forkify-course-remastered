import icons from "url:../../img/icons.svg"; // Parcel 2

export default class View {
  _data;

  /*
   * Render the received object to the DOM
   *
   */
  render(data) {
    if (!data || (Array.isArray(data) && !data.length))
      return this.renderError();

    this._data = data;
    const markup = this._generateMarkup();

    this._clear(this._parentEl);
    this._parentEl.insertAdjacentHTML("beforeend", markup);
  }

  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();

    // 1) Create new virtual DOM
    const newDOM = document.createRange().createContextualFragment(newMarkup);

    // 2) Select & save all new DOM elements
    // Convert from node lists to arrays:
    const curElements = Array.from(this._parentEl.querySelectorAll("*"));
    const newElements = Array.from(newDOM.querySelectorAll("*"));

    newElements.forEach((newEl, i) => {
      // Compare curElements and newElements
      const curEl = curElements[i];
      // console.log(curEl, newEl.isEqualNode(curEl));

      // Update changed text
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ""
      )
        curEl.textContent = newEl.textContent;

      // Update changed attributes
      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach((attr) =>
          curEl.setAttribute(attr.name, attr.value)
        );
      }
    });
  }

  renderSpinner() {
    const markup = `
        <div class="spinner">
          <svg>
            <use href="${icons}#icon-loader"></use>
          </svg>
        </div>
      `;
    this._parentEl.innerHTML = markup;
  }

  renderError(message = this._errorMessage) {
    const markup = `
                <div class="error">
                  <div>
                    <svg>
                      <use href="${icons}#icon-alert-triangle"></use>
                    </svg>
                  </div>
                  <p>${message}</p>
                </div>
        `;

    this._parentEl.innerHTML = markup;
  }

  renderMessage(message = this._message) {
    // console.log(message);
    const markup = `
                <div class="message">
                  <div>
                    <svg>
                      <use href="${icons}#icon-smile"></use>
                    </svg>
                  </div>
                  <p>${message}</p>
                </div>
        `;
    this._parentEl.innerHTML = markup;
  }

  _clear(el) {
    el.innerHTML = "";
  }
}
