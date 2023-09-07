'use strict';

import { baseURL } from "./index.js";


export function createMovieCard(movie){
    const {
        poster_path,
        title,
        vote_average,
        release_date,
        id
    } = movie;

    const card = document.createElement('div')
    card.classList.add('movie-banner');

    card.innerHTML = `    
    <a href="./detail.html" class="card-btn">
    <figure class="poster-box card-banner">
    <img src="${baseURL}w300${poster_path}" class="cover-image"loading='lazy'>
</figure>
<h4 class="title">${title}</h4>
<div class="other-info-list">
    <div class="other-items">
        <img src="./assets/images/star.png" height="20" width="20">
        <span class="span">${vote_average.toFixed(1)}</span>
    </div>
 

    <div class="card-badge">${release_date.split('-')[0]}</div>
    </div> 
    </a>
    `

    return card;
}