'use strict'
import { fetchData,api_key } from "./app.js";


export function sideBar(){
const genreList = {}

fetchData(`https://api.themoviedb.org/3/genre/movie/list?`,function({ genres }){
for (const {id , name} of genres){
    //the data from fetch is getting stored in genreList obj
    genreList[id] = name;
}

generateGenre();
//generateGenre is called so that after the storing is completed, the result is shown onto to the UI.
});


const sidebarGrid = document.createElement('div');
sidebarGrid.classList.add('sidebar-grid');

sidebarGrid.innerHTML =  `

    <div class="sidebar-list">
    <p class="name">Genre</p>
    </div>
    <div class="sidebar-list">
    <p class="name">Language</p>
    <a href="./movie-list.html" class="categories">English </a>
    <a href="./movie-list.html" class="categories">Hindi </a>
    <a href="./movie-list.html" class="categories">Tamil </a>
    <a href="./movie-list.html" class="categories">Telugu </a>
    </div>

    <div class="sidebar-footer">
    <p class="copyright">
        copyright 2023
    </p>
    </div>
`

//generateGenre function basically loops over the stored fetch value and generate the desired side bar, here basically with every iteration a genre is created to be display, each genre item is getting appended to its parent element. and at last the whole list of genre getting appended to the main parent sidebar
const generateGenre = function(){
    for(const [id,name] of Object.entries(genreList)){
        const link = document.createElement('a');
        link.classList.add('categories');
        link.setAttribute('href', './movie-list.html')
        // link.setAttribute('onclick','getFullMovieList("with_genres = ${id}", "${name}")');
        link.setAttribute('close-sidebar','');
        link.textContent = name;


        sidebarGrid.querySelectorAll('.sidebar-list')[0].
        appendChild(link);
    }

 const navbar = document.querySelector('.sidebar')
 navbar.appendChild(sidebarGrid);
//  sideBar.classList.add('active')
 toggleSidebar(navbar)
}

//togglesidebar basically added interactivity to use the sidebar, in this it made sure that the sidebar just does not stay on screen always rather can be seen in just a single click and also can be removed.
const toggleSidebar = function(navbar){
    const sidebarBtn = document.querySelector('.menu-btn');const sideBarToggle = document.querySelectorAll('.menu-toggle')
    // console.log(sideBarToggle);
    const sidebarClose = document.querySelectorAll('[menu-close]');
    const overlay = document.querySelector('.overlay');

    sideBarToggle.forEach(ele=>{
        ele.addEventListener('click',function(){
            navbar.classList.toggle('active');
            sidebarBtn.classList.toggle('active');
            overlay.classList.toggle('active');
        })
    })
    
    sidebarClose.forEach(ele=>{
        ele.addEventListener('click',function(){
            navbar.classList.remove('active');
            sidebarBtn.classList.remove('active');
            overlay.classList.remove('active');
        })
    })
}
}



// if(navbar.classList.contains('active')){
//     // overlay.addEventListener('click',function(){
//     //     navbar.classList.remove('active');
//     console.log(`contains`);
    
// }
