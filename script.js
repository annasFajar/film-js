const cards = document.querySelectorAll('.row')[1];

// tombol search api awal
$('.btn-search').on('click', function (){

    $.ajax({
        url: 'http://www.omdbapi.com/?apikey=1eb9c0a5&s=' + $('.input-search').val(),
        success: (result) => {
            const hasil = result.Search;
            let kosong = '';
            hasil.forEach((film) => {
                    kosong += fungsiKosong(film);
            });
            $('.movie-container').html(kosong);
    
            // tombol detail di klik
            $('.modal-detail-button').on('click', function () {
                $.ajax({
                    url: 'http://www.omdbapi.com/?apikey=1eb9c0a5&i=' + $(this).data("imdbid"),
                    success : m => {
                        let modal = '';
                        modal += fungsiModal(m);
    
                        let gambar = '';
                        gambar += `<img src="${m.Poster}" class="img-fluid">`;
                                
                        $(".col-md-3").html(gambar);
                        $(".col-md").html(modal);
                    },
                });
            });
            
        },
        Error: (e) => {
            console.log(e.responseText);
        }
    })
}) 
// tombol search api akhir


function fungsiKosong(film) {
    return `<div class="col-md-4 my-3">
                <div class="card">
                    <img src="${film.Poster}" class="card-img-top" />
                    <div class="card-body">
                        <h5 class="card-title">${film.Title}</h5>
                        <h6 class="card-subtitle mb-2 text-body-secondary">${film.Year}</h6>
                        <a href="#" class="btn btn-primary modal-detail-button" data-bs-toggle="modal" data-bs-target="#movieModal" data-imdbid="${film.imdbID}">Details</a>
                    </div>
                </div>
            </div>
            `;
    
};

function fungsiModal(m) {
    return `<ul class="list-group">
        <li class="list-group-item"><h4>${m.Title}</h4></li>
        <li class="list-group-item"><strong>Director: </strong>${m.Director}</li>
        <li class="list-group-item"><Strong>Actors: </Strong>${m.Actors}</li>
        <li class="list-group-item"><strong>Writer: </strong>${m.Writer}</li>
        <li class="list-group-item"><strong>Plot: </strong><br>${m.Plot}</li>
    </ul>
    `
    ;
};