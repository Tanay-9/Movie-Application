

const searchBox = document.querySelector('.search-box');
const toggleButton = document.querySelectorAll("[search-toggle]");

toggleButton.forEach(ele => {
    ele.addEventListener('click',function(){
        searchBox.classList.toggle('active')
    })
})

const getMovieDetails = function(movieId){
    window.localStorage.setItem('movieId',String(movieId))
}