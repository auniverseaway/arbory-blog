import { loadArea, setConfig } from './ak.js';

const hostnames = ['blog.arborydigital.com'];

const locales = {
  '/en': { lang: 'en' },
  '/de': { lang: 'de' },
  '/es': { lang: 'es' },
  '/fr': { lang: 'fr' },
  '/it': { lang: 'it' },
  '/ja': { lang: 'ja' },
  '/ko': { lang: 'ko' },
  '/zh-cn': { lang: 'zh-CN' },
  '/zh-tw': { lang: 'zh-TW' },
};

// Widget patterns to look for
const widgets = [
  { fragment: '/fragments/' },
  { schedule: '/schedules/' },
  { youtube: 'https://www.youtube' },
  { share: '/tools/widgets/share' },
  { 'article-list': '/tools/widgets/article-list' },
];

// Blocks with self-managed styles
const components = ['fragment', 'schedule'];

// How to decorate an area before loading it
const decorateArea = ({ area = document }) => {
  const eagerLoad = (parent, selector) => {
    const img = parent.querySelector(selector);
    if (!img) return;
    img.removeAttribute('loading');
    img.fetchPriority = 'high';
  };

  eagerLoad(area, 'img');
};

async function loadPage() {
  document.body.classList.add('dark-scheme');

  setConfig({ hostnames, locales, widgets, components, decorateArea });
  await loadArea();
}
await loadPage();

(function da() {
  const ref = new URL(window.location.href).searchParams.get('dapreview');
  if (ref) import('../tools/da/da.js').then((mod) => mod.default(loadPage));
}());
