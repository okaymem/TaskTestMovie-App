import React from "react";
import styles from './styles/BigCards.module.css';
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
function MovieCardBig({img, title, date, rating, premiere, budget, grossWorldWide, duration, genres, popularity, modal, id,}){
   function commasInsert (budget) {
        let stringBudget=budget.toString();
    let result = '';
    for (let i = 0; i < stringBudget.length; i++) {
    result += stringBudget[i];
    if ((i + 1)%3==0 && i!==stringBudget.length - 1) {
      result += ',';
        }
    }
    return result;
}
    return(
    
<div className={styles.cardWrapper}>
    
 <div className={styles.poster}>{img}</div>
<div className={styles.cardInside}>
 <p className={styles.title}> {title}</p>
 <p className={styles.date}> {date}</p>
 <p className={styles.rating}> 
 <div className={styles.star}/> 
 <div className={styles.mark}>{rating} <div className={styles.voters}>{popularity}</div></div>
 </p>
 <div style={{marginLeft:'16px'}}>
    {duration?
     <p className={styles.genres}>
        <span className={styles.greyText}>Duration </span> 
        <span className={styles.darkText}>{Math.floor(duration/60)+'h '+duration%60+'m'}</span>
        </p> 
        : null}
    {duration? <p className={styles.genres}>
        <span className={styles.greyText}>Premiere</span>
        <span className={styles.darkText}>{months[parseInt(premiere.slice(5,7))-1] +' '+premiere.slice(8) +', ' +premiere.slice(0,4)}</span>
         </p> : null}
    {budget? <p className={styles.genres}>
        <span className={styles.greyText}>Budget</span>
         <span className={styles.darkText}>${commasInsert(budget)}</span>
         </p> 
         : null}
    {grossWorldWide? <p className={styles.genres}>
        <span className={styles.greyText}>Gross worldwide</span> 
        <span className={styles.darkText}>${commasInsert(grossWorldWide)}</span>
        </p> 
        : null}
    <p className={styles.genres}>
        <span className={styles.greyText}>Genres</span>
        <span className={styles.darkText}>{genres}</span> 
        </p>
  </div>
 

</div>
<div className={styles.ModalRate}>{modal}</div>

</div>

 )
}
export default MovieCardBig;