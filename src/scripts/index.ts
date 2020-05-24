import { App } from './features/app';
import './sw';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';

document.addEventListener('DOMContentLoaded', () => {
  new App();
});

// Calculate place in localstorage
// if (navigator.storage && navigator.storage.estimate) {
//   const quota$: any = from(navigator.storage.estimate());
//   quota$
//     .pipe(
//       map((quota: any) => {
//         const percentageUsed = (quota.usage / quota.quota) * 100;
//         console.log(`You've used ${percentageUsed}% of the available storage.`);
//         const remaining = quota.quota - quota.usage;
//         console.log(`You can write up to ${remaining} more bytes.`);
//       })
//     )
//     .subscribe();
// }
