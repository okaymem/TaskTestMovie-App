import React from "react";
import styles from './styles/FilmDescription.module.css'
function FilmDescription({videokey, description, production_companies}){
    return(
<div className={styles.filmDescriptionWrapper}>
    <h3 className={styles.title}>Trailer</h3>
{videokey ? <iframe className={styles.video} src={`https://www.youtube.com/embed/${videokey}`} frameborder="0" allowfullscreen></iframe> 
:null}
<hr className={styles.line}/>
<h3 className={styles.title} style={{marginTop:'0px'}}>Description</h3>
<p className={styles.description}>{description}</p>
<hr className={styles.line}/>
<h3 className={styles.title}>Production</h3>
 {production_companies? production_companies.map((company) =>{
 return(
    <div className={styles.companies}>
   {company.logo_path? 
   <div className={styles.companyLogo}><img style={{marginLeft: '17%',marginTop: '33%'}} width='30px' src={`https://image.tmdb.org/t/p/w500${company.logo_path}`}/></div> 
   : null}
   <p className={styles.companyName}>{company.name}</p>
   </div>
 )
}) : null}
</div>
    )
}
export default FilmDescription