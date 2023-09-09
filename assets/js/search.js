'use strict'

import { fetchData,api_key,baseURL,fetchSpecData } from "./app.js";
import { createMovieCard } from "./movie-card.js";


export function searchCreation(){
  
    const searchWrap = document.querySelector('.search-wrap');
    const searchField = document.querySelector('.input-box');

    const results = document.createElement('div');
    results.classList.add("search-results");
    document.querySelector('main').appendChild(results);

    let searchTimeout;

    searchField.addEventListener('input',function(){
        if(!searchField.value.trim()){
            results.classList.remove('active');
            results.classList.remove('searching');
            clearTimeout(searchTimeout);
            return;
        }
    
        searchWrap.classList.add('searching');

        clearTimeout(searchTimeout);

        searchTimeout = setTimeout(function(){
            fetchSpecData(`https://api.themoviedb.org/3/search/movie?${api_key}&query=${searchField.value}&include_adult=false&page=1`,function({results : movieList}){
            searchWrap.classList.remove('searching');
            results.classList.add('active');
            results.innerHTML = " ";
            results.innerHTML = `
            <p class="label">Results for</p>
            <h1 class="heading">${searchField.value}</h1>

            <div class="movie-list">
                <div class="grid-list">      
            </div>
    </div>
            `;
            for(const movie of movieList){
                const movieCard = createMovieCard(movie);
                results.querySelector('.grid-list').appendChild(movieCard)
            }

            });
        },500);
    });
};



