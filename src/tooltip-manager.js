import Tooltip from './tooltip';

export default class TooltipManager {
    constructor() {
        this._tooltips = {};
    }

    register(rootEl) {
        rootEl.addEventListener('mouseover', (e) => {
            if (!e.target.hasAttribute('data-tooltip')) {
                return;
            }
            const tooltip = this._findOrCreateTooltipForEl(e.target);
            tooltip.show();
        });

        rootEl.addEventListener('mousemove', (e) => {
            if (!e.target.hasAttribute('data-tooltip')) {
                return;
            }
            const tooltip = this._findOrCreateTooltipForEl(e.target);
            if (!tooltip.isShown) {
                tooltip.show();
            }
            tooltip.move(e.pageX, e.pageY);
        });

        rootEl.addEventListener('mouseout', (e) => {
            if (!e.target.hasAttribute('data-tooltip')) {
                return;
            }
            const tooltip = this._findOrCreateTooltipForEl(e.target);
            tooltip.hide();
        });
    }

    getTooltip(id) {
        return this._tooltips[id];
    }

    _findOrCreateTooltipForEl(el) {
        let id = el.getAttribute('data-tooltip-js-id');
        if (!id) {
            id = this._createNewTooltip(el.getAttribute('data-tooltip'));
            el.setAttribute('data-tooltip-js-id', id);
        }
        return this.getTooltip(id);
    }

    _createNewTooltip(text) {
        const tooltip = new Tooltip(text);
        tooltip.hide();

        const id = this._generateNewTooltipId();
        this._tooltips[id] = tooltip;
        return id;
    }

    _generateNewTooltipId() {
        let id;
        do {
            id = Math.random().toString(16).slice(2);
        } while (this._tooltips.hasOwnProperty(id));
        return id;
    }
}