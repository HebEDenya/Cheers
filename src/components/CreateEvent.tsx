import React, { useState } from 'react';
import {IonToolbar, IonLabel , IonPage, IonHeader, IonTitle,IonText,IonContent, IonInput,IonSelectOption, IonItem, IonList, IonSegment, IonIcon,IonSegmentButton, IonTextarea,IonListHeader, IonSelect, IonDatetime, IonButton } from '@ionic/react';
import { locate, wifi,card, star } from 'ionicons/icons';
import './CreateEvent.scss'

interface ContainerProps {
  
}

const CreateEventComponenet: React.FC<ContainerProps> = () => {
  const [title, setTitle] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [categorie, setCategorie] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [adress, setAdress] = useState<string | null>(null)
  const [selectedStartDate, setSelectedStartDate] = useState<string>('');
  const[ selectEndDate,setSelectEndDate]= useState<string>('');
  const[ selectPrice,setSelectPrice]= useState<string>('');
  const [quantity, setQuantity] = useState<number | null>(null);




  return (
    <>
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle></IonTitle>
        </IonToolbar>
      </IonHeader>
      {/* {For the basic info} */}
      &nbsp;
      <IonContent>
       <IonList>
       <IonListHeader>
            <IonLabel className="color_title_create">
            Basic Info
        </IonLabel>
        </IonListHeader>
        <IonItem lines="none">
        <IonText className="color_subtitle_create" > Add details that highlight what makes it unique.</IonText>
        </IonItem>
      <IonItem className="input_create_Event">
        <IonLabel position="floating">Title</IonLabel>
        <IonInput type="text" name="title" value={title} onIonChange={e => setTitle(e.detail.value!)} 
        clearInput required spellcheck  maxlength= {50} > 
        </IonInput>
        </IonItem>
        <IonItem className="input_create_Event">
            <IonLabel position="floating">Description</IonLabel>
            <IonTextarea name="description" value={description} onIonChange={e => {setDescription(e.detail.value!); 
            }} clearOnEdit required spellcheck autoGrow maxlength= {2000}></IonTextarea>
          </IonItem>      
       </IonList>  
       &nbsp;

       <IonItem className="input_create_Event">
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
          <IonLabel className="color_title_create">
            Localisation
        </IonLabel>
        </IonListHeader>
        <IonItem lines="none">
        <IonText className="color_subtitle_create"> Help people in the area discover your event and let attendees know where to show up.</IonText>
        </IonItem>
        </IonList>
        &nbsp;
        <IonSegment onIonChange={e => {setLocation( e.detail.value);}} color="primary" className="location_height_create " >
          <IonSegmentButton value="venue" >
            <IonLabel>Venue</IonLabel><IonIcon icon={locate} />
          </IonSegmentButton>
          <IonSegmentButton value="online">
            <IonLabel>Online</IonLabel><IonIcon icon={wifi} />
          </IonSegmentButton>
        </IonSegment>
        &nbsp;
        {location === "venue" ? <IonItem className="input_create_Event">
        <IonLabel position="floating">Adress of the event </IonLabel>
        <IonInput type="text" name="adress" value={adress} onIonChange={e => setAdress(e.detail.value!) } 
        clearInput required > 
        </IonInput>
        </IonItem> : ""}
        &nbsp;
      {/* {For the Date and time} */}
        <IonList>
       <IonListHeader>
            <IonLabel className="color_title_create">
            Date and Time
        </IonLabel>
        </IonListHeader>
        <IonItem lines="none">
        <IonText className="color_subtitle_create" > Tell event-goers when your event starts and ends so they can make plans to attend.</IonText>
        </IonItem>     
       </IonList>  
       &nbsp;
       {/* {Start Time and sate } */}
        <IonItem lines="none" className="input_create_Event">
          <IonLabel>Event Start</IonLabel>
          <IonDatetime displayFormat=" MMM D, YYYY"  max="2099" min="2021" value={selectedStartDate} onIonChange={e => setSelectedStartDate(e.detail.value!)}></IonDatetime>
        </IonItem>
        <IonItem className="input_create_Event" >
          <IonLabel>Start time</IonLabel>
          <IonDatetime displayFormat="h:mm a" value={selectedStartDate} onIonChange={e => setSelectedStartDate(e.detail.value!)}></IonDatetime>
        </IonItem>

        {/* {end Time and date of event } */}
        <IonItem lines="none" className="input_create_Event">
          <IonLabel>Event End</IonLabel>
          <IonDatetime displayFormat=" MMM D, YYYY"  max="2099" min="2021" value={selectEndDate} onIonChange={e => setSelectEndDate(e.detail.value!)}></IonDatetime>
        </IonItem>
        <IonItem className="input_create_Event" lines="none">
          <IonLabel>End time</IonLabel>
          <IonDatetime displayFormat="h:mm a" value={selectEndDate} onIonChange={e => setSelectEndDate(e.detail.value!)}></IonDatetime>
        </IonItem>
       &nbsp;
       {/* {Price and Free } */}
       <IonList>
       <IonListHeader>
            <IonLabel className="color_title_create">
            Date and Time
        </IonLabel>
        </IonListHeader>
        <IonItem lines="none">
        <IonText className="color_subtitle_create" > Tell event-goers the price of your event.</IonText>
        </IonItem>     
       </IonList> 
       &nbsp;
        <IonSegment onIonChange={e => {setSelectPrice( e.detail.value);}} color="primary" className="location_height_create " >
          <IonSegmentButton value="free" >
            <IonLabel>Free</IonLabel><IonIcon icon={star} />
          </IonSegmentButton>
          <IonSegmentButton value="paied">
            <IonLabel>Paid</IonLabel><IonIcon icon={card} />
          </IonSegmentButton>
        </IonSegment>
        &nbsp;
        <IonItem className="input_create_Event">
        <IonLabel position="floating"> Available places or quantities  </IonLabel>
        <IonInput  name="quantity" value={quantity} onIonChange={e => setQuantity(+e.detail.value!) } 
        clearInput required > 
        </IonInput>
        </IonItem>
        &nbsp;
        <IonItem lines="none"  >
        &nbsp;
        <IonButton size="default"  className="button_create_event">Cancel</IonButton>
        <IonButton size="default"  className="button_create_event">Confirme</IonButton>
        </IonItem>
        &nbsp;
        
      </IonContent>     
    </IonPage>
    </>
  );
};

export default CreateEventComponenet;

 