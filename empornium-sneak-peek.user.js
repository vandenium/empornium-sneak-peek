// ==UserScript==
// @name        Empornium Sneak Peek (ESP)
// @description Lazy loads title images on title list pages.
// @namespace   Empornium Scripts
// @version     1.1.0
// @author      vandenium
// @grant       none
// @include /^https://www\.empornium\.(me|sx|is)\/torrents.php*/
// @include /^https://www\.empornium\.(me|sx|is)\/top10.php*/
// @include /^https://www\.empornium\.(me|sx|is)\/requests.php*/
// ==/UserScript==

// Changelog:
// Version 1.1.0
//  - Update @match/@include, now works for requests page.
//  - Simplify img src parse.
//  - Only insert image if one is found.
//  - Filter scripts with images up front.
// Version 1.0.1
//  - Fix Brave issue.
// Version 1.0.0
//  - The initial version.
// Todo:

(function () {

  console.log('ESP Starting...');

  const run = () => {
    const titles = document.querySelectorAll('.torrent, #request_table .rowa, #request_table .rowb');
    const scripts = Array.from(document.querySelectorAll('script:not([src]):not([type])')).filter(scriptEl => scriptEl.firstChild.textContent.includes('var overlay'));

    titles.forEach((title, i) => {
      const titleImg = title.querySelector('img');
      titleImg.loading = 'lazy';

      const anchors = title.querySelectorAll('a');
      const titleLinkAnchor = anchors[2];
      const titleImageLink = anchors[0];

      const imgNode = document.querySelector('.leftOverlay img')
      let imgSrc;

      if (imgNode) {
        imgSrc = imgNode.src;
      } else {
        const script = scripts[i];
        const regex = /src=(\\".*\\")/g;
        const rawSrc = script.firstChild.textContent.match(regex)[0];
        imgSrc = rawSrc.split('=')[1].replace(/\\"/g, '');
      }

      if (imgSrc !== '') {
        titleImg.src = imgSrc;
        titleImg.width = 150;
        titleImageLink.href = titleLinkAnchor.href;
      }
    })
  }

  run();
})();