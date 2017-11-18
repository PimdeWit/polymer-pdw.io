class PdwApp extends Polymer.Element {

  static get is() {
    return 'pdw-app';
  }

  static get properties() {
    return {
      page: {
        type: String,
        reflectToAttribute: true,
        observer: '_pageChanged',
      },
      rootPattern: String,
      routeData: Object,
      subroute: String,
    };
  }

  static get observers() {
    return [
      '_routePageChanged(routeData.page)',
    ];
  }

  constructor() {
    super();

    Polymer.RenderStatus.afterNextRender(this, () => {
      this.rootPattern = (new URL(this.rootPath)).pathname;

      this.setAttribute('active', '');
    });
  }

  connectedCallback() {
    super.connectedCallback();
  }

  /**
   * Accessibility: Focus the main content, to skip the main navigation.
   * @private
   */
  _focusMainContent() {
    this.$.maincontent.focus();
  }

  /**
   *
   * @param {String} page
   * @private
   */
  _routePageChanged(page) {
    if (page === undefined) {
      return;
    }

    this.page = page || 'home';
  }

  /**
   * Request the page or go to the 404.
   * @param {String} page
   * @private
   */
  _pageChanged(page) {
    // Load page import on demand. Show 404 page if fails
    if (page === 'index.html') return;

    const resolvedPageUrl = this.resolveUrl('../pages/pdw-' + page + '.html');
    Polymer.importHref(
        resolvedPageUrl,
        null,
        this._showPage404.bind(this),
        true);
  }

  _showPage404() {
    this.page = '404';
  }
}

window.customElements.define(PdwApp.is, PdwApp);