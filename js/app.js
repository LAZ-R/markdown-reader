import { marked } from "https://esm.sh/marked";
import DOMPurify from "https://esm.sh/dompurify";
import hljs from 'https://esm.sh/highlight.js';

initFileHandler();

const MAIN = document.getElementById('main');

function initFileHandler() {
  if (!('launchQueue' in window)) {
    return;
  }

  window.launchQueue.setConsumer(async launchParams => {
    const [fileHandle] = launchParams.files;

    if (!fileHandle) {
      return;
    }

    const file = await fileHandle.getFile();

    await openMarkdownFile(file);
  });
}

const navigation = document.querySelector('#navigation');
const introPage = document.querySelector('#introPage');
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
  themesContainer.classList.add('closed');
});
themesManager.addEventListener('click', event => {
  themesContainer.classList.toggle('closed', !themesContainer.classList.contains('closed'));
});
theme1Button.addEventListener('click', event => {
  setupTheme('default');
  /* themesContainer.classList.add('closed'); */
});
theme2Button.addEventListener('click', event => {
  setupTheme('dark');
  /* themesContainer.classList.add('closed'); */
});
theme3Button.addEventListener('click', event => {
  setupTheme('book');
  /* themesContainer.classList.add('closed'); */
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

  const children = markdownBody.children;

  let h1_count = 0;
  let h2_count = 0;
  let h3_count = 0;
  let h4_count = 0;
  let h5_count = 0;
  let h6_count = 0;

  const HIERARCHY = [];

  for (let child of children) {
    /* console.log(child.nodeName); */
    if (child.nodeName == 'H1') {
      h1_count ++;
      const id = `h1_${h1_count}`;
      child.setAttribute('id', id);
      const object = {
        name: child.innerHTML,
        id: id,
        children: [],
      };
      HIERARCHY.push(object);
    }

    if (child.nodeName == 'H2') {
      h2_count ++;
      const id = `h2_${h2_count}`;
      child.setAttribute('id', id);
      const object = {
        name: child.innerHTML,
        id: id,
        children: [],
      };
      const lastH1 = HIERARCHY[HIERARCHY.length - 1];
      lastH1.children.push(object);
    }

    if (child.nodeName == 'H3') {
      h3_count ++;
      const id = `h3_${h3_count}`;
      child.setAttribute('id', id);
      const object = {
        name: child.innerHTML,
        id: id,
        children: [],
      };
      const lastH1 = HIERARCHY[HIERARCHY.length - 1];
      const lastH2 = lastH1.children[lastH1.children.length - 1];
      lastH2.children.push(object);
    }

    if (child.nodeName == 'H4') {
      h4_count ++;
      const id = `h4_${h4_count}`;
      child.setAttribute('id', id);
      const object = {
        name: child.innerHTML,
        id: id,
        children: [],
      };
      const lastH1 = HIERARCHY[HIERARCHY.length - 1];
      const lastH2 = lastH1.children[lastH1.children.length - 1];
      const lastH3 = lastH2.children[lastH2.children.length - 1];
      lastH3.children.push(object);
    }

    if (child.nodeName == 'H5') {
      h5_count ++;
      const id = `h5_${h5_count}`;
      child.setAttribute('id', id);
      const object = {
        name: child.innerHTML,
        id: id,
        children: [],
      };
      const lastH1 = HIERARCHY[HIERARCHY.length - 1];
      const lastH2 = lastH1.children[lastH1.children.length - 1];
      const lastH3 = lastH2.children[lastH2.children.length - 1];
      const lastH4 = lastH3.children[lastH3.children.length - 1];
      lastH4.children.push(object);
    }

    if (child.nodeName == 'H6') {
      h6_count ++;
      const id = `h6_${h6_count}`;
      child.setAttribute('id', id);
      const object = {
        name: child.innerHTML,
        id: id,
        children: [],
      };
      const lastH1 = HIERARCHY[HIERARCHY.length - 1];
      const lastH2 = lastH1.children[lastH1.children.length - 1];
      const lastH3 = lastH2.children[lastH2.children.length - 1];
      const lastH4 = lastH3.children[lastH3.children.length - 1];
      const lastH5 = lastH4.children[lastH4.children.length - 1];
      lastH5.children.push(object);
    }
  }

  //console.table(HIERARCHY);

  // Set hierarchy as nav
  function getLinkObjectDom(object) {
    return `
      <li>
        <a href="#${object.id}" class="${object.id[0]}${object.id[1]}">${object.name}</a>
        ${object.children.length != 0 ? `<ul>${getLinkObjectChildrenDom(object)}</ul>` : ''}
      </li>
    `;
  }

  function getLinkObjectChildrenDom(object) {
    let str = ``;
    for (let child of object.children) {
      str += getLinkObjectDom(child);
    }
    return str;
  }

  function getNavDom() {
    let str = `<ul>`;
    for (let h1 of HIERARCHY) {
      str += getLinkObjectDom(h1);
    }
    str += `</ul>`;
    return str;
  }

  navigation.classList.remove('hidden');
  navigation.innerHTML = getNavDom();
  introPage.hidden = true;
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











