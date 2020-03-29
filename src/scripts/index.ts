import { App } from './features/app';
import './sw';

document.addEventListener('DOMContentLoaded', () => {
  new App();
});
