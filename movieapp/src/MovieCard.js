import React from "react";
import styles from './styles/Cards.module.css';
import { useNavigate } from "react-router-dom";
function MovieCard({img, title, date, rating, genres, popularity, modal, id}){
    const router = useNavigate();
    return(
    
<div onClick={() => { 
         router(`/${id}`) 
    }} className={styles.cardWrapper}>
    
 <div className={styles.poster}>{img}</div>
<div className={styles.cardInside}>
 <p className={styles.title}> {
 title.slice(0, 19)}
 { title.length>19?
 <div>
 {title.slice(19, 38)}
 { title.length>38?
 <span>
 <br/>&nbsp;
 {title.slice(38, 57)}</span> : null}
 <br/>&nbsp;
 {title.slice(57)} </div>:null
 }</p>
 <p className={styles.date}> {date}</p>
 <p className={styles.rating}> 
 <div className={styles.star}/> 
 <div className={styles.mark}>{rating} <div className={styles.voters}>{popularity}</div></div>
 </p>
    
    <p className={styles.genres}>
      <span className={styles.greyText}>Genres </span>
      <span className={styles.darkText}>{' '+genres}</span></p>
 

</div>
<div onClick={(event => event.stopPropagation() )} className={styles.ModalRate}>{modal}</div>

</div>

 )
}
export default MovieCard;