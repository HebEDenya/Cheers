import React, { useState, useEffect } from "react";
import {
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonLabel,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonDatetime,
  IonButtons,
  IonBackButton,
  IonButton
} from "@ionic/react";
import axios from 'axios';

interface props {
  user_id:number
  event_id:number
}
const SingleCategory: React.FC<props> = ({user_id, event_id}) => {
   const [CatName, setCatName] = useState('');
    return (
      <>
        <IonPage>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Category Name</IonTitle>
              <IonButtons slot="start">
                <IonBackButton text="Back" color="dark"/> 
              </IonButtons>
            </IonToolbar>
          </IonHeader>
        </IonPage>
      </>
    );
  };
  
  export default SingleCategory;
  