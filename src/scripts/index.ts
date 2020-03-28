import '../stylesheets/index.scss';

import { Base64 } from './features/app';
import './sw';

document.addEventListener('DOMContentLoaded', () => {
  new Base64();
});
