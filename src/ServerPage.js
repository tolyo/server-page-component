export class ServerPage extends HTMLElement {
  static observedAttributes = ['url', 'latch'];

  updateListener = () => {
    this.getContent();
  };

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
    this.url = this.url || this.getAttribute('url');
    if (!this.url) {
      throw new Error(`
      "url" attribute not supplied to server-page component.
      Example: <server-page url="/_foo"></server-page>
    `);
    }

    this.innerHTML = await (await fetch(this.url)).text();

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
export function triggerServerPage(id) {
  document.dispatchEvent(new Event(`partial:${id}`));
}
