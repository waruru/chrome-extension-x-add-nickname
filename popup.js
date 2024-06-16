document.getElementById('save').addEventListener('click', function () {
  const username = document.getElementById('twitter-username').value;
  const nickname = document.getElementById('nickname').value;

  if (username) {
    chrome.storage.sync.set({ [username]: nickname }, function () {
      alert('ニックネームが保存されました！');
    });
  }
});

document.getElementById('reset').addEventListener('click', function () {
  chrome.storage.sync.clear(function () {
    alert('登録内容がクリアされました');
  });
});

document.getElementById('export').addEventListener('click', function () {
  chrome.storage.sync.get(null, function (items) {
    const json = JSON.stringify(items, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.json';
    a.click();
    URL.revokeObjectURL(url);
  });
});

document.getElementById('import').addEventListener('click', function () {
  document.getElementById('import-file').click();
});

document.getElementById('import-file').addEventListener('change', function (event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (event) {
      const data = JSON.parse(event.target.result);
      chrome.storage.sync.set(data, function () {
        alert('データがインポートされました！');
      });
    };
    reader.readAsText(file);
  }
});
