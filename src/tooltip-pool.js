import createTooltip from './tooltip-creator';
import Tooltip from './tooltip';

export default class TooltipPool {
    constructor() {
        this._tooltips = {};
    }

    createNewTooltip(text) {
        const id = this._generateNewTooltipId();

        const el = createTooltip(text);
        document.body.appendChild(el);

        const tooltip = new Tooltip(id, el);
        tooltip.hide();
        this._tooltips[id] = tooltip;
        return tooltip;
    }

    getTooltip(id) {
        return this._tooltips[id];
    }

    _generateNewTooltipId() {
        let id;
        do {
            id = Math.random().toString(16).slice(2);
        } while (this._tooltips.hasOwnProperty(id));
        return id;
    }
}