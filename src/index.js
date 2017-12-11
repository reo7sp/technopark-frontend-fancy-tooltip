import './global.css'
import './tooltip.css'

import TooltipManager from './tooltip-manager';

window.onload = () => {
    const manager = new TooltipManager();
    manager.register(document.getElementById('app'));
};