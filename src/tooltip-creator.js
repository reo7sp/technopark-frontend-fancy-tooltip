export default function createTooltip(text) {
    const el = document.createElement('div');
    el.classList.add('tooltip');

    const contentEl = document.createElement('div');
    contentEl.classList.add('tooltip__content');
    contentEl.textContent = text;
    el.appendChild(contentEl);

    const arrowEl = document.createElement('div');
    arrowEl.classList.add('tooltip__arrow');
    el.appendChild(arrowEl);

    return el;
}