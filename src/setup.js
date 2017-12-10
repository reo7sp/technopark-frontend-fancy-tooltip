import TooltipPool from './tooltip-pool';

export default function setup(rootEl) {
    const tooltipPool = new TooltipPool();

    rootEl.querySelectorAll('[data-tooltip]').forEach((el) => {
        const text = el.getAttribute('data-tooltip');
        const tooltip = tooltipPool.createNewTooltip(text);

        el.addEventListener('mouseenter', (e) => tooltip.show(e.pageX, e.pageY));
        el.addEventListener('mousemove', (e) => tooltip.move(e.pageX, e.pageY));
        el.addEventListener('mouseleave', () => tooltip.hide());
    });
}