# Web Component for partials

Partial is a fragment of a web-page, loaded separately from the main content. This Web Component simplifies their use. It is based on Open Web Components defaults and recommendations. 

## Install

```bash
$ npm i server-page-component

```

or

```html
<script src="
    https://cdn.jsdelivr.net/npm/server-page-component/dist/server-page.umd.min.js
"></script>
```

## Usage

If using module imports:

```js
import 'server-page-component';
```

Then:

```html
# anywhere in your html
<server-page data-url="./cat.html"></server-page>
```

This will initiate an AJAX request to the address, specified in the `url` attribute, replacing the content of the component with received response. Modifying the `url` attribute will trigger a new request. If the `id` attribute is present, the component will use `window.document` as an event listener on `partial:#{id}` namespace. This allows partial content updates to be triggered from any part of your application. 

## Example 

```html
<server-page id="SPY" data-url="./stock?name=SPY"></server-page>

<script>
    document.dispatchEvent(new Event("partial:SPY"))                                                                                                                                                                         
</script>
```

Or use the helper `triggerServerPage`:

```js

import { triggerServerPage } from 'server-page-component';

triggerServerPage('SPY');

```

For updates from DOM without changing `url` attribute, a `latch` attribute 
can be set to any value and the component will react to any changes to it. Example:

```html
<server-page data-url="./cat.html" latch="0"></server-page>
```

Or wire it with a framework of choice:

```html
<div ng-app>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.8.2/angular.min.js"></script>
    <input type="text" ng-model="yourName" placeholder="Enter anything">
    <server-page id="1" url="./test.html" latch="{{ yourName }}"></server-page>
</div>
```
