console.log('showfeed');

$(`#username-nav-link`).text(`${window.sessionStorage.username}`)

const userId = window.location.pathname.split('/')[2];

// GET Display Feed

const displayFeed = (res) => {
  const podcasts = res.data;
  console.log(podcasts);
  const $results = $('#results');
  $results.empty();
  podcasts.forEach((result) => {
  const temp = `<div class="col-sm-6">
    <div class="card mb-4 shadow-sm">
      <img class="result-img" src="${result.imageSource}" />
      <div class="card-body">
        <p class="card-text podcast-name">${result.name}</p>
        <div class="d-flex justify-content-between align-items-center">
          <div class="btn-group">
            <a href="${result.itunesLink}" target="_blank">
              <button type="button" class="btn btn-sm btn-outline-secondary">View</button>
            </a>
          </div>
          <i class="fas fa-heart heart closed-heart"
          data-name="${result.name}"
          data-artist="${result.artist}"
          data-itunes-link="${result.itunesLink}"
          data-image-source="${result.imageSource}"></i>
        </div>
      </div>
    </div>
  </div>`;
  $results.append(temp);
  });
};

$('document').ready(
  $.ajax({
    method: 'GET',
    url: `http://localhost:4000/api/v1/podcasts/${userId}`,
    success: displayFeed,
  })
);


// UPDATE Remove Podcast from User Object

$('#results').on('click', '.closed-heart', function() {
  $(this).removeClass('closed-heart');
  $(this).addClass('open-heart');

  $(this).removeClass('fas');
  $(this).addClass('far');

  $.ajax({
    method: 'PUT',
    url: `http://localhost:4000/api/v1/podcasts/${userId}`,
    data: {
      name: $(this).data('name'),
      artist: $(this).data('artist'),
      itunesLink: $(this).data('itunes-link'),
      imageSource: $(this).data('image-source'),
    },
    success: (res) => {
      $(this).parents('div.col-sm-6').remove();
      console.log('successfully removed')
    },
    error: (err) => {
      console.log(err);
    }
  });
});


// Sign Out
$(`.signout`).on('click', (event) => {
    event.preventDefault();
    fetch('/api/v1/signout', {
        method: 'DELETE',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(dataStream => dataStream.json())
    .then(res => {
        if (res.status === 200) {
        window.location = '/signup';
        }
    });
});