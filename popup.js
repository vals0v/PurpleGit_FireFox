const colors = ['green', 'yellow', 'red', 'blue', 'purple', 'pink'];

document.querySelectorAll('.color-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const selected = btn.dataset.color;
    chrome.storage.local.set({ selectedColor: selected }, () => {
      chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        if (tabs[0]) chrome.tabs.sendMessage(tabs[0].id, {color: selected});
      });
      window.close();
    });
  });
});