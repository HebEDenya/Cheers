import React, { useState } from 'react';
import {IonToolbar, IonLabel , IonPage, IonHeader, IonTitle,IonText,IonContent, IonInput,IonSelectOption, IonItem, IonList, IonSegment, IonIcon,IonSegmentButton, IonTextarea,IonListHeader, IonSelect } from '@ionic/react';
import { locate, wifi } from 'ionicons/icons';
import './CreateEvent.scss'

interface ContainerProps {
  
}

const CreateEventComponenet: React.FC<ContainerProps> = () => {
  const [title, setTitle] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [categorie, setCategorie] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [adress, setAdress] = useState<string | null>(null)



  return (
    <>
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle></IonTitle>
        </IonToolbar>
      </IonHeader>
      {/* {For the basic info} */}
      <IonContent>
       <IonList>
       <IonListHeader>
            <IonLabel color="">
            Basic Info
        </IonLabel>
        </IonListHeader>
        <IonItem lines="none">
        <IonText> Add details that highlight what makes it unique.</IonText>
        </IonItem>
      <IonItem>
        <IonLabel position="floating">Title</IonLabel>
        <IonInput type="text" name="title" value={title} onIonChange={e => setTitle(e.detail.value!)} 
        clearInput required spellcheck  maxlength= {50}> 
        </IonInput>
        </IonItem>
        <IonItem>
            <IonLabel position="floating">Description</IonLabel>
            <IonTextarea name="description" value={description} onIonChange={e => {setDescription(e.detail.value!); 
            }} clearOnEdit required spellcheck autoGrow maxlength= {2000}></IonTextarea>
          </IonItem>      
       </IonList>  
       &nbsp;

       <IonItem>
        &nbsp;
            <IonLabel>Categories </IonLabel>
            <IonSelect value={categorie} okText="Okay" cancelText="Dismiss" onIonChange={e => {setCategorie(e.detail.value); console.log(categorie);
            }}>
              <IonSelectOption value="music">Music</IonSelectOption>
              <IonSelectOption value="food&drink">Food & Drink</IonSelectOption>
              <IonSelectOption value="cultural">Cultural</IonSelectOption>
              <IonSelectOption value="sport">Sport</IonSelectOption>
              <IonSelectOption value="gaming">Gaming</IonSelectOption>
              <IonSelectOption value="other">Other</IonSelectOption>
            </IonSelect>
          </IonItem>
        &nbsp;
      {/* {For the localisation} */}
          <IonList>
       <IonListHeader>
          <IonLabel color="">
            Localisation
        </IonLabel>
        </IonListHeader>
        <IonItem lines="none">
        <IonText> Help people in the area discover your event and let attendees know where to show up.</IonText>
        </IonItem>
        </IonList>
        &nbsp;
        <IonSegment onIonChange={e => {setLocation( e.detail.value);}} color="primary" className="location_height_create">
          <IonSegmentButton value="venue" >
            <IonLabel>Venue</IonLabel><IonIcon icon={locate} />
          </IonSegmentButton>
          <IonSegmentButton value="online">
            <IonLabel>Online</IonLabel><IonIcon icon={wifi} />
          </IonSegmentButton>
        </IonSegment>
        &nbsp;
        {location === "venue" ? <IonItem>
        <IonLabel position="floating">Adress of the event </IonLabel>
        <IonInput type="text" name="adress" value={adress} onIonChange={e => setAdress(e.detail.value!)} 
        clearInput required > 
        </IonInput>
        </IonItem> : ""}
      </IonContent>
    </IonPage>
    </>
  );
};

export default CreateEventComponenet;