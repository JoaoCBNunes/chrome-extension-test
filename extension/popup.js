document.addEventListener('DOMContentLoaded', () => {
  const checkbox = document.getElementById('toggle');
  chrome.storage.local.get({ enabled: true }, (res) => {
    checkbox.checked = res.enabled;
  });

  checkbox.addEventListener('change', () => {
    chrome.storage.local.set({ enabled: checkbox.checked });
  });
});
