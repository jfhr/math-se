function loadCss() {
  let theme = new URLSearchParams(location.search).get('theme');
  let url = 'https://jfhr.de/assets';
  if (theme === 'dark') {
    // make it dark immediately to avoid white flash while css is loading
    document.addEventListener('load', () => document.body.style.background = "rgb(41,41,41)");
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
