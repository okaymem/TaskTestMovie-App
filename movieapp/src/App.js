import React, { useState,useEffect } from 'react';
import "@mantine/core/styles.css";
import MainPage from './MainPage';
import Layout from './Lay-out';
console.log(<Layout/>)
function App(){
  return(
   <div>
<Layout>
<MainPage/>
</Layout>


</div>
  );
};
export default App;

