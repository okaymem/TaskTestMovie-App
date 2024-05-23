import React from 'react';
import Leftmenu from './Leftmenu';


function Layout({ children }) {
  return (
    <div style={{display:"flex", justifyContent: 'center',  backgroundColor: '#F5F5F6', maxWidth:'2700px'}}>
     <Leftmenu style={{position: 'fixed'}}/>
      <main>{children}</main>
     
    </div>
  );
}

export default Layout;
