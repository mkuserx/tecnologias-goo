
  let nextPage = '';

  function getNextPageUrl() {
    const nav = document.querySelector('.blog-pager-older-link');
    return nav ? nav.href : '';
  }

  function loadMorePosts() {
    if (!nextPage) return;

    fetch(nextPage)
      .then(response => response.text())
      .then(html => {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;

        const posts = tempDiv.querySelectorAll('.blog-posts .post');
        const container = document.querySelector('.blog-posts');

        posts.forEach(post => {
          container.appendChild(post);
        });

        // Actualizar nextPage
        const newNext = tempDiv.querySelector('.blog-pager-older-link');
        nextPage = newNext ? newNext.href : '';
        if (!nextPage) {
          document.getElementById('loadMoreContainer').style.display = 'none';
        }
      });
  }

  document.addEventListener('DOMContentLoaded', function () {
    nextPage = getNextPageUrl();
    const btn = document.getElementById('loadMore');
    btn.addEventListener('click', loadMorePosts);
  });
