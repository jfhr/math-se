/**
 * This file will be loaded and run synchronously on page load.
 * Use it to load required external styles and resources.
 */

function loadCss() {
  const theme = localStorage.getItem('theme');
  let url = '/assets';
  if (theme === 'dark') {
    url += '/darkly.bootstrap.min.css';
  } else {
    url += '/flatly.bootstrap.min.css';
  }
  const link = document.createElement('link');
  link.href = url;
  link.type = 'text/css';
  link.rel = 'stylesheet';
  link.media = 'screen,print';
  document.head.appendChild(link);
}

loadCss();
