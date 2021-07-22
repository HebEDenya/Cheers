import { IonContent, IonHeader, IonNote,IonItem,IonPage,IonCardContent,IonIcon,IonButton,IonImg,IonDatetime, IonCardHeader, IonCard,IonListHeader,IonList,IonLabel,IonCardSubtitle,IonCardTitle } from '@ionic/react';
import { heart, heartOutline } from 'ionicons/icons';
import { useState, useEffect } from 'react';
import axios from 'axios';
import moment from "moment";
import { home, person, clipboard, walk } from 'ionicons/icons';
import './Tab3.scss';

const Tab3: React.FC = () => {
  const [heartButtonClick, setHeartButtonClick]= useState<{clicked:boolean, btn_Id: number | null}>({clicked:false, btn_Id:null })
  const [favoriteEvent, setFavoriteEvent]=useState<Array<any>>([])

  useEffect(()=> {
    axios.get('/api/favoriteevent').then((result) => {
      setFavoriteEvent(result.data) 
    })
  }, [])

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
        <IonItem lines="none">
          <IonButton fill="outline" slot="end" onClick={()=> setHeartButtonClick({clicked:true, btn_Id:index})}> {!heartButtonClick.clicked ?<IonIcon icon={heart}className="date_favoritr_color" />:<IonIcon icon={heartOutline} className="date_favoritr_color"/> }</IonButton>
           </IonItem>
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
            <IonIcon icon={home} slot="start" />
            <IonLabel>Go to home page</IonLabel>
          </IonItem>

          <IonItem href="#" routerLink="/tab2">
            <IonIcon icon={person} slot="start" />
            <IonLabel>Go to your account</IonLabel>
          </IonItem>

          <IonItem href="#" routerLink="/myevents">
            <IonIcon icon={clipboard} slot="start" />
            <IonLabel>Go to my event</IonLabel>
          </IonItem>

          <IonItem href="#" routerLink="/CreateEvent">
            <IonIcon icon={walk} slot="start" />
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
