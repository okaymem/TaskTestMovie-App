import React from "react";
import styles from './styles/HaventRated.module.css'
import { useNavigate } from "react-router-dom";

function HaventRated(){
let route=useNavigate()
return (
    <div className={styles.wrapper}>
         <div className={styles.image}></div>
         <h2>You haven't rated any films yet</h2>
         <button className={styles.buttonBack} onClick={() => {route('/') }}>Find movies</button>
    </div>
   
)
}
export default HaventRated