import { IonContent, IonHeader, IonCol,IonTitle,IonPage,IonCardContent,IonIcon,IonButton,IonImg,IonDatetime,useIonAlert, IonCardHeader, IonCard,IonListHeader,IonList,IonLabel,IonCardSubtitle,IonCardTitle, IonGrid, IonRow, IonToolbar } from '@ionic/react';
import { heart} from 'ionicons/icons';
import { useState, useEffect } from 'react';
import axios from 'axios';
import moment from "moment";
import './Tab3.scss';

interface ContainerProps {
  user_id: number
}

const Tab3: React.FC<ContainerProps> = ({user_id}) => {
  const [heartButtonClick, setHeartButtonClick]= useState<{clicked:boolean, btn_Id: number | null}>({clicked:false, btn_Id:null })
  const [favoriteEvent, setFavoriteEvent]=useState<Array<any>>([])
  const [present] = useIonAlert();

  useEffect(()=> {
    if (user_id) {
    axios.get(`/api/favoriteevent/${user_id}`).then((result) => {
      setFavoriteEvent(result.data) 
    })}
  }, [])
  useEffect(() => {
    if (user_id) {
    setFavoriteEvent(favoriteEvent.filter((item)=> item.event_id !==heartButtonClick.btn_Id))
    if(heartButtonClick.btn_Id) {
      axios.delete(`/api/removefromfavorite/${heartButtonClick.btn_Id}/${user_id}`).then((result)=> {
         if (result.data ="Event removed") {
           present('Event removed successfully from favorite')
         }
      })
    }}
  }, [heartButtonClick.btn_Id])

  return (
    <>
    <IonPage>
      <IonHeader>
      <IonListHeader>
    <IonLabel className="favorite_title_size" color="primary">
    Favorites
    </IonLabel>
    </IonListHeader>
    </IonHeader>
      &nbsp;
      <IonContent>
      {favoriteEvent.length ? 
        favoriteEvent.map((item, index)=> { return (
        <IonCard key={index}>
            <img src={item.image} alt=""  className="favorite_img_size" />
        <IonCardHeader>
        <IonGrid>
            <IonCardSubtitle>{item.title}</IonCardSubtitle>
            <IonCardTitle className="event_title">{item.location}</IonCardTitle>
            <IonRow>
            <IonDatetime className="event_time" value={moment(item.start_time).format("MMM D YYYY")} display-timezone="utc" disabled={true}></IonDatetime>
            </IonRow>
            <IonRow>
            <IonCol size="10.5">
            <IonLabel id="price_favorite_size">{item.price=== "Free"? "Free" : item.price +'Dt'}</IonLabel>
          </IonCol>
            <IonCol>
          <IonIcon onClick={()=> {setHeartButtonClick({clicked:true, btn_Id:item.event_id})}} icon={heart}  id="heart_favorite-hover"/> 
          </IonCol>
            </IonRow>
            </IonGrid>     
        </IonCardHeader>
        </IonCard>
        )
        }) : 
        <>
        &nbsp;
        <IonContent fullscreen>
           &nbsp;
          <IonLabel id="favorite_title_emptypage">Your favorite liste is empty </IonLabel>
          <IonCard>
          <img src="https://i.gifer.com/r8e.gif" alt=""  className="favorite_img_size" />
          <IonCardHeader>
          <IonButton fill="outline" expand="full" routerLink="/tab1"> Check some events </IonButton>
        </IonCardHeader>
        </IonCard>
        </IonContent>
        </>
    }
    </IonContent>
    </IonPage>
    </>
  );
};

export default Tab3;
