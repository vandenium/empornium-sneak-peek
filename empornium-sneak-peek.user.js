// ==UserScript==
// @name        Empornium Sneak Peek (ESP)
// @description Lazy loads title images on title list pages.
// @namespace   Empornium Scripts
// @version     1.2.0
// @author      vandenium
// @grant       none
// @include /^https://www\.empornium\.(me|sx|is)\/torrents.php*/
// @include /^https://www\.empornium\.(me|sx|is)\/top10.php*/
// @include /^https://www\.empornium\.(me|sx|is)\/requests.php*/
// @include /^https://www\.empornium\.(me|sx|is)\/notifications.php*/
// ==/UserScript==

// Changelog:
// Version 1.2.1
//  - Bugfix: Fix same issue as in 1.2.0 for Top 10 page.
// Version 1.2.0
//  - Bugfix: Fix broken Download Torrent link on Notifications page.
//  - Enable for Notifications page.
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
    const scripts = Array.from(document.querySelectorAll('script:not([src]):not([type])'))
      .filter(scriptEl => scriptEl.firstChild.textContent.includes('var overlay'));

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
        imgSrc = rawSrc.substring(rawSrc.indexOf('=') + 1).replace(/\\"/g, '').replaceAll('\\/', '/');
      }

      if (imgSrc !== '') {
        titleImg.src = imgSrc;
        titleImg.width = 150;
        // Link image to torrent on the torrents page
        if (!window.location.href.includes('notify') && !window.location.href.includes('top10')) {
          titleImageLink.href = titleLinkAnchor.href;
        }
        
      }
    })
  }

  run();
})();
