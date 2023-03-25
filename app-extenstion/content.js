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
  chrome.storage.sync.get('indexerAPI', (data) => {
    const indexerAPI = data.indexerAPI || 'https://ordinals.gorillapool.io/api/files/inscriptions/';
    const mediaElements = document.querySelectorAll(`${elementTag}[src^="ord://"]`);

    mediaElements.forEach((element) => {
      const origin = element.src.split('ord://')[1];
      const url = `${indexerAPI}${origin}`;

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
  });
}

chrome.runtime.sendMessage({ action: 'getHandlerState' }, (response) => {
  if (response.handlerEnabled) {
    handleCustomMediaElements('img');
    handleCustomMediaElements('audio');
    handleCustomMediaElements('video');
  }
});

document.addEventListener('DOMContentLoaded', () => {
  chrome.runtime.sendMessage({ action: 'getHandlerState' }, (response) => {
    if (response.handlerEnabled) {
      handleCustomMediaElements('img');
      handleCustomMediaElements('audio');
      handleCustomMediaElements('video');
    }
  });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'handleMedia') {
    chrome.runtime.sendMessage({ action: 'getHandlerState' }, (response) => {
      if (response.handlerEnabled) {
        handleCustomMediaElements('img');
        handleCustomMediaElements('audio');
        handleCustomMediaElements('video');
      }
    });
  }
});
