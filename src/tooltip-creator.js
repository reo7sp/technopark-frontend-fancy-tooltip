export default function createTooltip(text) {
    const tooltipEl = document.createElement('div');
    tooltipEl.classList.add('tooltip');
    tooltipEl.textContent = text;
    return tooltipEl;
}