import '../stylesheets/index.scss';

import { Base64 } from './base64';
import './sw';

document.addEventListener('DOMContentLoaded', () => {
  new Base64();
});
