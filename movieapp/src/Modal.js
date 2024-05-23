import { useDisclosure } from '@mantine/hooks';
import { Modal, Button, UnstyledButton } from '@mantine/core';
import styles from './styles/Modal.module.css';
import { Rating } from '@mantine/core';
import { useState, useEffect } from 'react';

function ModalRate({movieInfo, rated, ratedMoviesList, setRatedMovie}) {
  
     useEffect(() =>{
    ratedBooleanChanger(false)
    mark=''}, [movieInfo])
     
      const ratedClassHandler = () => {
       let bool=false;
       ratedMoviesList.forEach(elem => {
        if (elem.original_title===movieInfo.original_title){
          bool=true;
        }
       
       })
        return bool ? styles.buttonStarRated : styles.buttonStarUnrated
      }
      const markHandler = () => {
        let mark1;
        ratedMoviesList.forEach(elem => {
         if (elem.original_title===movieInfo.original_title){
           mark1=elem.mark;
         }
        
        })
         return mark1
       }
      const [opened, { open, close }] = useDisclosure(false);
     let mark='';
     let [ratedBoolean, ratedBooleanChanger]=useState(rated)
     let [valueBeforeSave, valueBeforeSaveChanger]=useState('')
      return (
        <>
          <Modal.Root opened={opened} onClose={close}>
            <Modal.Overlay/>
            <Modal.Content style={{height: '218px', marginTop: '8%', borderRadius: '8px' }}>
              <Modal.Header>
                <Modal.Title>Your rating</Modal.Title>
                <Modal.CloseButton />
               
              </Modal.Header>
               <hr style={{marginTop: '0px' }}/>
              <Modal.Body><p style={{fontWeight: '700', marginBottom: '0px'}}>{movieInfo.original_title}</p></Modal.Body>
            <Rating defaultValue={+valueBeforeSave} onChange={(value) => valueBeforeSaveChanger(value)} size={40} count={10} style={{margin: '0 auto'}}/>
            <Button className={styles.buttonSave}
             onClick={ () => {
              close()
              let bool=false
              ratedMoviesList.forEach(elem => {
                if (elem.original_title===movieInfo.original_title){
                  bool=true;
                }
               
               })
               mark=valueBeforeSave;
               if (!bool){
                 
            if (ratedBoolean===false || valueBeforeSave!==mark){
                
                  ratedBooleanChanger(true);
                  setRatedMovie([...ratedMoviesList, {...movieInfo, mark: mark, } ])
                  
                }
                 }
            
             }
             } >Save</Button>

            <UnstyledButton onClick={() => {
              close()
              let isInArray=false;
              ratedMoviesList.forEach(element=>{
                if (element.original_title===movieInfo.original_title){
                   isInArray=true
                }
              })

                let ratedMoviesListForDeleting;
                if (isInArray){
                ratedMoviesList.forEach(element=>{
                  if (element.original_title===movieInfo.original_title){
                     ratedMoviesListForDeleting=ratedMoviesList.filter(index => index !==element)
                  }
                })
                setRatedMovie(ratedMoviesListForDeleting);
                }
              ratedBooleanChanger(false)
              mark=''
              valueBeforeSaveChanger('') 
            }}
              className={styles.buttonRemove}>Remove rating</UnstyledButton>
            </Modal.Content>
          </Modal.Root>
    <Button onClick={open} 
    className={ratedClassHandler()}>
      {markHandler()}
       
      
    </Button>
        </>
      );
    }
      
  
export default ModalRate;