const VERSION = `0.0.1`;
const AUTHOR = `Pim de Wit`;

window.addEventListener('load', () => {
  const loader = document.querySelector('.loader');
  const loaderBar = document.querySelector('.loader__bar');

  loaderBar.style.transform = 'translateX(-95%)';

  getDependencies();
});

function getDependencies() {
  const polyfillScript = document.createElement('script');
  const font = document.createElement('link');
  const pdwApp = document.createElement('link');

  polyfillScript.src = 'bower_components/webcomponentsjs/webcomponents-loader.js';
  polyfillScript.async = true;

  font.rel = 'stylesheet';
  font.href = 'https://fonts.googleapis.com/css?family=Work+Sans:400';

  pdwApp.rel = 'import';
  pdwApp.href = 'src/pdw-app/pdw-app.html';

  document.head.appendChild(polyfillScript);
  document.head.appendChild(font);
  document.head.appendChild(pdwApp);
};