// import { fetchData } from "./app.js"
'use strict'

import { sideBar } from "./sidebar.js";
import { fetchData, api_key, baseURL} from './app.js';
import { createMovieCard } from './movie-card.js';
import {searchCreation} from './search.js'


const pageContent = document.querySelector("[page-content]");





    sideBar();
    fetchData(`https://api.themoviedb.org/3/movie/popular?`, heroBannerCreate);


    const homePageSections = [
        {
            title: "Upcoming movies",
            api_path: "https://api.themoviedb.org/3/movie/upcoming"
        },
        {
            title: "Top rated movies",
            api_path: "https://api.themoviedb.org/3/movie/top_rated"
        },
        {
            title: "Trending",
            api_path: "https://api.themoviedb.org/3/trending/movie/week"
        },
    ];

    function heroBannerCreate({ results: movieList }) {
    
        const banner = document.createElement('section');
        banner.classList.add('banner');
        banner.innerHTML = `
    <div class="slider"></div>

<div class="slider-controller">
    <div class="control--inner">
        
    </div>
</div>
    `;
        
        let controlItem = 0 //to sync the changes on the bigger banner and its preview
        for (const [ind, movie_details] of movieList.entries()) {
            const {
                backdrop_path,
                original_title,
                overview,
                release_date,
                genre_ids,
                id,
                vote_count,
                vote_average,
                poster_path
            } = movie_details;
            const sliderItem = document.createElement('div');
            sliderItem.classList.add('slider-item');
            sliderItem.setAttribute('slider-item', '')
            

            sliderItem.innerHTML = `
        <img src="${baseURL}w1280${backdrop_path}" alt=${original_title} class="cover-image" loading=${ind === 0 ? 'eager' : 'lazy'}>

        <div class="item-content">
            <h2 class="heading">${original_title}</h2>
            <div class="other-info-list">
                <div class="other-item">${release_date.split('-')[0]}</div>
                <div class="other-item rating">${vote_average.toFixed(1)}</div></div>
                <p class="Genre"></p>
                <p class="about-banner">${overview}</p>
                <a href="./detail.html" class="btn" onclick="getMovieDetails(${id})">
                        <img src="./assets/images/play_circle.png" class="play-icon" width="24" height="24">
                        <span class="span">Watch Now</span>
                </a>
            
        </div>
        `;
            banner.querySelector('.slider').appendChild(sliderItem);
            

            const controlButton = document.createElement('button');
            controlButton.classList.add('poster-box', 'slider-item');
            controlButton.setAttribute('slider-control', `${controlItem}`);

            controlItem = controlItem + 1;

            controlButton.innerHTML = `
        <img src="${baseURL}w154${poster_path}" alt=${original_title} loading="lazy" draggable="false" class="cover-image">
    
        `
          
            banner.querySelector('.control--inner').appendChild(controlButton);
          


        }
       
        pageContent.appendChild(banner);

        addHeroSlide();


        for (const { title, api_path } of homePageSections) {
            fetchData(`${api_path}?`, MovieListCreate, title)
        }
    }

    const addHeroSlide = function () {
        const sliderItem = document.querySelectorAll("[slider-item]");
        const sliderControls = document.querySelectorAll("[slider-control]");

        let previousSliderItem = sliderItem[0];
        let previousSliderControl = sliderControls[0];

        previousSliderItem.classList.add('active');
        previousSliderControl.classList.add('active');
        sliderControls.forEach(ele => {
            ele.addEventListener('click', function (e) {
                previousSliderItem.classList.remove('active');
                previousSliderControl.classList.remove('active');

                previousSliderControl = sliderControls[Number(this.getAttribute(["slider-control"]))];
                previousSliderItem = sliderItem[Number(this.getAttribute(["slider-control"]))];

                previousSliderItem.classList.add('active');
                previousSliderControl.classList.add('active');
            })
        })



    }


    const MovieListCreate = function ({ results: movieList }, title) {
        const movieListElement = document.createElement("section");
        movieListElement.classList.add("movie-list");
        movieListElement.innerHTML = `
    
    <div class="title-wrap">
        <h2 class="title">${title}</h2>
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







