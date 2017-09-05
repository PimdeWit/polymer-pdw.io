window.addEventListener('load', () => {
  const polyfillScript = document.createElement('script');
  polyfillScript.src = 'bower_components/webcomponentsjs/webcomponents-loader.js';
  polyfillScript.async = true;

  document.head.appendChild(polyfillScript);

  const font = document.createElement('link');
  font.rel = 'stylesheet';
  font.href = 'https://fonts.googleapis.com/css?family=Work+Sans:400';

  const pdwApp = document.createElement('link');
  pdwApp.rel = 'import';
  pdwApp.href = 'src/pdw-app/pdw-app.html';

  document.head.appendChild(pdwApp);
  document.head.appendChild(font);
});
