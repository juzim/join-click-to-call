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
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", 'https://joinjoaomgcd.appspot.com/_ah/api/messaging/v1/sendPush?deviceId=' + deviceId + '&callnumber=' + number + '&apikey=' + apiKey);
    xmlHttp.send( null );
};

(function() {
    'use strict';

    var nodes = document.querySelectorAll("a[href^='tel:']");
    for (let i = 0;i<nodes.length;i++){
        var number = nodes[i].href.slice(4);
        nodes[i].href = '#';
        nodes[0].removeAttribute("target");
        nodes[i].addEventListener('click', function(){placeCall(number);});
    }
        
    var googleNodes = document.querySelectorAll('[data-number]');
    for (let i = 0;i<googleNodes.length;i++){
        let number = googleNodes[i].getAttribute('data-number');
        googleNodes[i].href = '#';
        googleNodes[0].removeAttribute("target");

        googleNodes[i].addEventListener('click', function(){placeCall(number);});
    }
})();
