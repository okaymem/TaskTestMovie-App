import React from "react";
import { useState, useEffect } from 'react';
import { Pagination } from "@mantine/core";

import MovieCard from "./MovieCard";
import ModalRate from "./Modal";
import Select from "./Select";
import { Loader } from "@mantine/core";

import classes from './styles/Cards.module.css';

 function MainPage() {
  const [page, pageChanger]=useState(1)
const [ratedMoviesList, setRatedMovie]=useState( JSON.parse(localStorage.getItem('ratedMoviesList')) || [])
let [gen, changegen]=useState('');
let [year, changeyear]=useState('');
let [genres, setGenres]=useState([])
let [isLoadind, loadingChanger] = useState(true)
const years = [
{value:"1990",label:"1990"},
{value:"1991",label:"1991"},
{value:"1992",label:"1992"},
{value:"1993",label:"1993"},
{value:"1994",label:"1994"},
{value:"1995",label:"1995"},
{value:"1996",label:"1996"},
{value:"1997",label:"1997"},
{value:"1998",label:"1998"},
{value:"1999",label:"1999"},
{value:"2000",label:"2000"},
{value:"2001",label:"2001"},
{value:"2002",label:"2002"},
{value:"2003",label:"2003"},
{value:"2004",label:"2004"},
{value:"2005",label:"2005"},
{value:"2006",label:"2006"},
{value:"2007",label:"2007"},
{value:"2008",label:"2008"},
{value:"2009",label:"2009"},
{value:"2010",label:"2010"},
{value:"2011",label:"2011"},
{value:"2012",label:"2012"},
{value:"2013",label:"2013"},
{value:"2014",label:"2014"},
{value:"2015",label:"2015"},
{value:"2016",label:"2016"},
{value:"2017",label:"2017"},
{value:"2018",label:"2018"},
{value:"2019",label:"2019"},
{value:"2020",label:"2020"},
{value:"2021",label:"2021"},
{value:"2022",label:"2022"},
{value:"2023",label:"2023"},
{value:"2024",label:"2024"}
]
const ratings = [ '1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
let [content, chcont]=useState([])
let [rateFrom, rateFromHandle] = useState('')
let [rateTo, rateToHandle] = useState('')
const sortbyvariants=[
  {label: 'Most Popular', variantForRequest: 'popularity.desc'},
  {label: 'Least Popular', variantForRequest: 'popularity.asc'},
  {label: 'Most Rated', variantForRequest: 'vote_average.desc'},
  {label: 'Least Rated', variantForRequest: 'vote_average.asc'},
  {label: 'Most Voted', variantForRequest: 'vote_count.desc'},
  {label: 'Least Voted', variantForRequest: 'vote_count.asc'}
]
let [sortby, sortbyHandler] = useState('')

useEffect(()=>{

  const fetchAllData = async () => {
    try {
        loadingChanger(true);
        await getContent();
        await getGenres();
    } catch (error) {
        console.error('Error:', error);
    } finally {
        loadingChanger(false);
    }
};
  fetchAllData();

  async function getContent() {
    try {
        const response = await fetch(`https://task-test-movie-app-deploy.vercel.app/?genre=${gen}&page=${page}&rateFrom=${rateFrom}&rateTo=${rateTo}&sortby=${sortby}&year=${year}`);
        const { results } = await response.json();
        console.log(results);
        chcont(results)
        
    } catch (error) {
        console.error('Error:', error);
    } 
}

  async function getGenres() {
    try {
        const response = await fetch(`https://task-test-movie-app-deploy.vercel.app/getgenres`);
        const genres = await response.json();
        console.log(genres);
        setGenres(genres.genres.map(genre => ({value:genre.id, label:genre.name})))
            
      } catch (error) {
        console.error('Error:', error);
    } 
}
  

}, [gen, year, rateFrom, rateTo, sortby, page, ])

useEffect(()=>{
localStorage.setItem('ratedMoviesList', JSON.stringify(ratedMoviesList))
}, [ratedMoviesList])

  const handleCurrencyChange = (value) => {
    changegen(value)
   // setSelectedCurrency(value);
    
  };
  const yearchanger = (value) => {
   changeyear(value)
   //setSelectedCurrency(value);
   
 };

 const ratefromChanger = (value) => {
  rateFromHandle(value)
 }
 const ratetoChanger = (value) => {
  rateToHandle(value)
 }
  
 const sortbyChanger = (value) => {
  if (value==='Most Popular'){
    sortbyHandler('popularity.desc')
  } else if (value==='Least Popular'){
    sortbyHandler('popularity.asc')
  } else if (value==='Most Rated'){
  sortbyHandler('vote_average.desc')
} else if (value==='Least Rated'){
  sortbyHandler('vote_average.asc')
  } else if (value==='Most Voted'){
  sortbyHandler('vote_count.desc')
  } else {
    sortbyHandler('vote_count.asc') 
  }
 }

  return (
   <div className={classes.allContent}>
    <h1 style={{marginRight:'auto',marginLeft:'113px'}}>Movies</h1>
    <div className={classes.selects}>
    <div><p className={classes.sortTitle}>Genres</p><Select className={classes.selectss} title='Select genre' selectChanger={handleCurrencyChange} selectType={genres}/></div>
    <div><p className={classes.sortTitle}>Release year</p><Select title='Select release year' selectChanger={yearchanger} selectType={years}/></div> 
    <div><p className={classes.sortTitle}>Ratings</p><Select style={{width: '3px'}}  title='From' selectType={ratings} selectChanger={ratefromChanger}/></div> 
    <div  className={classes.sortTo}><Select title='To' selectType={ratings} selectChanger={ratetoChanger}/></div> 
     <button onClick={() => {
       rateFromHandle('')
       rateToHandle('')
       changegen('')
       changeyear('')
       sortbyChanger('Most Popular')
     }} 
     className={classes.resetFiltersButton}>Reset filters</button>
    <div className={classes.sortSelect}><p className={classes.sortTitle}>Sort by</p><Select  selectChanger={sortbyChanger} selectType={sortbyvariants} title='Sort by'/></div> 
    </div>

{isLoadind?
     <Loader style={{margin: '20px'}}/> : <div className={classes.wrapper}>{content.map(element=>

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
    modal={<ModalRate setRatedMovie={setRatedMovie} ratedMoviesList={ratedMoviesList} movieInfo={element}/>}
    img={<img width='119px' height='170px' 
     src={`https://image.tmdb.org/t/p/w500${element.poster_path}`}/>}>
     
     </MovieCard>)
}
 
</div>
 }
 
 <Pagination color="#9854F6" total={500} value={page} onChange={pageChanger} className={classes.pagination}/>
 </div>
    
  );
}

export default MainPage;

