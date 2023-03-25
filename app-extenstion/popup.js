document.getElementById('toggleHandler').addEventListener('click', () => {
  chrome.runtime.sendMessage({ action: 'toggleHandler' }, (response) => {
    updateButtonText(response.handlerEnabled);
  });
});

function updateButtonText(enabled) {
  const button = document.getElementById('toggleHandler');
  button.textContent = enabled ? 'Disable Handler' : 'Enable Handler';
}

// Request the current handler state from the background script when the popup opens
chrome.runtime.sendMessage({ action: 'getHandlerState' }, (response) => {
  updateButtonText(response.handlerEnabled);
});
