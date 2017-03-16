// Saves options to chrome.storage.sync.
function save_options() {
  var refererBlock = document.getElementById('refererBlock').checked;

  localStorage.setItem('refererBlock', refererBlock);
  // Update status to let user know options were saved.
  var status = document.getElementById('status');
  status.textContent = 'Option saved.' + refererBlock;
  chrome.extension.getBackgroundPage().refererBlock = refererBlock;
  setTimeout(function() {
    status.textContent = '';
  }, 750);
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  var theSelection = JSON.parse(localStorage.refererBlock || 'false');
  document.getElementById('refererBlock').checked = theSelection;
  chrome.extension.getBackgroundPage().refererBlock = theSelection;
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);