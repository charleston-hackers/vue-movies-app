<template>
    <div>
        <div>
            <h1>{{ title }}</h1>
        </div>
        <section id='movieList'>
            <div class='movieCard' v-for='movie in movies' v-bind:key='movie.id'>
                <router-link :to='{name: "MovieDetail", params: {movieId: movie.id}}' class='movieCardLink'>
                    <div class='movieCardContent'>
                        <img class='backdrop' :src='imageUrlPartial + movie.backdrop_path' :alt='"backdrop movie image for " + movie.title' :title='"Get more details about " + movie.title'>
                        <h2>{{ movie.title }}</h2>
                    </div>
                </router-link>
            </div>
        </section>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'CurrentlyPlaying',
    data () {
        return {
        title: 'Movies Currently in Theaters',
        show: true,
        loading: false,
        apiKey: 'a611315ba9b178c672528a504436308c',
        urlPartial: 'https://api.themoviedb.org/3/movie/now_playing?api_key=',
        imageUrlPartial: 'https://image.tmdb.org/t/p/w500/',
        movieId: '',
        poster: '',
        releaseDate: '',
        movieTitle: '',
        overview: '',
        genre: '',
        voteAverage: '',
        movies: [],
        videos: []
        }
    },
    methods: {
        getMovies () {
            const urlString = this.urlPartial + this.apiKey
            axios
            .get(urlString)
            .then(response => {
                this.movies = response.data.results
            })
            .then(data => {
                let genres = document.querySelectorAll('.genre')
                let genresArray = Array.from(genres)
                genresArray[0].classList.add('firstGenre')
            })
            .catch(error => {
                console.log(error)
            })
        },
        getGenre (genre, index) {
            if (genre === 28) return 'Action'
            if (genre === 12) return 'Adventure'
            if (genre === 16) return 'Animation'
            if (genre === 35) return 'Animation'
            if (genre === 80) return 'Comedy'
            if (genre === 99) return 'Crime'
            if (genre === 18) return 'Documentary'
            if (genre === 10751) return 'Drama'
            if (genre === 14) return 'Fantasy'
            if (genre === 36) return 'History'
            if (genre === 27) return 'Horror'
            if (genre === 10402) return 'Music'
            if (genre === 9648) return 'Mystery'
            if (genre === 10749) return 'Romance'
            if (genre === 878) return 'Science Fiction'
            if (genre === 10770) return 'TV Movie'
            if (genre === 53) return 'Thriller'
            if (genre === 10752) return 'War'
            if (genre === 37) return 'Western'
        }
    },
    beforeMount () {
        this.getMovies()
    }
}
</script>
