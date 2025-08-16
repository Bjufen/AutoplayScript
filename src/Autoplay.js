// ==UserScript==
// @name            Autoplayer
// @namespace       https://github.com/Bjufen
// @version         0.1
// @description     Autoplayer for https://iwatchsouthparkonline.cc
// @match           *://*.iwatchsouthparkonline.cc/*
// @match           *://vidmoly.net/*
// @match           *://*.vidmoly.net/*
// @grant           none
// @license         MIT
// ==/UserScript==

(function() {
    'use strict';

    // This function will try to find the video player.
    // We use setInterval to repeatedly check until the player is loaded.
    const findVideoInterval = setInterval(() => {
        // --- 1. FIND THE VIDEO ELEMENT ---
        // The selector is correct for the JW Player.
        const videoPlayer = document.querySelector('video.jw-video');

        // If the player is found, we can set it up.
        if (videoPlayer) {
            // Stop checking for the video player once we've found it.
            clearInterval(findVideoInterval);
            console.log('Autoplayer: Video player found!', videoPlayer);
            setupVideoPlayer(videoPlayer);
        } else {
            console.log('Autoplayer: Searching for video player...');
        }
    }, 1000); // Check every 1 second (1000 milliseconds)

    // This function sets up all the event listeners and buttons.
    function setupVideoPlayer(videoPlayer) {
        // --- 2. DETECT WHEN THE VIDEO ENDS ---
        videoPlayer.addEventListener('ended', () => {
            console.log('Autoplayer: Video has finished playing!');
            // You can add code here to automatically go to the next episode,
            // but for now, an alert is a good test.
            alert('The video has ended!');
        });

        // --- 3. CREATE A FULLSCREEN TOGGLE BUTTON ---
        // Let's create a new button element
        const fullscreenButton = document.createElement('button');
        fullscreenButton.textContent = 'Toggle Fullscreen';

        // Style the button so it's visible and doesn't interfere with the page
        Object.assign(fullscreenButton.style, {
            position: 'fixed',    // Keep it in a fixed position on the screen
            bottom: '10px',       // 10px from the bottom
            right: '10px',        // 10px from the right
            zIndex: '99999',      // Make sure it's on top of all other elements
            padding: '10px 15px',
            backgroundColor: '#1E90FF', // A nice blue color
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '14px',
            boxShadow: '0 2px 5px rgba(0,0,0,0.2)' // Add a subtle shadow
        });

        // Add the button to the webpage's body
        document.body.appendChild(fullscreenButton);

        // --- 4. ADD FUNCTIONALITY TO THE BUTTON ---
        fullscreenButton.addEventListener('click', () => {
            toggleFullscreen(videoPlayer);
        });
    }

    // This function handles the logic for entering and exiting fullscreen
    function toggleFullscreen(element) {
        if (!document.fullscreenElement) {
            // If not in fullscreen, request it for the video player element
            console.log('Autoplayer: Entering fullscreen.');
            element.requestFullscreen().catch(err => {
                console.error(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
            });
        } else {
            // If already in fullscreen, exit
            console.log('Autoplayer: Exiting fullscreen.');
            document.exitFullscreen();
        }
    }

})();
