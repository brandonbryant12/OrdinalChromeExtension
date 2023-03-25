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
  