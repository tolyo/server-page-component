# Web Component for partials

Partial is a fragment of a web-page, loaded separately from the main content. This Web Component simplifies their use. It is based on Open Web Components defaults and recommendations. 

## Install

```bash
$ npm i server-page-component

```

## Usage

```js
import 'server-page-component';
```

Then:

```html
# anywhere in your html
<server-page data-url="./cat.html"></server-page>
```

This will initiate an AJAX request to the specified address in the `data-url` attribute, replacing the content of the component with the received response. Modifying the `data-url` attribute will trigger a new request. If the id attribute is present, the component will use `window.document` as an event listener on `partial:#{id}` namespace. This allows partial content updates to be triggered from any part of your application.

## Example 

```html
<server-page id="SPY" data-url="./stock?name=SPY"></server-page>

# anywhere in your code
<script>
    document.dispatchEvent(new Event("partial:SPY"))                                                                                                                                                                         
</script>
```

Or use the helper `triggerServerPage`:

```js

import { triggerServerPage } from 'server-page-component';

triggerServerPage('SPY');

```
