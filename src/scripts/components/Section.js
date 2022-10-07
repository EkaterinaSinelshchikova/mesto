export class Section {
  constructor(renderer, containerSelector) {
    this._renderer = renderer;
    this._containerSelector = document.querySelector(containerSelector);
  }

  render(items) {
    return items.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(element) {
    this._containerSelector.prepend(element);
  }

  removeItem(element) {
    this._containerSelector.removeChild(element);
  }
}
