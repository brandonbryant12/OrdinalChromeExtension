// Initialize the handler state if not set
chrome.storage.local.get('handlerEnabled', ({ handlerEnabled }) => {
  if (handlerEnabled === undefined) {
    chrome.storage.local.set({ handlerEnabled: true });
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'toggleHandler') {
    chrome.storage.local.get('handlerEnabled', ({ handlerEnabled }) => {
      const newState = !handlerEnabled;
      chrome.storage.local.set({ handlerEnabled: newState }, () => {
        sendResponse({ handlerEnabled: newState });
      });
    });
    return true; // Indicates that the response will be sent asynchronously
  } else if (request.action === 'getHandlerState') {
    chrome.storage.local.get('handlerEnabled', ({ handlerEnabled }) => {
      sendResponse({ handlerEnabled });
    });
    return true; // Indicates that the response will be sent asynchronously
  } else if (request.action === 'processCustomUri') {
    // Check if the handler is enabled
    chrome.storage.local.get('handlerEnabled', ({ handlerEnabled }) => {
      if (handlerEnabled) {
        const origin = request.uri.split('ord://')[1];
        chrome.tabs.create({ url: `renderer.html?origin=${origin}` });
      } else {
        // Do nothing (or perform some alternative action) when the handler is disabled
      }
    });
  }
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
    chrome.tabs.sendMessage(tabId, { action: 'handleImages' });
  }
});



