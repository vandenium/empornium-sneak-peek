// ==UserScript==
// @name        Empornium Sneak Peek (ESP)
// @description Lazy loads title images on title list pages.
// @namespace   Empornium Scripts
// @version     1.0.1
// @author      vandenium
// @grant       none

// ---
// @match https://*.empornium.me/torrents.php*
// @match https://*.empornium.me/top10.php*
// ---
// @match https://*.empornium.is/torrents.php*
// @match https://*.empornium.is/top10.php*
// ---
// @match https://*.empornium.sx/torrents.php*
// @match https://*.empornium.sx/top10.php*

// ==/UserScript==

// Changelog:
// Version 1.0.1
//  - Fix Brave issue.
// Version 1.0.0
//  - The initial version.
// Todo:
//  - Fix requests.
//  - Fix Top 10 image link

(function() {

console.log('ESP Starting...');

const run = () => {
  const titles = document.querySelectorAll('.torrent');
  const scripts = document.querySelectorAll('script:not([src]):not([type])');

  titles.forEach( (title, i) => {
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
        const index = !!window.navigator.brave ? i + 1 : i; // if Brave, need to shift by 1.
        const script = scripts[index];
        const regex = /src=(\\".*\\")/g;
        const rawSrc = script.firstChild.textContent.match(regex)[0];
        imgSrc = rawSrc.replace(/\\\//g, "/").replace(/\\/g, '').split('src=')[1].replace(/\"/g, '');
    }

    titleImg.src = imgSrc;
    titleImg.width = 150;
    titleImageLink.href = titleLinkAnchor.href;
  })
}

run();
})();
