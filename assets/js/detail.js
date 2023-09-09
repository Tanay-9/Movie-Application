'use strict'
import { fetchData,api_key,baseURL} from "./app.js";
import { sideBar } from "./sidebar.js";
import { createMovieCard } from "./movie-card.js";
import {searchCreation} from './search.js'

sideBar();


const movieId = window.localStorage.getItem("movieId");
const pageContent = document.querySelector(".content")

const getGenres = (genreList) => {
    const newGenreList = [];
    
    for(const { name } of genreList)newGenreList.push(name);

    return newGenreList.join(", ");
}

const getCasts = (castList) => {
    const newCastList = [];
    for(let i = 0, len = castList.length; i< len && i < 10; i++){
        const { name } = castList[i];
        newCastList.push(name);
    }
    return newCastList.join(", ");
}

const getDirectors = (crewList) => {
    const directors = crewList.filter(({ job }) => job == "Director");

    const directorList = [];
    for(const { name } of directors ) directorList.push(name);

    return directorList.join(", ")
}
const filterVideos = (videoList) => {
    return videoList.filter(({ type,site }) => (type == "Trailer" || type == "Teaser") && site == "YouTube"); 
  }

fetchData(`https://api.themoviedb.org/3/movie/${movieId}?${api_key}&append_to_response=casts,videos,images,releases`,function(movie){
   const {
    backdrop_path,
    poster_path,
    title,
    release_date,
    runtime,
    vote_average,
   releases,
    genres,
    overview,
    castId,
    casts : { cast, crew },
    videos : { results: videos}
   } = movie;

   document.title = `${title} - Moviezz;` 
//    console.log(videos);

   const movieDetail = document.createElement('div');
   movieDetail.classList.add('movie-details');
   movieDetail.innerHTML = `
   <div class="background" style="background-image: url(${baseURL}${'w1280'||'original'}${backdrop_path||poster_path});"></div>

            <figure class="poster-box movie-poster">
                <img src="${baseURL}w342${poster_path}" class="cover-image">
            </figure>

            <div class="details">
                <div class="detail--content">
                    <h1 class="heading">${title}</h1>
                    <div class="other-info-list">
                        <div class="other-item">
                            <img src="./assets/images/star.png" alt="rating" height="20" width="20">
                            <span class="span">${vote_average.toFixed(1)}</span>
                        </div>
                        <div class="separator"></div>
                        <div class="other-item">
                            ${runtime}min
                        </div>
                        <div class="separator"></div>
                        <div class="other-item">
                            ${release_date}
                        </div>
                    </div>

                    <p class="Genre">${getGenres(genres)}</p>

                    <p class="movie-description">
                        ${overview}
                    </p>

                    <ul class="movie-other-details">
                        <div class="list-item">
                            <p class="list-name">Starring</p>

                            <p class="movie-cast">
                            ${getCasts(cast)}
                            </p>
                        </div>
                        <div class="list-item">
                            <p class="list-name">Directed by</p>

                            <p>
                            ${getDirectors(crew)}
                            </p>
                        </div>
                    </ul>
                </div>

                <div class="title-wrapper">
                    <h3 class="title-large">Trailer and Clips</h3>
                </div>

                <div class="slider-list">
                    <div class="slider-inner">
                    </div>
                </div>
            </div>
   `

   for(const { key,name } of filterVideos(videos)){
    const videoCard = document.createElement('div');
    videoCard.classList.add('video-card')
    videoCard.innerHTML = `
    <iframe width='500' height = '294' src="https://www.youtube.com/embed/${key}?&theme=dark&color=white&rel=0" frameborder="0" allowfullscreen="1" title = "${name}" class="cover-image" loading="lazy"></iframe>
    `;

    movieDetail.querySelector('.slider-inner').appendChild(videoCard);
   }

   pageContent.appendChild(movieDetail);
   fetchData(`https://api.themoviedb.org/3/movie/${movieId}/recommendations?`,getRecommendations)
})

//  const getRecommendations = function()



 const getRecommendations = function ({ results: movieList }, title) {
    const movieListElement = document.createElement("section");
    movieListElement.classList.add("movie-list");
    movieListElement.innerHTML = `

<div class="title-wrap">
    <h2 class="title">You may like</h2>
</div>

<div class="slider-list">
    <div class="slider-inner">
      
    </div>
</div>
`

    for (const movie of movieList) {

        const movieCard = createMovieCard(movie);
        movieListElement.querySelector('.slider-inner').appendChild(movieCard);

    }
    pageContent.appendChild(movieListElement);
}

searchCreation();