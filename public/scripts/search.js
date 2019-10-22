console.log('search js connected');

// user submits a search query
const onSuccess = (res) => {
  const $searchResults = $('#results');
  $searchResults.empty();
  res.results.forEach((result) => {
  const temp = `<div class="col-sm-6">
    <div class="card mb-4 shadow-sm">
      <img class="result-img" src="${result.artworkUrl600}" />
      <div class="card-body">
        <p class="card-text podcast-name">${result.collectionName}</p>
        <div class="d-flex justify-content-between align-items-center">
          <div class="btn-group">
            <a href="${result.collectionViewUrl}" target="_blank">
              <button type="button" class="btn btn-sm btn-outline-secondary">View</button>
            </a>
          </div>
          <i class="far fa-heart heart open-heart"
          data-name="${result.collectionName}"
          data-artist="${result.artistName}"
          data-itunes-link="${result.collectionViewUrl}"
          data-image-source="${result.artworkUrl600}"></i>
        </div>
      </div>
    </div>
  </div>`;
  $searchResults.append(temp);
  });
  console.log(res);
};

$('form').on('submit', (e) => {
  e.preventDefault();
  let term = $('#search-bar').val();
  term = term.replace(' ', '+');
  // $.ajax({
  //   method: 'GET',
  //   url: `https://itunes.apple.com/search?term=${term}&media=podcast&limit=10`,
  //   dataType: 'json',
  //   success: onSuccess,
  //   error: (err) => {
  //     console.log({err});
  //   }
  // })
  $.getScript(`https://itunes.apple.com/search?term=${term}&media=podcast&limit=10&callback=onSuccess`);
});

$('#results').on('click', '.open-heart', function() {
  $(this).removeClass('open-heart');
  $(this).addClass('closed-heart');

  $(this).removeClass('far');
  $(this).addClass('fas');

  // ajax call to create new podcast in User document
  $.ajax({
    method: 'POST',
    url: 'http://localhost:4000/api/v1/podcasts',
    data: {
      name: $(this).data('name'),
      artist: $(this).data('artist'),
      itunesLink: $(this).data('itunes-link'),
      imageSource: $(this).data('image-source'),
    },
    success: (req)=>{
      console.log('success');
    },
    error: (err) => {
      console.log(err);
    }
  });
});

$('#results').on('click', '.closed-heart', function() {
  $(this).removeClass('closed-heart');
  $(this).addClass('open-heart');

  $(this).removeClass('fas');
  $(this).addClass('far');

  // ajax call to delete podcast from User document
});