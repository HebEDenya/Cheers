
import { useState } from 'react';
import {  IonPage,  } from '@ionic/react';
import hotocheerse from  './photos/photocheerse.png';
import { IonToolbar, IonImg } from '@ionic/react';
// import './FirstPage.scss';
const FirstPage: React.FC = (props) => {
  
    return (
      <IonPage>
        <IonToolbar></IonToolbar>
        <IonImg src={hotocheerse} onClick={()=> {props.setPageSwitcher(true)}}/>
      </IonPage>
    );
  };
  
  export default FirstPage;
  