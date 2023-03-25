const DEFAULT_INDEXER_API = "https://ordinals.gorillapool.io/api/files/inscriptions/";

const indexerAPIInput = document.getElementById("indexerAPI");

chrome.storage.sync.get("indexerAPI", (data) => {
  indexerAPIInput.value = data.indexerAPI || DEFAULT_INDEXER_API;
});

document.getElementById('indexerAPIForm').addEventListener('submit', (event) => {
  event.preventDefault();
  chrome.storage.sync.set({ indexerAPI: indexerAPIInput.value });
});

document.getElementById('toggleHandler').addEventListener('click', () => {
  chrome.runtime.sendMessage({ action: 'toggleHandler' }, (response) => {
    updateToggleState(response.handlerEnabled);
  });
});

function updateToggleState(enabled) {
  const toggleInput = document.getElementById('toggleHandler');
  toggleInput.checked = enabled;
}

chrome.runtime.sendMessage({ action: 'getHandlerState' }, (response) => {
  updateToggleState(response.handlerEnabled);
});
