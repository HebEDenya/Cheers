import React, { useState } from "react";
import {
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonAvatar,
    IonItem,
    IonInput,
    IonLabel,
    IonText,
    IonListHeader,
    IonContent,
    IonTextarea,
    IonCard,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonDatetime
    
  } from "@ionic/react";
  import './MyEvents.scss';
    
  const MyEvents: React.FC = () => {

    return (
      <>
      <IonPage>
      <IonContent fullscreen>
        <IonListHeader>
          <IonLabel className="color_update_profil">
            My Events
          </IonLabel>
        </IonListHeader>
        &nbsp;
        <IonCard>
            <img className="favorite_img_size" src="https://resize.programme-television.ladmedia.fr/r/670,670/img/var/premiere/storage/images/tele-7-jours/news-tv/marrakech-du-rire-un-edition-2019-survoltee-en-prime-sur-m6-4642827/95601501-1-fre-FR/Marrakech-du-rire-Un-edition-2019-survoltee-en-prime-sur-M6.jpg" alt="" />
        <IonCardHeader>
            <IonCardSubtitle>Marrakech du Rire</IonCardSubtitle>
            <IonCardTitle className="event_title">Marrakech</IonCardTitle>
            <IonDatetime className="event_time" value="2021-10-01" display-timezone="utc"></IonDatetime>
            <IonLabel>120 DT</IonLabel>
        </IonCardHeader>
        </IonCard>
        </IonContent>
      </IonPage>
      </>
    );
  };
  
  export default MyEvents;