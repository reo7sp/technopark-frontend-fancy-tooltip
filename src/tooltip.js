import {clamp} from './utils';

export default class Tooltip {
    constructor(id, el) {
        this._id = id;
        this._el = el;

        this._arrowEl = el.getElementsByClassName('tooltip__arrow')[0];
        this._timeoutHandle = null;
    }

    get id() {
        return this._id;
    }

    get el() {
        return this._el;
    }

    show(x, y) {
        clearTimeout(this._timeoutHandle);
        this._el.classList.remove('tooltip--hidden');
        this._el.classList.remove('tooltip--shallow-hidden');
    }

    move(x, y) {
        const windowWidth = document.body.getBoundingClientRect().width;
        const elWidth = this._el.getBoundingClientRect().width;
        const elHeight = this._el.getBoundingClientRect().height;
        const elMargin = 4;
        const arrowWidth = 16;
        const arrowHeight = 16;
        const arrowMargin = 4;
        const verticalSpace = 2;

        const elX = clamp(x - elWidth / 2, elMargin, windowWidth - elWidth - elMargin);
        const elY = Math.max(y - elHeight - arrowHeight - verticalSpace, elMargin);
        this._el.style.left = `${elX}px`;
        this._el.style.top = `${elY}px`;

        const arrowX = clamp(x - elX - arrowWidth / 2, arrowMargin, elWidth - arrowWidth - arrowMargin);
        const arrowY = elHeight;
        this._arrowEl.style.left = `${arrowX}px`;
        this._arrowEl.style.top = `${arrowY}px`;
    }

    hide() {
        this._el.classList.add('tooltip--shallow-hidden');
        clearTimeout(this._timeoutHandle);
        this._timeoutHandle = setTimeout(() => {
            this._el.classList.add('tooltip--hidden');
        }, 200)
    }
}