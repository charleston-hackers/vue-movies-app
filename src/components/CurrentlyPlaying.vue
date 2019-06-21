<template>
    <div>
        <section v-if='show'>
            <div class='movieCard' v-for='movie in movies' v-bind:key='movie.id' @click='getMovieDetails(movie)'>
                <div>
                    <h1>{{ title }}</h1>
                </div>
                <div>
                    <img :src='imageUrlPartial + movie.backdrop_path' :alt='"backdrop movie image for " + movie.title' :title='"Get more details about " + movie.title'>
                    <h2>{{ movie.title }}</h2>
                    <p><span class='bold'>Release Date:</span> {{ movie.release_date }}</p>
                    <p><span class='bold'>Voter average:</span> {{ movie.vote_average }}</p>
                    <p><span class='bold'>Total votes:</span> {{ movie.vote_count }}</p>
                    <p><span class='bold'>Genres:</span><span class='genre' v-for='(genre, index) in movie.genre_ids' v-bind:key='index'>{{ getGenre(genre) }}</span></p>
                </div>
            </div>
        </section>
        <section v-if='!show'>
            <div class='movieDetails' style="width: 100%; height: auto">
                <h2>{{ movieTitle }}</h2>
                <img :src='imageUrlPartial + poster' :alt='"backdrop movie image for " + movieTitle' :title='"Get more details about " + movieTitle'>
                <p><span class='bold'>Released:</span> {{ releaseDate }}</p>
                <p><span class='bold'>Score:</span> {{ voteAverage }}</p>
                <p><span class='bold'>Synopsys:</span> {{ overview }}</p>
                <p><span class='bold'>Genres:</span> <span class='genre' v-for='genre in genre' v-bind:key='genre'>{{ getGenre(genre) }}</span></p>
                <div v-for='(video, index) in videos' :key='index' class='videoContainer'>
                    <iframe class='video' :src='youtubePartial + video.key' frameborder="0" allowfullscreen></iframe>
                </div>
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
        youtubePartial: 'https://www.youtube.com/embed/',
        videoUrlPartial1: 'https://api.themoviedb.org/3/movie/',
        videoUrlPartial2: '?api_key=',
        videoUrl: '',
        youTubeVideo: '',
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
        },
        getMovieDetails (movieDetails) {
            console.log(movieDetails)
            this.show = !this.show
            this.poster = movieDetails.poster_path
            this.movieTitle = movieDetails.title
            this.genre = movieDetails.genre_ids
            this.releaseDate = movieDetails.release_date
            this.movieId = movieDetails.id
            this.videoUrl = this.videoUrlPartial1 + this.movieId + this.videoUrlPartial2 + this.apiKey + '&append_to_response=videos'
            this.voteAverage = movieDetails.vote_average
            this.overview = movieDetails.overview

            axios
            .get(this.videoUrl)
            .then(response => {
                console.log(response)
                this.videos = response.data.videos.results
                console.log('this is the video list ' + this.videos)

                let genres = document.querySelectorAll('.genre')
                let genresArray = Array.from(genres)
                genresArray[0].classList.add('firstGenre')
            })
            .catch(error => {
                console.log(error)
            })
        }
    },
    beforeMount () {
        this.getMovies()
    }
}
</script>
