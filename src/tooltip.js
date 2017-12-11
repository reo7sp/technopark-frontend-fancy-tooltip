import {clamp} from './utils';

export default class Tooltip {
    constructor(text) {
        this._el = document.createElement('div');
        this._el.classList.add('tooltip');

        this._contentEl = document.createElement('div');
        this._contentEl.classList.add('tooltip__content');
        this._contentEl.textContent = text;
        this._el.appendChild(this._contentEl);

        this._arrowToDownEl = document.createElement('div');
        this._arrowToDownEl.classList.add('tooltip__arrow');
        this._arrowToDownEl.classList.add('tooltip__arrow--to-down');
        this._el.appendChild(this._arrowToDownEl);

        this._arrowToUpEl = document.createElement('div');
        this._arrowToUpEl.classList.add('tooltip__arrow');
        this._arrowToUpEl.classList.add('tooltip__arrow--to-up');
        this._el.appendChild(this._arrowToUpEl);

        document.body.appendChild(this._el);

        this._tooltipHideTimeoutHandle = null;
        this._isShown = true;
    }

    get el() {
        return this._el;
    }

    get isShown() {
        return this._isShown;
    }

    show() {
        clearTimeout(this._tooltipHideTimeoutHandle);
        this._el.classList.remove('tooltip--hidden');
        this._el.classList.remove('tooltip--shallow-hidden');
        this._isShown = true;
    }

    move(x, y) {
        const windowLeftX = document.body.scrollLeft;
        const windowRightX = document.body.scrollLeft + document.body.clientWidth;
        const windowTopY = document.body.scrollTop;
        const elWidth = this._el.offsetWidth;
        const elHeight = this._el.offsetHeight;
        const elMarginX = 4;
        const arrowWidth = 16;
        const arrowHeight = 8;
        const arrowMarginX = 4;
        const verticalSpace = 10;
        const doShowArrowToDown = y - windowTopY > elHeight + arrowHeight + verticalSpace;

        const elX = clamp(x - elWidth / 2, windowLeftX + elMarginX, windowRightX - elWidth - elMarginX);
        let elY;
        if (doShowArrowToDown) {
            elY = y - elHeight - arrowHeight - verticalSpace;
        } else {
            elY = y + arrowHeight + verticalSpace;
        }
        this._el.style.left = `${elX}px`;
        this._el.style.top = `${elY}px`;

        const arrowX = clamp(x - elX - arrowWidth / 2, arrowMarginX, elWidth - arrowWidth - arrowMarginX);
        const arrowToDownY = elHeight;
        const arrowToUpY = -arrowHeight;
        this._arrowToDownEl.style.left = `${arrowX}px`;
        this._arrowToDownEl.style.top = `${arrowToDownY}px`;
        this._arrowToDownEl.classList.toggle('hidden', !doShowArrowToDown);
        this._arrowToUpEl.style.left = `${arrowX}px`;
        this._arrowToUpEl.style.top = `${arrowToUpY}px`;
        this._arrowToUpEl.classList.toggle('hidden', doShowArrowToDown);
    }

    hide() {
        this._el.classList.add('tooltip--shallow-hidden');

        clearTimeout(this._tooltipHideTimeoutHandle);
        this._tooltipHideTimeoutHandle = setTimeout(() => this._el.classList.add('tooltip--hidden'), 200);

        this._isShown = false;
    }
}