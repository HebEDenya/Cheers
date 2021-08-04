import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {IonToolbar,useIonAlert, IonLabel ,IonFooter,IonSpinner, IonTitle,IonPage, IonBackButton, IonButtons,IonHeader,IonProgressBar,IonText,IonContent, IonInput,IonSelectOption, IonItem, IonList, IonSegment, IonIcon,IonSegmentButton, IonTextarea,IonListHeader, IonSelect, IonDatetime, IonButton, IonLoading } from '@ionic/react';
import { locate, wifi,card, star,chevronForwardOutline,  chevronBackOutline,calendar, time } from 'ionicons/icons';
import './CreateEvent.scss'
import ImageContainer from './CreateEventImage';
import axios from 'axios';
import moment from 'moment';

interface props {
  setCoinsUser: (any) => any;
  coinsUser:number;
  user_id:number;
  setEventAdded:(any) => any;
  categories: any[]
}


const CreateEventComponenet: React.FC<props>= ({setCoinsUser,coinsUser, user_id, setEventAdded, categories}) => {
  const [present] = useIonAlert();
  const [spiner, setSpiner] = useState<boolean>(false)
  const [title, setTitle] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [categorie, setCategorie] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [adress, setAdress] = useState<string | null>(null)
  const [selectedStartDate, setSelectedStartDate] = useState<string>('');
  const [selectEndDate,setSelectEndDate]= useState<string>('');
  const [selectPrice,setSelectPrice]= useState<string>('');
  const [quantity, setQuantity] = useState<number | null>(null);
  const [price, setPrice] = useState<number | null>(null);
  const [buttonClick, setButtonClick] = useState<boolean | null>(false);
  const [switchPagesCreateEvent, setSwitchPageCreateEvent]= useState<boolean>(false);
  const [image, setImage] = useState<string>('https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/55a27373859093.5ea2b801a2781.png');
  
  const history = useHistory()
  if(buttonClick === null) {
    history.push('/tab2')
    setButtonClick(false)
  }

  //refresh 
  const refreshInfoAfterSubmit = () => {
    setTitle('');
    setDescription('');
    setCategorie('');
    setLocation('');
    setAdress(null);
    setSelectedStartDate('');
    setSelectEndDate('');
    setSelectPrice('');
    setQuantity(null);
    setPrice(null);
    setImage('https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/55a27373859093.5ea2b801a2781.png')
  }

  //Verify if the mandatory fields are filled 
  const verifyInput = () => {
    let verify = true;
    if (!title || !description || !categorie || !location  || !selectedStartDate || !selectEndDate || !selectPrice ) {
      verify = false;
    } if (selectPrice !=="Free" && !price) {
      verify = false;
    } if (location ==="venue" && !adress) {
      verify= false;
    } 
    return verify;
  }
  //to post an event 
  const postReaquestHandler = () => {
    let selectedAdress = adress;
    let eventPrice = ""+price;
    let places = quantity;
    if (location === "Online") {
      selectedAdress = "Online"
    } if (selectPrice === "Free") {
        eventPrice = selectPrice;
    }  if (places === null) {
      places = -1;
    }
    let infoStore = {
      title: title, 
      description: description, 
      category:categorie, 
      location: selectedAdress,
      price:eventPrice,
      start_time: selectedStartDate,
      end_time: selectEndDate,
      available_places : places,
      image: image,
      user_id:user_id,
      
    } 
    axios.post('/api/postEvent', infoStore).then((result) => {
      
      if(result.statusText === "Created") {
        setEventAdded(true)
        setSpiner(false)
        setCoinsUser(coinsUser-2)
        setButtonClick(true)
        setQuantity(null);
        refreshInfoAfterSubmit()
        present('Event created successfully 👌')
      } 
    }).catch(e=> { present('An error has occurred ❌', [{ text: 'Ok' }]); setSpiner(false)
    })
  }

  

  return (
    <>
    <IonPage>
    <IonHeader>
      <IonToolbar>
    <IonTitle>Create Event</IonTitle>
    <IonButtons slot="start">
      <IonBackButton className="back_button" text="" color="dark"/>
      </IonButtons>
            
      </IonToolbar>
    </IonHeader>
        
      {!switchPagesCreateEvent? 
       <IonContent>
         <IonToolbar>
      {!switchPagesCreateEvent? <IonProgressBar value={0.5} className="progrssiveBar_createEvent"> </IonProgressBar> : <IonProgressBar value={1} className="progrssiveBar_createEvent"> </IonProgressBar> }
        </IonToolbar>
           {/* {For the basic info} */}
        <IonList>
        <IonListHeader>
             <IonLabel className="color_title_create">
             Basic Info<span className="obligatoire">*</span>
         </IonLabel>
         </IonListHeader>
         <IonItem lines="none">
         <IonText className="color_subtitle_create" > Add details that highlight what makes it unique.</IonText>
         </IonItem>
       <IonItem className="input_create_Event">
         <IonLabel position="floating" className="color_subtitle_create">Title<span className="obligatoire">*</span></IonLabel>
         <IonInput type="text" name="title" value={title} onIonChange={e => {setTitle(e.detail.value!);}} 
         clearInput required spellcheck  maxlength= {50} > 
         </IonInput>
         </IonItem>
         <IonItem className="input_create_Event">
             <IonLabel position="floating" className="color_subtitle_create">Description <span className="obligatoire">*</span></IonLabel>
             <IonTextarea name="description" value={description} onIonChange={e => {setDescription(e.detail.value!); 
             }} clearOnEdit required spellcheck autoGrow maxlength= {2000}></IonTextarea>
           </IonItem>      
        </IonList>  
        &nbsp;
 
        <IonItem className="input_create_Event">
         &nbsp;
             <IonLabel className="color_subtitle_create">Categories <span className="obligatoire">*</span> </IonLabel>
             <IonSelect value={categorie} okText="Okay"  onIonChange={e => {setCategorie(e.detail.value); }}>
               <IonSelectOption value="Others">Others</IonSelectOption>
               {categories&& categories.map((category,i) => <IonSelectOption key={i} value={category.category_name}>{category.category_name}</IonSelectOption>)}
             </IonSelect>
           </IonItem>
        &nbsp;
           <IonItem className="input_create_Event">
         <ImageContainer image={image} setImage={setImage}/>
         
         </IonItem>
         &nbsp;
       {/* {For the localisation} */}
           <IonList>
        <IonListHeader>
           <IonLabel className="color_title_create">
             Localisation<span className="obligatoire">*</span>
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
           <IonSegmentButton value="Online">
             <IonLabel>Online</IonLabel><IonIcon icon={wifi} />
           </IonSegmentButton>
         </IonSegment>
         {location === "venue" ? <IonItem className="input_create_Event">
         <IonLabel position="floating" className="color_subtitle_create">Address of the event<span className="obligatoire">*</span> </IonLabel>
         <IonInput type="text" name="adress" value={adress} onIonChange={e => setAdress(e.detail.value!) } 
         clearInput required > 
         </IonInput>
         </IonItem> : ""}
         &nbsp;         

         </IonContent> 
      : <IonContent>
        <IonToolbar>
      {!switchPagesCreateEvent? <IonProgressBar value={0.5} className="progrssiveBar_createEvent"> </IonProgressBar> : <IonProgressBar value={1} className="progrssiveBar_createEvent"> </IonProgressBar> }
        </IonToolbar>
      {/* {For the Date and time} */}
        <IonList>
       <IonListHeader>
            <IonLabel className="color_title_create">
            Date and Time<span className="obligatoire">*</span>
        </IonLabel>
        </IonListHeader>
        <IonItem lines="none">
        <IonText className="color_subtitle_create" > Tell event-goers when your event starts and ends so they can make plans to attend.</IonText>
        </IonItem>     
       </IonList>  
       &nbsp;
       {/* {Start time and date of the event  } */}
        <IonItem lines="none" className="input_create_Event">
          <IonLabel className="color_subtitle_create">Event Start</IonLabel><IonIcon size="small" icon={calendar} />
          <IonDatetime displayFormat=" MMM D, YYYY"  max="2099" min={moment().format()} value={selectedStartDate} onIonChange={e => setSelectedStartDate(e.detail.value!)}></IonDatetime>
        </IonItem>
        <IonItem className="input_create_Event"  >
          <IonLabel className="color_subtitle_create">Start time</IonLabel><IonIcon size="small" icon={time} />
          <IonDatetime displayFormat="HH:mm "   value={selectedStartDate} onIonChange={e => setSelectedStartDate(e.detail.value!)}></IonDatetime>
        </IonItem>
        {/* {ent date and time of the event } */}
        <IonItem  className="input_create_Event" lines="none">
          <IonLabel className="color_subtitle_create">Event End</IonLabel><IonIcon size="small"icon={calendar} />
          <IonDatetime displayFormat=" MMM D, YYYY"  max="2099" min={moment().format()} value={selectEndDate} onIonChange={e => setSelectEndDate(e.detail.value!)}></IonDatetime>
        </IonItem>
        <IonItem className="input_create_Event" lines="none">
          <IonLabel className="color_subtitle_create">End time</IonLabel><IonIcon size="small" icon={time} />
          <IonDatetime displayFormat="HH:mm " value={selectEndDate} onIonChange={e => setSelectEndDate(e.detail.value!)}></IonDatetime>
        </IonItem>
       &nbsp;
       {/* {Price and Free } */}
       <IonList>
       <IonListHeader>
            <IonLabel className="color_title_create">
            Price or Free<span className="obligatoire">*</span>
        </IonLabel>
        </IonListHeader>
        <IonItem lines="none">
        <IonText className="color_subtitle_create" > Tell event-goers the price of your event.</IonText>
        </IonItem>     
       </IonList> 
       &nbsp;
        <IonSegment onIonChange={e => {setSelectPrice( e.detail.value);}} color="primary" className="location_height_create " >
          <IonSegmentButton value="Free" >
            <IonLabel>Free</IonLabel><IonIcon icon={star} />
          </IonSegmentButton>
          <IonSegmentButton value="paied">
            <IonLabel>Paid</IonLabel><IonIcon icon={card} />
          </IonSegmentButton>
        </IonSegment>
        &nbsp;
        {selectPrice === "paied" ? <IonItem className="input_create_Event">
        <IonLabel position="floating" className="color_subtitle_create"> Price <span className="obligatoire">*</span></IonLabel>
        <IonInput type="number"  name="price" value={price} onIonChange={e => setPrice(+e.detail.value!) } 
        clearInput required > 
        </IonInput>
        </IonItem> : ""}
        <IonItem className="input_create_Event">
        <IonLabel  position="floating" className="color_subtitle_create"> Available places or quantities  </IonLabel>
        <IonInput type="number" name="quantity"  value={quantity} onIonChange={e => setQuantity(+e.detail.value!) } 
        clearInput  > 
        </IonInput>
        </IonItem>
        &nbsp;
        <IonItem lines="none" >
        &nbsp;
        {!buttonClick ? <><button onClick={()=> {setButtonClick(null); setSwitchPageCreateEvent(false);refreshInfoAfterSubmit();}} className="second_button_create_event">Cancel</button>
         <IonButton  size="default"  type="submit" className="button_create_event" 
         onClick={()=> { if (verifyInput() && user_id) {  postReaquestHandler(); setSpiner(true);} 
          else if (!verifyInput()){ present('All mandatory * fields must be filled', [{ text: 'Ok' }]) } }}>Confirme</IonButton>
        </>:
        <><button onClick={()=> {setButtonClick(null); setSwitchPageCreateEvent(false); }} className="second_button_create_event" > Account</button>
        <IonButton  size="default" routerLink="/myevents"  className="button_create_event" onClick={()=> {setButtonClick(false); setSwitchPageCreateEvent(false); }}>View Events</IonButton>
       </>
      
      }
      </IonItem>
        &nbsp;
        <IonLoading
        isOpen={spiner}
        message="Loading... 🕔"
        onDidDismiss={()=> setSpiner(false)}
        ></IonLoading>
      </IonContent> 
    }
    {!buttonClick?
    <IonFooter className="ion-no-border">
      <IonToolbar>
      {!switchPagesCreateEvent? <IonItem className="icon_next_createEvent" lines="none" onClick={() =>{setSwitchPageCreateEvent(true)}}>
      <IonIcon size="large" color="dark" icon={chevronForwardOutline}  className="icon_next_createEvent"/> 
      </IonItem>: <IonItem  lines="none" onClick={() =>{setSwitchPageCreateEvent(false)}}>
      <IonIcon size="large" color="dark" icon={chevronBackOutline}  /> 
      </IonItem>}
      </IonToolbar>
    </IonFooter> :""}
    </IonPage>
    </>
  );
};

export default CreateEventComponenet;

 