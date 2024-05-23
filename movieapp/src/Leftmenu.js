import React from 'react';
import { useState, useEffect } from 'react';
import { Group } from '@mantine/core';
import classes from './styles/LeftMenu.module.css';
import { useNavigate } from 'react-router-dom';
const data = [
  { link: '/', label: 'Movie', },
  { link: '/ratedmovies', label: 'Rated movies',  },
];

function Leftmenu(){
  const router = useNavigate()
  const [active, setActive] = useState('');
  useEffect(() => {
    console.log(active)
    if (active) {
      router(active === 'Movie' ? '/' : '/ratedmovies');
    }
  }, [active]);

console.log()
  const links = data.map((item) => (
    <div
      
      key={item.label}
      onClick={(event) => {
          setActive(item.label) ;
       
      }}
  className={active==item.label? classes.link +' '+ classes.linkActive : classes.link}
      >
   
      
      <span>{item.label}</span>
    </div>
  ));

  return (
    <div className={classes.barWrapper}>
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        <Group className={classes.header} justify="space-between">
         
          
        </Group>
        <div className={classes.pic}></div>
        {links}
      </div>

   
    </nav>
    </div>
  );
}

export default Leftmenu;