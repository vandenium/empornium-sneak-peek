// ==UserScript==
// @name        Empornium Sneak Peek (ESP)
// @description Lazy loads title images on title list pages.
// @namespace   Empornium Scripts
// @version     1.4.0
// @author      vandenium
// @grant       none
// @include /^https://www\.empornium\.(me|sx|is)\/torrents.php*/
// @include /^https://www\.empornium\.(me|sx|is)\/top10.php*/
// @include /^https://www\.empornium\.(me|sx|is)\/requests.php*/
// @include /^https://www\.empornium\.(me|sx|is)\/notifications.php*/
// @include /^https://www\.empornium\.(me|sx|is)/collages\.php\?id.*/
// @include /^https://pornbay\.org/collages\.php\?id.*/
// @include /^https://pornbay\.org/torrents\.php.*/
// @include /^https://pornbay\.org/top10\.php.*/
// @include /^https://www.happyfappy\.org/collages\.php\?id.*/
// @include /^https://www.happyfappy\.org/torrents\.php.*/
// @include /^https://www.happyfappy\.org/top10\.php.*/
// @include /^https://www.homeporntorrents\.club/collages\.php\?id.*/
// @include /^https://www.homeporntorrents\.club/torrents\.php.*/
// @include /^https://www.homeporntorrents\.club/top10\.php.*/

// ==/UserScript==

// Changelog:
// Version 1.4.0
//  - Bugfix: Fix regex for pornbay.
// Version 1.3.2
//  - Enabling on Collage pages and other compatible sites.
// Version 1.3.1
//  - Bugfix: Fixed issue of images not displaying when hitting uncaught error.
// Version 1.3.0
//  - Bugfix: Now works with Modern Dark theme.
// Version 1.2.2
//  - Bugfix: Fix the cleanup of the img src URL.
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
  const urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
  const modernDarkThemeRunning = () => !!document.querySelector('table div.cover');

  const run = () => {
    // If modern dark theme running, replace div with background image with lazy-loaded image.
    if (modernDarkThemeRunning()) {
      const titles = Array.from(document.querySelectorAll('.torrent, #request_table .rowa, #request_table .rowb'));
      Array.from(document.querySelectorAll('div.cover')).forEach((el) => el.style.display = 'none');

      titles.forEach((title, i) => {
        title.querySelector('a.category_label').style.width = '99%';

        const imgDiv = title.querySelector('div.cover');
        const imgDivParent = imgDiv.parentNode;
        const imgArray = imgDiv.style.backgroundImage.match(urlRegex);

        if (imgArray) {
          const imgUrl = imgArray[0];
          // create image
          const titleImg = document.createElement('img');
          titleImg.src = imgUrl;
          titleImg.width = 250;
          titleImg.loading = 'lazy';

          // Replace div with lazy-loaded image.
          imgDiv.remove();
          imgDivParent.append(titleImg);
        }
      });
    } else {
      const titles = document.querySelectorAll('.torrent, #request_table .rowa, #request_table .rowb');
      const scripts = Array.from(document.querySelectorAll('script:not([src]):not([type])'))
        .filter((scriptEl) => scriptEl.firstChild.textContent.includes('var overlay'));

      titles.forEach((title, i) => {
        const titleImg = title.querySelector('img');
        titleImg.loading = 'lazy';

        const anchors = title.querySelectorAll('a');
        const titleLinkAnchor = anchors[2];
        const titleImageLink = anchors[0];

        const imgNode = document.querySelector('.leftOverlay img');
        let imgSrc;

        if (imgNode) {
          imgSrc = imgNode.src;
        } else {
          const script = scripts[i];
          const regex = window.location.href.includes('pornbay') ? /src=(.*?)(.=>)/ : /src=(\\".*\\")/g;
          const rawSrc = script.firstChild.textContent.match(regex)[0];
          imgSrc = rawSrc.substring(rawSrc.indexOf('=') + 1).replace(/\\"/g, '').replaceAll('\\/', '/');
        }

        if (imgSrc !== '') {
          titleImg.src = imgSrc;
          titleImg.width = 250;
          // Link image to torrent on the torrents page
          if (!window.location.href.includes('notify') && !window.location.href.includes('top10')) {
            if (typeof titleLinkAnchor !== 'undefined') {
              titleImageLink.href = titleLinkAnchor.href;
            }
          }
        }
      });
    }
  };

  run();
}());
