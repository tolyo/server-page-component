(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined'
    ? factory(exports)
    : typeof define === 'function' && define.amd
      ? define(['exports'], factory)
      : ((global =
          typeof globalThis !== 'undefined' ? globalThis : global || self),
        factory((global['server-page'] = {})));
})(this, function (exports) {
  'use strict';

  class ServerPage extends HTMLElement {
    static observedAttributes = ['data-url'];

    updateListener = () => this.getContent();

    connectedCallback() {
      if (this.getAttribute('id')) {
        window.document.addEventListener(
          `partial:${this.getAttribute('id')}`,
          this.updateListener,
        );
      }
    }

    attributeChangedCallback() {
      this.getContent();
    }

    disconnectedCallback() {
      if (this.getAttribute('id')) {
        window.document.removeEventListener(
          `partial:${this.getAttribute('id')}`,
          this.updateListener,
        );
      }
    }

    async getContent() {
      const { url } = this.dataset;
      if (!url) {
        throw new Error(`
      "url" data-attribute not supplied to partial component.
      Example: <partial-component data-url="/_foo"></partial-component>
    `);
      }
      this.innerHTML = await (await fetch(url)).text();

      // eslint-disable-next-line no-eval
      this.querySelectorAll('script').forEach(script => eval(script.text));
    }
  }

  /**
   * Triggers the partial with `id` to be reloaded
   *
   * @param {String} id
   * @returns
   */
  function triggerServerPage(id) {
    document.dispatchEvent(new Event(`partial:${id}`));
  }

  window.customElements.define('server-page', ServerPage);

  exports.ServerPage = ServerPage;
  exports.triggerServerPage = triggerServerPage;

  Object.defineProperty(exports, '__esModule', { value: true });
});
