'use strict'

import {api_key,baseURL,fetchSpecData} from './app.js';

import { createMovieCard } from './movie-card.js';

import {sideBar} from './sidebar.js';
import { searchCreation } from './search.js';

const genreName = window.localStorage.getItem('genreName');
const urlParam = window.localStorage.getItem('urlParam');
const pageContent = document.querySelector('.content-container');


sideBar();

let currPage = 1;
let totalPages = 0;
const fetchMovie = `https://api.themoviedb.org/3/discover/movie?${api_key}&include_adult=false&include_video=false&page=${currPage}&sort_by=popularity.desc&${urlParam}`
fetchSpecData(`${fetchMovie}`,function({results : movieList, total_pages}){
     totalPages = total_pages;

     document.title = `${genreName} Movies`

     const movieListELem = document.createElement('section');
     movieListELem.classList.add('movie-list','genre-list');
     movieListELem.innerHTML = `
     <div class="title-wrap">
     <h2 class="heading"> ${genreName}</h2>
    </div>

    <div class="grid-list">
    </div>

    <button class="load-more btn">Load More</button>
        `
    for(const movie of movieList){
        const movieCard = createMovieCard(movie);
        movieListELem.querySelector('.grid-list').appendChild(movieCard);
    }
    pageContent.appendChild(movieListELem);


    const loadMore = movieListELem.querySelector('.load-more');
    loadMore.addEventListener('click',function(){
       if(currPage >= totalPages){
        this.style.display = "none";
        return;
       }

       currPage++;
       this.classList.add('loading');
       fetchSpecData(fetchMovie, ({results:movieList})=>{
        this.classList.remove('loading');

        for(const movie of movieList){
            const movieCard = createMovieCard(movie);
            movieListELem.querySelector('.grid-list').appendChild(movieCard);
        }
       })

    })

});


searchCreation();


