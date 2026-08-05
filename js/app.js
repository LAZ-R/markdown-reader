import { marked } from "https://esm.sh/marked";
import DOMPurify from "https://esm.sh/dompurify";

const MAIN = document.getElementById('main');

MAIN.innerHTML = `
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

  <article id="markdown-reader" class="markdown-body" hidden></article>
`;

const dropZone = document.querySelector('#drop-zone');
const markdownInput = document.querySelector('#markdown-input');
const openFileButton = document.querySelector('#open-file-button');
const markdownReader = document.querySelector('#markdown-reader');

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

  markdownReader.innerHTML = safeHtml;

  dropZone.hidden = true;
  markdownReader.hidden = false;

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











