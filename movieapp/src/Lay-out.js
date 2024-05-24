import React from 'react';
import Leftmenu from './Leftmenu';
import styles from './styles/BurgerMenu.module.css'
import { useState } from 'react'; 

function Layout({ children }) {
  let [isOpened, burgerChanger]=useState(false);
  
function burgertogle(){
 burgerChanger(!isOpened)
}
return (
    <div style={{display:"flex", justifyContent: 'center',  backgroundColor: '#F5F5F6', maxWidth:'2700px'}}>
      <Leftmenu isOpened={isOpened} style={{position: 'fixed'}}/> 
      <main><span onClick={burgertogle} className={styles.burgerButton}>&#9776;</span>{children}</main>
      
    </div>
  );
}

export default Layout;
