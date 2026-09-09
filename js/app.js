import { marked } from "https://esm.sh/marked";
import DOMPurify from "https://esm.sh/dompurify";
import hljs from 'https://esm.sh/highlight.js';

const MAIN = document.getElementById('main');

MAIN.innerHTML = `
  <div id="intro">
    <h1>Welcome to Markdown Reader</h1>
    <p>
      The simple way to read your .md files.
    </p>
    <h2>Key features</h2>
    <ul>
      <li>No login required</li>
      <li>Open local .md and .markdown files by picker or drag and drop</li>
      <li>Export to PDF</li>
      <li>No server upload of your markdown files</li>
    </ul>
  </div>
  <section id="drop-zone" class="drop-zone">
    <input
      id="markdown-input"
      type="file"
      accept=".md,.markdown,text/markdown,text/plain"
      hidden
    >

    <button id="open-file-button" type="button">
      Ouvrir un fichier Markdown
    </button>

    <p>ou déposez un fichier .md ici</p>
  </section>

  <article id="markdown-body" class="markdown-body" hidden></article>
`;

const intro = document.querySelector('#intro');
const markdownBody = document.querySelector('#markdown-body');
const floatingMenu = document.querySelector('#floating-menu');
const toggleFloatingMenu = document.querySelector('#toggle-floating-menu');
const loadNewMarkdown = document.querySelector('#load-new-markdown');
const exportToPdf = document.querySelector('#export-to-pdf');
const themesManager = document.querySelector('#themes-manager');
const themesContainer = document.getElementById('themes-container');
const theme1Button = document.querySelector('#theme-1');
const theme2Button = document.querySelector('#theme-2');
const theme3Button = document.querySelector('#theme-3');

const dropZone = document.querySelector('#drop-zone');
const markdownInput = document.querySelector('#markdown-input');
const openFileButton = document.querySelector('#open-file-button');

marked.setOptions({
  gfm: true,
  breaks: false,
});

openFileButton.addEventListener('click', () => {
  markdownInput.click();
});

markdownInput.addEventListener('change', event => {
  const [file] = event.target.files;

  if (file) {
    openMarkdownFile(file);
  }
});

function setupTheme(theme) {
  document.getElementById('body').classList.toggle('default', theme == 'default');
  document.getElementById('body').classList.toggle('dark', theme == 'dark');
  document.getElementById('body').classList.toggle('book', theme == 'book');
}

toggleFloatingMenu.addEventListener('click', event => {
  floatingMenu.classList.toggle('closed', !floatingMenu.classList.contains('closed'));
});
themesManager.addEventListener('click', event => {
  themesContainer.classList.toggle('closed', !themesContainer.classList.contains('closed'));
});
theme1Button.addEventListener('click', event => {
  setupTheme('default')
});
theme2Button.addEventListener('click', event => {
  setupTheme('dark')
});
theme3Button.addEventListener('click', event => {
  setupTheme('book')
});

loadNewMarkdown.addEventListener('click', event => {
  window.location = window.location;
});
exportToPdf.addEventListener('click', event => {
  floatingMenu.classList.add('hidden');
  MAIN.classList.remove('main');
  markdownBody.classList.add('a4-page');

  window.print();

  setTimeout(() => {
    floatingMenu.classList.remove('hidden');
    MAIN.classList.add('main');
    markdownBody.classList.remove('a4-page');
    themesContainer.classList.toggle('closed', !themesContainer.classList.contains('closed'));
    floatingMenu.classList.add('closed');
  }, 200);
});

dropZone.addEventListener('dragover', event => {
  event.preventDefault();
  dropZone.classList.add('is-dragged-over');
});

dropZone.addEventListener('dragleave', () => {
  dropZone.classList.remove('is-dragged-over');
});

dropZone.addEventListener('drop', event => {
  event.preventDefault();
  dropZone.classList.remove('is-dragged-over');

  const [file] = event.dataTransfer.files;

  if (file) {
    openMarkdownFile(file);
  }
});

async function openMarkdownFile(file) {
  if (!isMarkdownFile(file)) {
    window.alert('Le fichier sélectionné ne semble pas être un fichier Markdown.');
    return;
  }

  const markdown = await file.text();
  const rawHtml = await marked.parse(normalizeMarkdown(markdown));
  const safeHtml = DOMPurify.sanitize(rawHtml);

  markdownBody.innerHTML = safeHtml;

  markdownBody.querySelectorAll('pre code').forEach(codeBlock => {
    hljs.highlightElement(codeBlock);
  });

  intro.hidden = true;
  dropZone.hidden = true;
  markdownBody.hidden = false;
  floatingMenu.classList.remove('hidden');

  document.title = file.name.replace(/\.(md|markdown)$/i, '');
}

function isMarkdownFile(file) {
  const fileName = file.name.toLowerCase();

  return (
    fileName.endsWith('.md') ||
    fileName.endsWith('.markdown') ||
    file.type === 'text/markdown' ||
    file.type === 'text/plain'
  );
}

function normalizeMarkdown(markdown) {
  return markdown
    .replace(/^\uFEFF/, '')
    .replaceAll('\r\n', '\n')
    .replaceAll('\r', '\n');
}











