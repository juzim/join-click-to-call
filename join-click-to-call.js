// ==UserScript==
// @name         Join Click-to-call
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Use join (https://joaoapps.com/join/) to handle click-to-call links
// @author       yeahbert
// @match      *://*/*
// ==/UserScript==


// these values can be found at https://joinjoaomgcd.appspot.com/
const deviceId = 'FOO';
const apiKey = 'BAR';

const placeCall = function (number) {
    if (!confirm('Call ' + number + '?')) {
      return;
    }
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", 'https://joinjoaomgcd.appspot.com/_ah/api/messaging/v1/sendPush?deviceId=' + deviceId + '&callnumber=' + number + '&apikey=' + apiKey);
    xmlHttp.send( null );
};

(function() {
    'use strict';

    var nodes = document.querySelectorAll("a[href^='tel:']");
    for (let i = 0;i<nodes.length;i++){
        let elem = nodes[i];
        let number = elem.href.slice(4);
        while(elem.attributes.length > 0)
            elem.removeAttribute(elem.attributes[0].name);
        elem.href = '#';
        elem.addEventListener('click', function(){placeCall(number);});
    }

    var googleNodes = document.querySelectorAll('[data-number]');
    for (let i = 0;i < googleNodes.length;i++){
        let elem = googleNodes[i];

        let number = elem.getAttribute('data-number');
        while(elem.attributes.length > 0)
            elem.removeAttribute(elem.attributes[0].name);
        elem.href = '#';

        elem.addEventListener('click', function(){placeCall(number);});
    }
})();
