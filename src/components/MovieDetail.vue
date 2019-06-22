<template>
    <section>
        <div>
            <router-link :to='{name: "CurrentlyPlaying"}'>Return to movie list</router-link>
        </div>
        <div class='movieDetails' style="width: 100%; height: auto">
            <h1>Movie details for {{ movieTitle }}</h1>
            <img :src='imageUrlPartial + poster' :alt='"backdrop movie image for " + movieTitle' :title='"Get more details about " + movieTitle'>
            <h2>{{ movieTitle }}</h2>
            <p><span class='bold'>Released:</span> {{ releaseDate }}</p>
            <p><span class='bold'>Score:</span> {{ voteAverage }}</p>
            <p><span class='bold'>Total votes:</span> {{ voteCount }}</p>
            <p><span class='bold'>Synopsys:</span> {{ overview }}</p>
            <p><span class='bold'>Genres:</span> <span class='genre' v-for='genre in genres' v-bind:key='genre'>{{ genre.name }}</span></p>
            <div v-for='(video, index) in videos' :key='index' class='videoContainer'>
                <iframe class='video' :src='youtubePartial + video.key' frameborder="0" allowfullscreen></iframe>
            </div>
        </div>
    </section>
</template>

<script>
import axios from 'axios'

export default {
    name: 'MovieDetail',
    data () {
        return {
        title: 'Movies Currently in Theaters',
        loading: false,
        apiKey: 'a611315ba9b178c672528a504436308c',
        urlPartial: 'https://api.themoviedb.org/3/movie/now_playing?api_key=',
        imageUrlPartial: 'https://image.tmdb.org/t/p/w500/',
        youtubePartial: 'https://www.youtube.com/embed/',
        videoUrlPartial1: 'https://api.themoviedb.org/3/movie/',
        videoUrlPartial2: '?api_key=',
        videoUrl: '',
        youTubeVideo: '',
        releaseDate: '',
        movieTitle: '',
        poster: '',
        overview: '',
        voteAverage: '',
        voteCount: '',
        movies: [],
        videos: [],
        genres: []
        }
    },
    methods: {
        getMovieDetails (movieId) {
            console.log(movieId)
            this.videoUrl = this.videoUrlPartial1 + movieId + this.videoUrlPartial2 + this.apiKey + '&append_to_response=videos'
            console.log('this is the url ' + this.videoUrl)
            axios
            .get(this.videoUrl)
            .then(response => {
                console.log(response)
                this.videos = response.data.videos.results
                console.log('this is the video list ' + this.videos)

                this.poster = response.data.poster_path
                this.movieTitle = response.data.title
                this.genres = response.data.genres
                console.log(this.genres)
                this.releaseDate = response.data.release_date
                this.voteAverage = response.data.vote_average
                this.voteCount = response.data.vote_count
                this.overview = response.data.overview
            })
            .then(data => {
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
        this.getMovieDetails(this.$route.params.movieId)
    }
}
</script>
