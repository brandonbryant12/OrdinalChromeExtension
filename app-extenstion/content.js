// Listen for a click event on the anchor tag with a custom URI
document.addEventListener('click', (event) => {
  if (event.target.tagName === 'A' && event.target.href.startsWith('ord://')) {
    event.preventDefault();
    event.stopPropagation();

    chrome.runtime.sendMessage({
      action: 'processCustomUri',
      uri: event.target.href,
    });
  }
}, true);

function handleCustomMediaElements(elementTag) {
  const mediaElements = document.querySelectorAll(`${elementTag}[src^="ord://"]`);

  mediaElements.forEach((element) => {
    const origin = element.src.split('ord://')[1];
    const url = `https://ordinals.gorillapool.io/api/files/inscriptions/${origin}`;

    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        const src = URL.createObjectURL(blob);
        element.src = src;
      })
      .catch((error) => {
        console.error('Error fetching file:', error);
      });
  });
}

handleCustomMediaElements('img');
handleCustomMediaElements('audio');
handleCustomMediaElements('video');

// Wait for the DOM to be fully loaded and handle custom images
document.addEventListener('DOMContentLoaded', handleCustomImages);

// Listen for messages from the background script to handle images after a navigation event
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'handleImages') {
    handleCustomImages();
  }
});
