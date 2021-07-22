import { IonContent, IonHeader, IonNote,IonItem,IonPage,IonCardContent,IonIcon,IonButton,IonImg,IonDatetime,useIonAlert, IonCardHeader, IonCard,IonListHeader,IonList,IonLabel,IonCardSubtitle,IonCardTitle } from '@ionic/react';
import { heart, heartCircleOutline, heartOutline } from 'ionicons/icons';
import { useState, useEffect } from 'react';
import axios from 'axios';
import moment from "moment";
import { homeOutline, personOutline, clipboardOutline, walkOutline } from 'ionicons/icons';
import './Tab3.scss';

const Tab3: React.FC = () => {
  const [heartButtonClick, setHeartButtonClick]= useState<{clicked:boolean, btn_Id: number | null}>({clicked:false, btn_Id:null })
  const [favoriteEvent, setFavoriteEvent]=useState<Array<any>>([])
  const [user_id, setUser_id]=useState<number>(1)
  const [present] = useIonAlert();

  useEffect(()=> {
    axios.get(`/api/favoriteevent/${user_id}`).then((result) => {
      setFavoriteEvent(result.data) 
    })
  }, [])

  useEffect(() => {
    setFavoriteEvent(favoriteEvent.filter((item)=> item.event_id !==heartButtonClick.btn_Id))
    if(heartButtonClick.btn_Id) {
      axios.delete(`/api/removefromfavorite/${heartButtonClick.btn_Id}/${user_id}`).then((result)=> {
         if (result.data ="Event removed") {
           present('Event removed successfully from favorite')
         }
      })
    }
  }, [heartButtonClick.btn_Id])

  return (
    <IonPage>
      <IonHeader>
      <IonList>
        <IonListHeader>
             <IonLabel className="favorite_title_size"  color="primary" >
             Favorites
         </IonLabel>
         </IonListHeader>
         </IonList>
      </IonHeader>
      &nbsp;
      <IonContent fullscreen >
      {favoriteEvent.length ? 
        favoriteEvent.map((item, index)=> { return (
        <IonCard key={index}>
            <img src={item.image} alt=""  className="favorite_img_size" />
        <IonCardHeader>
        <IonItem >
          <IonButton fill="outline" slot="end" onClick={()=> {setHeartButtonClick({clicked:true, btn_Id:item.event_id})}}> <IonIcon icon={heart} className="date_favoritr_color"/> </IonButton>
           </IonItem>
      &nbsp;
            <IonCardSubtitle>{item.title}</IonCardSubtitle>
            <IonCardTitle className="event_title">{item.location}</IonCardTitle>
            <IonDatetime className="event_time" value={moment(item.start_time).format("MMM D YYYY")} display-timezone="utc"></IonDatetime>
            <IonLabel>{item.price=== "free"? "Free" : item.price +'Dt'}</IonLabel>
        </IonCardHeader>
        </IonCard>
      
        )
        }) : 
        <>
        &nbsp;
        <IonContent>
           &nbsp;
          <IonLabel id="favorite_title_emptypage">Your favorite liste is empty </IonLabel>
        <IonCard>
          <IonItem href="/tab1" routerLink="/tab1">
            <IonIcon icon={homeOutline} slot="start" />
            <IonLabel>Go to home page</IonLabel>
          </IonItem>

          <IonItem href="#" routerLink="/tab2">
            <IonIcon icon={personOutline} slot="start" />
            <IonLabel>Go to your account</IonLabel>
          </IonItem>

          <IonItem href="#" routerLink="/myevents">
            <IonIcon icon={clipboardOutline} slot="start" />
            <IonLabel>Go to my event</IonLabel>
          </IonItem>

          <IonItem href="#" routerLink="/CreateEvent">
            <IonIcon icon={walkOutline} slot="start" />
            <IonLabel>Create an event</IonLabel>
          </IonItem>
        </IonCard>
        </IonContent>
        </>
    }
    </IonContent>
    </IonPage>
  );
};

export default Tab3;
