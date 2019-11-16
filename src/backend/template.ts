import { IPage } from '../database/model/Page';

declare global {
  namespace NodeJS {
    interface Global {
      document: Document;
      window: Window;
      navigator: Navigator;
    }
  }
}


function getHeadBoilerplate() {
  return `<!DOCTYPE html><html lang="en"><head>${getGoogleAnalyticsTag()}`;
}

function getGoogleAnalyticsTag() {
  return `<!-- Global site tag (gtag.js) - Google Analytics -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=UA-152720975-1"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
  
    gtag('config', 'UA-152720975-1');
  </script>`
}

function setMetaTags(page: IPage) {
  return page.metas.map((meta) => {
    const {
      charset,
      content,
      httpEquiv,
      name,
    } = meta;
    return `<meta ${charset ? `charset="${charset}"` : ''} ${content ? `content="${content}"` : ''} ${httpEquiv ? `http-equiv="${httpEquiv}"` : ''} ${name ? `name="${name}"` : ''}/>`;
  }).join('');
}

function setDefaultMetaTags() {
  return '<meta charset="utf-8"/>';
}

function setStyleTag(css: string) {
  return `<style id="jss-server-side">${css}</style><link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />`;
}

function setTitleTag(page: IPage) {
  return `<title>${page.title}</title>`;
}

function setStaticTitleTag(title: string) {
  return `<title>${title}</title>`;
}

function getNormalizeStyle() {
  return `/* Document
    * ========================================================================== */
   
   /**
    * 1. Correct the line height in all browsers.
    * 2. Prevent adjustments of font size after orientation changes in
    *    IE on Windows Phone and in iOS.
    */
   
    html {
       line-height: 1.15; /* 1 */
       -ms-text-size-adjust: 100%; /* 2 */
       -webkit-text-size-adjust: 100%; /* 2 */
     }
    html, body {
        margin: 0;
        padding: 0;
    }
     
     h1 {
       font-size: 2em;
       margin: 0.67em 0;
     }
     
     /* Grouping content
      * ========================================================================== */
     
     /**
      * Remove the margin on nested lists in Chrome, Edge, IE, and Safari.
      */
     
     dl dl,
     dl ol,
     dl ul,
     ol dl,
     ul dl {
       margin: 0;
     }
     
     /**
      * Remove the margin on nested lists in Edge 18- and IE.
      */
     
     ol ol,
     ol ul,
     ul ol,
     ul ul {
       margin: 0;
     }
     
     /**
      * 1. Add the correct box sizing in Firefox.
      * 2. Show the overflow in Edge 18- and IE.
      */
     
     hr {
       box-sizing: content-box; /* 1 */
       height: 0; /* 1 */
       overflow: visible; /* 2 */
     }
     
     /**
      * Add the correct display in IE.
      */
     
     main {
       display: block;
     }
     
     pre {
       font-family: monospace, monospace; /* 1 */
       font-size: 1em; /* 2 */
     }
     
     /* Text-level semantics
      * ========================================================================== */
     
     /**
      * Remove the gray background on active links in IE 10.
      */
     
     a {
       background-color: transparent;
     }
     
     /**
      * Add the correct text decoration in Edge 18-, IE, and Safari.
      */
     
     abbr[title] {
       text-decoration: underline;
       text-decoration: underline dotted;
     }
     
     /**
      * Add the correct font weight in Chrome, Edge, and Safari.
      */
     
     b,
     strong {
       font-weight: bolder;
     }
     
     code,
     kbd,
     samp {
       font-family: monospace, monospace; /* 1 */
       font-size: 1em; /* 2 */
     }
     
     /**
      * Add the correct font size in all browsers.
      */
     
     small {
       font-size: 80%;
     }
     
     /* Embedded content
      * ========================================================================== */
     
     /**
      * Add the correct display in IE 9-.
      */
     
     audio,
     video {
       display: inline-block;
     }
     
     /**
      * Add the correct display in iOS 4-7.
      */
     
     audio:not([controls]) {
       display: none;
       height: 0;
     }
     
     /**
      * Remove the border on images within links in IE 10-.
      */
     
     img {
       border-style: none;
     }
     
     /**
      * Hide the overflow in IE.
      */
     
     svg:not(:root) {
       overflow: hidden;
     }
     
     /* Forms
      * ========================================================================== */
     
     /**
      * Remove the margin on controls in Safari.
      */
     
     button,
     input,
     select {
       margin: 0;
     }
     
     /**
      * 1. Show the overflow in IE.
      * 2. Remove the inheritance of text transform in Edge 18-, Firefox, and IE.
      */
     
     button {
       overflow: visible; /* 1 */
       text-transform: none; /* 2 */
     }
     
     /**
      * Correct the inability to style buttons in iOS and Safari.
      */
     
     button,
     [type="button"],
     [type="reset"],
     [type="submit"] {
       -webkit-appearance: button;
     }
     
     /**
      * Correct the padding in Firefox.
      */
     
     fieldset {
       padding: 0.35em 0.75em 0.625em;
     }
     
     /**
      * Show the overflow in Edge 18- and IE.
      */
     
     input {
       overflow: visible;
     }
     
     
     legend {
       box-sizing: border-box; /* 1 */
       color: inherit; /* 2 */
       display: table; /* 1 */
       max-width: 100%; /* 1 */
       white-space: normal; /* 1 */
     }
     
     /**
      * 1. Add the correct display in Edge 18- and IE.
      * 2. Add the correct vertical alignment in Chrome, Edge, and Firefox.
      */
     
     progress {
       display: inline-block; /* 1 */
       vertical-align: baseline; /* 2 */
     }
     
     /**
      * Remove the inheritance of text transform in Firefox.
      */
     
     select {
       text-transform: none;
     }
     
     /**
      * 1. Remove the margin in Firefox and Safari.
      * 2. Remove the default vertical scrollbar in IE.
      */
     
     textarea {
       margin: 0; /* 1 */
       overflow: auto; /* 2 */
     }
     
     /**
      * 1. Add the correct box sizing in IE 10-.
      * 2. Remove the padding in IE 10-.
      */
     
     [type="checkbox"],
     [type="radio"] {
       box-sizing: border-box; /* 1 */
       padding: 0; /* 2 */
     }
     
     /**
      * 1. Correct the odd appearance in Chrome, Edge, and Safari.
      * 2. Correct the outline style in Safari.
      */
     
     [type="search"] {
       -webkit-appearance: textfield; /* 1 */
       outline-offset: -2px; /* 2 */
     }
     
     /**
      * Correct the cursor style of increment and decrement buttons in Safari.
      */
     
     ::-webkit-inner-spin-button,
     ::-webkit-outer-spin-button {
       height: auto;
     }
     
     /**
      * Correct the text style of placeholders in Chrome, Edge, and Safari.
      */
     
     ::-webkit-input-placeholder {
       color: inherit;
       opacity: 0.54;
     }
     
     /**
      * Remove the inner padding in Chrome, Edge, and Safari on macOS.
      */
     
     ::-webkit-search-decoration {
       -webkit-appearance: none;
     }
     
     ::-webkit-file-upload-button {
       -webkit-appearance: button; /* 1 */
       font: inherit; /* 2 */
     }
     
     /**
      * Remove the inner border and padding of focus outlines in Firefox.
      */
     
     ::-moz-focus-inner {
       border-style: none;
       padding: 0;
     }
     
     /**
      * Restore the focus outline styles unset by the previous rule in Firefox.
      */
     
     :-moz-focusring {
       outline: 1px dotted ButtonText;
     }
     
     /**
      * Remove the additional :invalid styles in Firefox.
      */
     
     :-moz-ui-invalid {
       box-shadow: none;
     }
     
     /* Interactive
      * ========================================================================== */
     
     /*
      * Add the correct display in Edge 18- and IE.
      */
     
     details {
       display: block;
     }
     
     /*
      * Add the correct styles in Edge 18-, IE, and Safari.
      */
     
     dialog {
       background-color: white;
       border: solid;
       color: black;
       display: block;
       height: -moz-fit-content;
       height: -webkit-fit-content;
       height: fit-content;
       left: 0;
       margin: auto;
       padding: 1em;
       position: absolute;
       right: 0;
       width: -moz-fit-content;
       width: -webkit-fit-content;
       width: fit-content;
     }
     
     dialog:not([open]) {
       display: none;
     }
     
     /*
      * Add the correct display in all browsers.
      */
     
     summary {
       display: list-item;
     }
     
     /* Scripting
      * ========================================================================== */
     
     /**
      * Add the correct display in IE 9-.
      */
     
     canvas {
       display: inline-block;
     }
     
     /**
      * Add the correct display in IE.
      */
     
     template {
       display: none;
     }
     
     /* User interaction
      * ========================================================================== */
     
     /**
      * Add the correct display in IE 10-.
      */
     
     [hidden] {
       display: none;
     }`;
}

function getBodyBoilerplate() {
  return `<style>${getNormalizeStyle()}</style></head><body><div id="root"></div><script src="${process.env.API_URL}/static/bundle.js"></script></body></html>`;
}

async function getPageTemplate(page: IPage, css: string): Promise<string> {
  return `${getHeadBoilerplate()}${setMetaTags(page)}${setStyleTag(css)}${setTitleTag(page)}${getBodyBoilerplate()}`;
}

async function getPagelessTemplate(css: string): Promise<string> {
  return `${getHeadBoilerplate()}${setDefaultMetaTags()}${setStyleTag(css)}${setStaticTitleTag('Área administrativa')}${getBodyBoilerplate()}`;
}

export { getPageTemplate, getPagelessTemplate };
