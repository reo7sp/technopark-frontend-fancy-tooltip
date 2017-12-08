import TooltipPool from './tooltip-pool';

export default function setup(rootEl) {
    const tooltipPool = new TooltipPool();

    rootEl.querySelectorAll('[data-tooltip]').forEach((el) => {
        const text = el.getAttribute('data-tooltip');
        const tooltip = tooltipPool.createNewTooltip(text);

        el.addEventListener('mouseenter', () => tooltip.show(el.getBoundingClientRect()));
        el.addEventListener('mouseleave', () => tooltip.hide());
    });
}