import React, { useState,useEffect } from 'react';
import "@mantine/core/styles.css";
import Layout from './Lay-out';
import styles from './styles/Cards.module.css';
import MovieCard from './MovieCard';
import ModalRate from './Modal';
import HaventRated from './HaventRated';
import { TextInput, TextInputProps, ActionIcon, useMantineTheme, rem } from '@mantine/core';
function Rated(){
  
  const [inputText, textChanger]=useState('')
  let [RatedMovies, rate]=useState(JSON.parse(localStorage.getItem('ratedMoviesList')) )
  
  useEffect(()=>{
    localStorage.setItem('ratedMoviesList', JSON.stringify(RatedMovies))
    currentContentChanger(RatedMovies)
    }, [RatedMovies])
    const [currentContent, currentContentChanger]=useState(RatedMovies)
   
    useEffect(()=>{
    if (inputText===''){
      currentContentChanger(RatedMovies)
    }
   },[inputText])
   
  function searchHandler(){
    if (inputText!==''){
currentContentChanger(currentContent.filter((movie) => inputText.split(" ").join("")==movie.original_title.split(" ").join("")))
    }
  }
    return(
  
<Layout>
  <div >
{
  RatedMovies.length>0? <header className={styles.header}>
  <h1 style={{display: 'inline-block', marginTop: '35px', marginLeft: '-23px'}}>Rated movies</h1>
  <TextInput
      onChange={(changes)=>textChanger(changes.target.value)}
      className={styles.inputSearch}
      placeholder="Search movie title"
      size='md'
      rightSectionWidth={88}
      style={{ width: '490px', marginTop:'39px', marginRight: '-29px'}}
      rightSection={
        <button className={styles.searchButton} onClick={searchHandler}>Search</button>
      }
      leftSection={<div className={styles.searchicon}  />}
    />
    </header> : null}
    
  <div className={styles.allContent}>
    
 <div className={styles.wrapper}>

{
  RatedMovies.length>0?
currentContent.map(element => (
 <MovieCard genres='Comedy, Drama, Romance' 
 rating={element.vote_average? element.vote_average.toString().slice(0,3) : '0'}
 id={element.id}
 popularity={
  element.popularity ? 
  (element.popularity > 1000 ? 
    '(' + element.popularity.toString()[0] + '.' +  element.popularity.toString()[1] + 'M)'
    :  '(' + element.popularity.toString().slice(0, 3) + 'K)')
  : '(0)'
}
   date={element.release_date ? element.release_date.slice(0, 4) : 'No date'} 
   title={element.original_title} 
   modal={<ModalRate ratedMoviesList={RatedMovies} setRatedMovie={rate} movieInfo={element}/>}
   img={<img width='119px' height='170px' 
    src={`https://image.tmdb.org/t/p/w500${element.poster_path}`}/>}>
    
    </MovieCard>
)
  ) : (<HaventRated/>)}
</div>
</div>
</div>
</Layout>



  );
};
export default Rated;

