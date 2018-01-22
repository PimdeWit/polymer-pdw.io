const LOADER_CONTAINER = document.querySelector('.loader-container');
const LOADER_BAR = document.querySelector('.loader__bar');

/**
 * @author Pim de Wit / https://pdw.io
 * @desc The application shell.
 * @class
 */
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

      menuOpened: {
        type: Boolean,
        value: false
      }
    };
  }

  static get observers() {
    return [
      '_routePageChanged(routeData.page)',
    ];
  }

  constructor() {
    super();

    // this.$.revealer.setAttribute('aria-hidden', true);
    LOADER_BAR.style.transform = 'transformX(-10%)';

  }

  connectedCallback() {
    super.connectedCallback();

    this.rootPattern = (new URL(this.rootPath)).pathname;
    LOADER_BAR.style.transform = 'none';

    setTimeout(() => {
      LOADER_CONTAINER.classList.add('loaded');

      setTimeout(() => {
        LOADER_CONTAINER.parentNode.removeChild(LOADER_CONTAINER);
      }, 2000);
    }, 200);
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

  /** Menu */

  openMenu() {
    this.$.menu.removeAttribute('aria-hidden');
    this.$.menutoggle.setAttribute('opened', true);
    this.menuOpened = true;
  }

  closeMenu() {
    this.$.menu.setAttribute('aria-hidden', true);
    this.$.menutoggle.removeAttribute('opened');
    this.menuOpened = false;
  }

  toggleMenu() {
    this.menuOpened ? this.closeMenu() : this.openMenu();
  }
}

window.customElements.define(PdwApp.is, PdwApp);