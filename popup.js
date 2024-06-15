document.getElementById('save').addEventListener('click', function() {
  const username = document.getElementById('twitter-username').value;
  const nickname = document.getElementById('nickname').value;

  if (username) {
    chrome.storage.sync.set({[username]: nickname}, function() {
      alert('ニックネームが保存されました！');
    });
  }
});

document.getElementById('reset').addEventListener('click', function() {
  chrome.storage.sync.clear(function() {
    alert('登録内容がクリアされました');
  });
});
