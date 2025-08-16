// ==UserScript==
// @name            Autoplayer
// @namespace       https://github.com/Bjufen
// @version         0.1
// @description     Autoplayer for https://iwatchsouthparkonline.cc
// @match           *://*.iwatchsouthparkonline.cc/*
// @grant           none
// ==/UserScript==

(function() {
    'use strict';

    // We'll wait a moment for the page and player to fully load before running our code.
    // This helps ensure the video element exists when we try to find it.
    setTimeout(findAndSetupVideoPlayer, 2000); // Wait 2 seconds (2000 milliseconds)

    function findAndSetupVideoPlayer() {
        // --- 1. FIND THE VIDEO ELEMENT ---
        // Use the class selector we identified.
        const videoPlayer = document.querySelector('video.jw-video');

        if (!videoPlayer) {
            console.log('Vidmoly Helper: Video player not found on the page. Script will not run.');
            return; // Exit the function if no video is found
        }

        console.log('Vidmoly Helper: Video player found!', videoPlayer);

        // --- 2. DETECT WHEN THE VIDEO ENDS ---
        videoPlayer.addEventListener('ended', () => {
            console.log('Vidmoly Helper: Video has finished playing!');
            alert('The video has ended!'); // An alert is an easy way to see it work.
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
            zIndex: '9999',       // Make sure it's on top of other elements
            padding: '10px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
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
            console.log('Vidmoly Helper: Entering fullscreen.');
            element.requestFullscreen().catch(err => {
                console.error(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
            });
        } else {
            // If already in fullscreen, exit
            console.log('Vidmoly Helper: Exiting fullscreen.');
            document.exitFullscreen();
        }
    }

})();
