const btnSearch = document.querySelector('.btn-search');





// search api sesuai inputan 
btnSearch.addEventListener('click', async function() {
    try {
        const inputSearch = document.querySelector('.input-search');
        const hasilSearch = await imdbapi(inputSearch.value);
        const resolved = funcMovies(hasilSearch)
        return resolved
    } catch (error) {
        console.log(error)
    }
});

// api init
function imdbapi (m) {
    return fetch('https://www.omdbapi.com/?apikey=1eb9c0a5&s=' + m)
    .then(res => {
            // cek apikey
            if (!res.ok) {
                console.log(res)
                alert(Error(`apikey salah ${res.status}`))
                throw new Error(`apikey salah ${res.status}`);
            }
            return res.json()
    })
    .then(res => {
        // cek undefined movie
        if (res.Response === 'False') {
            console.log(res)
            alert(res.Error)
            throw new Error(res.Error);
        }
        console.log(res)
        return res.Search
    })
}


const funcMovies = (movies) => {
    let kosongan = '';
    movies.map(movie => {
        const movieContainer = document.querySelector('.movie-container')
        const hasilMovie = fungsiCards(movie);
        kosongan = kosongan + hasilMovie
        return movieContainer.innerHTML=kosongan;
    })
}
// modal detail
document.addEventListener('click', async function(e) {

    if (e.target.classList.contains("modal-detail-button")) {
        const imdbModal = modal(e.target);
        const detail = await getDetail(imdbModal);
        updateDetail(detail)
    } else {
        
    }
})

function modal(a) {
    const imdbDetail = a.dataset.imdbid;
    return imdbDetail
}

function getDetail(l) {
    return fetch('https://www.omdbapi.com/?apikey=1eb9c0a5&i=' + l)
    .then(resposne => resposne.json())
    .then(response => response);
};

function updateDetail(detail) {
    let isiModal = '';
    const modal = document.querySelector('.col-md');
    const gambar = document.querySelector('.col-md-3');
    isiModal += fungsiModal(detail);
    gambar.innerHTML= `<img src="${detail.Poster}" class="img-fluid">`
    modal.innerHTML= isiModal;
}


function fungsiCards(c) {
    return `<div class="col-md-4 my-3">
                <div class="card">
                    <img src="${c.Poster}" class="card-img-top" />
                    <div class="card-body">
                        <h5 class="card-title">${c.Title}</h5>
                        <h6 class="card-subtitle mb-2 text-body-secondary">${c.Year}</h6>
                        <a href="#" class="btn btn-primary modal-detail-button" data-bs-toggle="modal" data-bs-target="#movieModal" data-imdbid="${c.imdbID}">Details</a>
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