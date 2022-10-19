// ==UserScript==
// @name        Empornium Sneak Peek (ESP)
// @description Lazy loads title images on title list pages.
// @icon        data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PgogICAgICAgIDwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgCiAgICAgICAgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+IDxzdmcgc3R5bGU9ImNvbG9yOiB3aGl0ZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIGZpbGw9ImN1cnJlbnRDb2xvciIgY2xhc3M9ImJpIGJpLWV5ZSIgdmlld0JveD0iMCAwIDE2IDE2Ij4gPHBhdGggZD0iTTE2IDhzLTMtNS41LTgtNS41UzAgOCAwIDhzMyA1LjUgOCA1LjVTMTYgOCAxNiA4ek0xLjE3MyA4YTEzLjEzMyAxMy4xMzMgMCAwIDEgMS42Ni0yLjA0M0M0LjEyIDQuNjY4IDUuODggMy41IDggMy41YzIuMTIgMCAzLjg3OSAxLjE2OCA1LjE2OCAyLjQ1N0ExMy4xMzMgMTMuMTMzIDAgMCAxIDE0LjgyOCA4Yy0uMDU4LjA4Ny0uMTIyLjE4My0uMTk1LjI4OC0uMzM1LjQ4LS44MyAxLjEyLTEuNDY1IDEuNzU1QzExLjg3OSAxMS4zMzIgMTAuMTE5IDEyLjUgOCAxMi41Yy0yLjEyIDAtMy44NzktMS4xNjgtNS4xNjgtMi40NTdBMTMuMTM0IDEzLjEzNCAwIDAgMSAxLjE3MiA4eiIgZmlsbD0id2hpdGUiPjwvcGF0aD4gPHBhdGggZD0iTTggNS41YTIuNSAyLjUgMCAxIDAgMCA1IDIuNSAyLjUgMCAwIDAgMC01ek00LjUgOGEzLjUgMy41IDAgMSAxIDcgMCAzLjUgMy41IDAgMCAxLTcgMHoiIGZpbGw9IndoaXRlIj48L3BhdGg+IDwvc3ZnPiA=
// @namespace   Empornium Scripts
// @version     1.4.8
// @author      vandenium
// @grant       none
// @include /^https://www\.empornium\.(me|sx|is)/torrents.php*/
// @exclude /^https://www\.empornium\.(me|sx|is)/torrents\.php\?id.*/
// @include /^https://www\.empornium\.(me|sx|is)/top10.php*/
// @include /^https://www\.empornium\.(me|sx|is)/collages\.php\?.*/
// @include /^https://www\.empornium\.(me|sx|is)/requests.php*/
// @include /^https://www\.empornium\.(me|sx|is)/notifications.php*/
// @include /^https://www\.enthralled\.me/torrents.php*/
// @exclude /^https://www\.enthralled\.me/torrents\.php\?id.*/
// @include /^https://www\.enthralled\.me/top10.php*/
// @include /^https://www\.enthralled\.me/collages\.php\?.*/
// @include /^https://www\.enthralled\.me/requests.php*/
// @include /^https://www\.enthralled\.me/notifications.php*/
// @include /^https://pornbay\.org/torrents\.php.*/
// @exclude /^https://pornbay\.org/torrents\.php\?id.*/
// @include /^https://pornbay\.org/top10\.php.*/
// @include /^https://pornbay\.org/collages\.php\?.*/
// @include /^https://pornbay\.org/requests\.php.*/
// @include /^https://femdomcult\.org/torrents.php*/
// @exclude /^https://femdomcult\.org/torrents\.php\?id.*/
// @include /^https://femdomcult\.org/top10.php*/
// @include /^https://femdomcult\.org/collages\.php\?.*/
// @include /^https://femdomcult\.org/requests.php*/
// @include /^https://www.happyfappy\.org/torrents\.php.*/
// @exclude /^https://www.happyfappy\.org/torrents\.php\?id.*/
// @include /^https://www.happyfappy\.org/top10\.php.*/
// @include /^https://www.happyfappy\.org/collages\.php\?.*/
// @include /^https://www.happyfappy\.org/requests\.php.*/
// @include /^https://www.homeporntorrents\.club/torrents\.php.*/
// @exclude /^https://www.homeporntorrents\.club/torrents\.php\?id.*/
// @include /^https://www.homeporntorrents\.club/top10\.php.*/
// @include /^https://www.homeporntorrents\.club/collages\.php\?.*/
// @include /^https://www.homeporntorrents\.club/requests\.php.*/
// @include /^https://kufirc\.com/torrents.php*/
// @exclude /^https://kufirc\.com/torrents\.php\?id.*/
// @include /^https://kufirc\.com/top10.php*/
// @include /^https://kufirc\.com/collages\.php\?.*/
// @include /^https://kufirc\.com/requests.php*/
// @include /^https://kufirc\.com/notifications.php*/
// ==/UserScript==

// Changelog:
// Version 1.4.8
//  - Set LAZY_LOAD to default to true.
// Version 1.4.7
//  - Add HQ_IMAGES to switch loading full size images ON/OFF
//  - Add Kufirc
//  - Add @icon to script
// Version 1.4.6
//  - Add femdomcult
// Version 1.4.5
//  - Bugfix: Fix issue with parsing image links
//  - Add enthralled
//  - Add @exclude rules
//  - Add LAZY_LOAD to switch lazy loading ON/OFF
// Version 1.4.4
//  - Remove hardcoded image width of 250px, update to respect TITLE_IMAGE_WIDTH contant.
// Version 1.4.3
//  - Bugfix: Fix issue of not working on collage pages when updating sorting order.
// Version 1.4.2
//  - Bugfix: Fix issue of not displaying image on collage pages > 1.
// Version 1.4.1
//  - Bugfix: Fix requests page link to request, not category.
//  - Bugfix: On PB, ensure the overlay exists.
//  - Bugfix: Fix links on Collages and Top 10.
// Version 1.4.0
//  - Bugfix: Fix regex for pornbay and homeporntorrents. Add requests URLs.
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

(function main() {
  const TITLE_IMAGE_WIDTH = 250;    // Pixels (preferred image size)
  const HQ_IMAGES = false;          // Bool (obtain full img if possible)
  const LAZY_LOAD = true;          // Bool (load images when you see them)

  const urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/;
  const modernDarkThemeRunning = () => !!document.querySelector('table div.cover');

  const run = () => {
    // If modern dark theme running, replace div with background image with lazy-loaded image
    if (modernDarkThemeRunning()) {
      const titles = Array.from(document.querySelectorAll('.torrent, #request_table .rowa, #request_table .rowb'));
      Array.from(document.querySelectorAll('div.cover')).forEach((el) => (el.style.display = 'none'));

      titles.forEach((title) => {
        title.querySelector('a.category_label').style.width = '99%';

        const imgDiv = title.querySelector('div.cover');
        const imgDivParent = imgDiv.parentNode;
        const imgArray = imgDiv.style.backgroundImage.match(urlRegex);

        if (imgArray) {
          const imgUrl = imgArray[0];
          // Create image
          const titleImg = document.createElement('img');
          titleImg.src = imgUrl;
          titleImg.width = TITLE_IMAGE_WIDTH;
          titleImg.loading = LAZY_LOAD ? 'lazy' : 'eager';
          // Replace div with lazy-loaded image
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
        titleImg.loading = LAZY_LOAD ? 'lazy' : 'eager';

        const anchors = window.location.href.search(/requests/) > -1
            ? title.querySelectorAll('a[href*="requests.php?action=view&id="]')
            : title.querySelectorAll('a[href*="torrents.php?id="]');
        const titleLinkAnchor = anchors[0];

        const imgNode = document.querySelector('.leftOverlay img');
        let imgSrc;

        if (imgNode) {
          imgSrc = imgNode.src;
        } else {
          const script = scripts[i];
          if (script) {
            const regex = window.location.href.search(/pornbay|femdomcult|homeporntorrents/) > -1
                ? /src=(.*?)(?=>)/: /src=(\\".*\\")/g;
            const rawSrc = script.firstChild.textContent.match(regex)[0];
            imgSrc = rawSrc
                .substring(rawSrc.indexOf('=') + 1)
                .replace(/\\"/g, '')
                .replaceAll('\\/', '/')
                .replaceAll('&brvbar;', '%C2%A6');
          }
        }

        if (imgSrc) {
          if (HQ_IMAGES && ['jerking.empornium.ph', 'fapping.empornium.sx'].some(imgHost => imgSrc.includes(imgHost)) ) {
            imgSrc = imgSrc.replace(/\/resize\/[0-9]+/, "");
          }
          titleImg.src = imgSrc;
          titleImg.width = TITLE_IMAGE_WIDTH;
          // Link image to torrent on the torrents page
          if (!window.location.href.includes('notify')) {
            if (titleImg.parentElement.nodeName.toLowerCase() !== 'a'
                && (typeof titleLinkAnchor).toLowerCase() === 'object'
                && titleLinkAnchor.href !== undefined) {
              // The Image doesn't have an <a>
              const linkElem = document.createElement('a');
              linkElem.setAttribute('href', titleLinkAnchor.href);
              titleImg.parentNode.replaceChild(linkElem, titleImg);
              linkElem.appendChild(titleImg);
            } else if ((typeof titleLinkAnchor).toLowerCase() === 'object' && titleLinkAnchor.href !== undefined) {
              titleImg.parentNode.setAttribute('href', titleLinkAnchor.href);
            }
          }
        }
      });
    }
  };

  run();
}());
