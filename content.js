chrome.storage.sync.get(null, function (nicknames) {
  setTimeout(function() {
    const profilenameElement = document.querySelector('[data-testid="UserName"] > div > div > div > div > div > span > span');
    const profileidElement = document.querySelector('[data-testid="UserName"] > div > div > div > div > div > div > span');
    if (profileidElement && profilenameElement) {
      const profileid = profileidElement.textContent;
      const profilename = profilenameElement.textContent;

      if (nicknames[profileid] && nicknames[profileid] !== profilename) {
        profilenameElement.textContent = nicknames[profileid]+ ' (' + profilename + ')';
      }
    }
  }, 1500);
});

// 特定の処理を行う関数
function processArticle(article) {
  // console.log('新しい記事が見つかりました:', article);
  chrome.storage.sync.get(null, function (nicknames) {
    const usernameElement = article.querySelector('[role="link"] > div > div > span > span');
    const useridElement = article.querySelector('[role="link"] > div > span');
    if (useridElement && usernameElement) {
      const userid = useridElement.textContent;
      const username = usernameElement.textContent;
      if (nicknames[userid] && nicknames[userid] !== username) {
        usernameElement.textContent = nicknames[userid]+ ' (' + username + ')';
      }
    }
  })
}

function processOption(option) {
  chrome.storage.sync.get(null, function (nicknames) {
    const usernameElement = option.querySelector('[data-testid="UserCell"] > div > div > div > div > div > div > div > div > span > span');
    const useridElement = option.querySelector('[data-testid="UserCell"] > div > div > div > div > div > div > div > div > div > span');
    if (useridElement && usernameElement) {
      const userid = useridElement.textContent;
      const username = usernameElement.textContent;
      if (nicknames[userid] && nicknames[userid] !== username) {
        usernameElement.textContent = nicknames[userid]+ ' (' + username + ')';
      }
    }
  })
}

function processFollow(follow) {
  chrome.storage.sync.get(null, function (nicknames) {
    const elements = follow.querySelectorAll('[role="link"]')
    const usernameElement = elements[1].querySelector('div > div > span > span');
    const useridElement = elements[2].querySelector('div > div > span');

    if (useridElement && usernameElement) {
      const userid = useridElement.textContent;
      const username = usernameElement.textContent;
      if (nicknames[userid] && nicknames[userid] !== username) {
        usernameElement.textContent = nicknames[userid]+ ' (' + username + ')';
      }
    }
  })
}

// 新しく追加されたノード内にarticleがあるかチェック
function checkForDiv(node) {
  if (node.nodeName === 'DIV') {
    const articles = node.querySelectorAll('article');
    const options = node.querySelectorAll('[data-testid="typeaheadRecentSearchesItem"]');

    const follows = node.querySelectorAll('[data-testid="UserCell"]');

    articles.forEach(processArticle);
    options.forEach(processOption);
    follows.forEach(processFollow)
  }
}

// DOM変更を監視する関数
function observeDOMChanges() {
  var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.addedNodes && mutation.addedNodes.length > 0) {
        mutation.addedNodes.forEach(checkForDiv);
      }
    });
  });

  var config = { childList: true, subtree: true };
  observer.observe(document.body, config);
}

// DOM監視を開始
observeDOMChanges();
