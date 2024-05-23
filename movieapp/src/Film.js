import React from "react";
import Layout from "./Lay-out";
import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react'
import MovieInfoLayOut from "./MovieInfoLayOut";
import MovieCardBig from "./MovieCardBig";
import ModalRate from "./Modal";
import classes from './styles/Cards.module.css';
import FilmDescription from "./FilmDescription";
import { Loader } from "@mantine/core";

function Film(){
let [isLoading, isLoadingChanger] = useState(true)
let [ratedMoviesList, setRatedMovie]=useState(JSON.parse(localStorage.getItem('ratedMoviesList')) )
useEffect(()=>{
    localStorage.setItem('ratedMoviesList', JSON.stringify(ratedMoviesList))
    }, [ratedMoviesList])
    const [filmInformation, filmInformationChanger] = useState([])
const {id} = useParams(); 
useEffect(() => {
    
  async function getMovieData() {
    try {
        isLoadingChanger(true)
        const response = await fetch(`http://localhost:3001/getmoviedata?id=${id}`);
        const movieData = await response.json();
        if (movieData.videos && movieData.videos.results) {
            movieData.videos.results = movieData.videos.results.filter(element => element.name === 'Official Trailer').slice(0, 1);
        }
        filmInformationChanger(movieData); 
    } catch (error) {
        console.error('Error:', error);
    } finally{
      isLoadingChanger(false)
    }
}
  getMovieData();
    
    
  
  
  
//  fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US&append_to_response=videos`, options)
//.then(response => response.json())
//.then(response => {
//    response.videos.results=response.videos.results.filter(elemen=> elemen.name == 'Official Trailer').slice(0, 1)
//    filmInformationChanger(response); 
//    console.log(response)})
//.catch(err => console.error(err));
}
,[])
 
    return (
<Layout>
  <p className={classes.breadcrumbs}>Movies <span style={{color: 'black'}}>/</span> {filmInformation.original_title}</p>
     
     <div className={classes.wrapper}>
     {isLoading? <Loader/> :
    <><MovieCardBig 
    
   genres='Comedy, Drama, Romance' 
   rating={filmInformation.vote_average? filmInformation.vote_average.toString().slice(0,3) : '0'}
   id={filmInformation.id}
   premiere={filmInformation.release_date}
   budget={filmInformation.budget} 
   grossWorldWide={filmInformation.revenue}
   duration={filmInformation.runtime}
   
   popularity={
    filmInformation.popularity ? 
    (filmInformation.popularity > 1000 ? 
      '(' + filmInformation.popularity.toString()[0] + '.' +  filmInformation.popularity.toString()[1] + 'M)'
      :  '(' + filmInformation.popularity.toString().slice(0, 3) + 'K)')
    : '(0)'
  }
     date={filmInformation.release_date ? filmInformation.release_date.slice(0, 4) : 'No date'} 
     title={filmInformation.original_title} 
     modal={<ModalRate setRatedMovie={setRatedMovie} ratedMoviesList={ratedMoviesList} movieInfo={filmInformation}/>}
     img={<img width='250px' height='352px' 
      src={`https://image.tmdb.org/t/p/w500${filmInformation.poster_path}`}/>}>

      </MovieCardBig>
      <FilmDescription 
      videokey={filmInformation.videos && filmInformation.videos.results[0]? filmInformation.videos.results[0].key : null}
      description={filmInformation.overview}
      production_companies={filmInformation.production_companies}   
      >
     
      </FilmDescription></>}
      </div>
</Layout>
 )   
}
export {Film} 