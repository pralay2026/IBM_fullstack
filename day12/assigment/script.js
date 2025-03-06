document.addEventListener("DOMContentLoaded", function () {
    const movieForm = document.getElementById("movieForm");
    const movieTable = document.getElementById("movieTable");
    const searchInput = document.getElementById("search");

    if (movieForm) {
        movieForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const movie = {
                name: document.getElementById("name").value,
                description: document.getElementById("description").value,
                year: document.getElementById("year").value,
                rating: document.getElementById("rating").value,
                genre: document.getElementById("genre").value,
                poster: document.getElementById("poster").value,
            };
            let movies = JSON.parse(localStorage.getItem("movies")) || [];
            movies.push(movie);
            localStorage.setItem("movies", JSON.stringify(movies));
            alert("Movie Added Successfully!");
            movieForm.reset();
        });
    }

    if (movieTable) {
        function loadMovies() {
            let movies = JSON.parse(localStorage.getItem("movies")) || [];
            movieTable.innerHTML = movies.map((m, index) => `
                <tr>
                    <td>${m.name}</td>
                    <td>${m.description.slice(0, 100)}...</td>
                    <td>${m.year}</td>
                    <td>${m.rating}</td>
                    <td>${m.genre}</td>
                    <td><img src="${m.poster}" width="50"></td>
                    <td><button onclick="deleteMovie(${index})" id="del">Delete</button></td>
                </tr>
            `).join('');
        }
        loadMovies();

        window.deleteMovie = function(index) {
            let movies = JSON.parse(localStorage.getItem("movies"));
            movies.splice(index, 1);
            localStorage.setItem("movies", JSON.stringify(movies));
            loadMovies();
        };
    }

    if (searchInput) {
        searchInput.addEventListener("input", function () {
            let filter = searchInput.value.toLowerCase();
            let movies = JSON.parse(localStorage.getItem("movies")) || [];
            let filteredMovies = movies.filter(m => m.name.toLowerCase().includes(filter) || m.genre.toLowerCase().includes(filter));
            movieTable.innerHTML = filteredMovies.map((m, index) => `
                <tr>
                    <td>${m.name}</td>
                    <td>${m.description.slice(0, 100)}...</td>
                    <td>${m.year}</td>
                    <td>${m.rating}</td>
                    <td>${m.genre}</td>
                    <td><img src="${m.poster}" width="50"></td>
                    <td><button onclick="deleteMovie(${index})">Delete</button></td>
                </tr>
            `).join('');
        });
    }
});