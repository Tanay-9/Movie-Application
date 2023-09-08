'use strict'
 const api_key='api_key=5135c5361bde725c9aceedac065e40e1'
  const baseURL="https://image.tmdb.org/t/p/";


 const fetchData = function(url,callback,optionalParam){
  fetch(`${url}${api_key}`)
    .then(response => response.json())
    .then(data => callback(data,optionalParam));
 }

 const fetchSpecData = function(url,callback,optionalParam){
  fetch(`${url}`)
  .then(response => response.json())
  .then(data => callback(data,optionalParam));
 }
  
  
 
//  fetchData(`https://api.themoviedb.org/3/genre/movie/list?`,function({ genres }){
//    console.log(genres);
//   });
  
  export {fetchData,api_key,baseURL,fetchSpecData};