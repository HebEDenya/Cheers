import React, {useState, useEffect} from 'react';
import {IonCol, IonRow} from '@ionic/react';
import { IonContent , IonPage,IonIcon,IonCardTitle,IonDatetime,IonCardHeader,IonLabel,IonGrid,IonCardSubtitle} from '@ionic/react';
// import { Icon, InlineIcon } from '@iconify/react';
import { heart,heartOutline} from 'ionicons/icons';
import ExploreContainer from '../components/ExploreContainer';
import { useHistory } from 'react-router-dom';
import Cookies from "js-cookie";
// import ExploreContainer from '../components/ExploreContainer';
import './SingleEvent.scss';  
import axios from 'axios';
interface ContainerProps {
  event:any,
  setPath: any,
//   setCategories: any,
//   categories:Array<any>,
//   user_id: number,
  setviewEvent: React.Dispatch<React.SetStateAction<number>>,
}
const SingleEvent: React.FC <ContainerProps>= ({event,setviewEvent,setPath}) => { 
    //  const [heartButtonClick, setHeartButtonClick] = useState(false)
    const [buttontoviewevent, setbuttontoviewevent] = useState<any>(false)
    const [isFav, setIsFav] = useState<number>()
    const [checker, setChecker] = useState<{checker:boolean | null, event_id:number | null}>({checker:null, event_id:null})
    const [oneEvent, setOneEvent] = useState([]) ;  
    const history = useHistory();
    
    if(buttontoviewevent) {
      history.push('/eventpage')
      setbuttontoviewevent(false)
    }
    useEffect(() => {
        axios.get('/api/home').then((result) => {
         setOneEvent(result.data)
        })
        .catch((err) => {
         console.log(err);
       });
      },[])
    
    const addToFavorite = (event_id) => {
      const user_id = Cookies.get("user_id")
      if(user_id){
          axios.post('/api/favorite',{event_id:event_id, user_id:+user_id}).then((res) =>{ console.log(res)
          // setChecker({checker:null, event_id:null})
          setIsFav(event_id);
          if(res.data === 'removed'){
            setChecker({checker:true, event_id:event_id})
          }else {
            setChecker(({checker:false, event_id:event_id}))
          }
        }).catch((err) => console.log(err)
     )} 
    }
    console.log(checker);
    
    
    return (
      <IonPage>    
             
          
             <img onClick={() => {setviewEvent(event.event_id) ; setbuttontoviewevent(true) ; setPath('tab1')}} src={event.image} alt=""  className="favorite_img_size" />
          
      <IonCardHeader >
      <IonGrid>
          <IonCardSubtitle>{event.title}</IonCardSubtitle>
          <IonCardTitle className="event_title">{event.location}</IonCardTitle>
          <IonRow>
          <IonDatetime className="event_time" value={event.start_time} display-timezone="utc" disabled={true}></IonDatetime>
          </IonRow>
          <IonRow>
          <IonCol size="10.5">
          <IonLabel id="price_favorite_size">{event.price=== "Free"? "Free" : event.price +' DT'}</IonLabel>
        </IonCol>
          <IonCol>
            {!checker.checker ?
          <IonIcon onClick={()=> {addToFavorite(event.event_id);if (isFav===event.event_id){ setChecker({checker:true, event_id:event.event_id})}} } icon={heartOutline}  id="heart_favorite-hover"/> 
           :
          <IonIcon onClick={()=> {addToFavorite(event.event_id);if (isFav===event.event_id){ setChecker({checker:false, event_id:event.event_id})} } } icon={heart}  id="heart_favorite-hover"/> 
            }
          </IonCol>
          </IonRow>
          </IonGrid>     
      </IonCardHeader>
                
        </IonPage>
      );
    };
    export default SingleEvent;
    