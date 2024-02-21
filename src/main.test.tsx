
// Add the root div (which is sought in main.tsx).
// This must happen before the main import.
const root = document.createElement('div');
root.id = 'root';
document.body.appendChild(root);

import './main';

test('main imports', () => {
    // If we got this far, call it a success.
});
