export default class Tooltip {
    constructor(id, el) {
        this.id = id;
        this.el = el;
    }

    show(rectAroundToShow) {
        this.el.style.left = `${rectAroundToShow.x}px`;
        this.el.style.top = `${rectAroundToShow.y - 20}px`;
        this.el.classList.remove('hidden');
    }

    hide() {
        this.el.classList.add('hidden');
    }
}