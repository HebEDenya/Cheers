import React, {useState} from 'react';
import {IonCol, IonRow} from '@ionic/react';
import SingleEvent from '../components/SingleEvent';
import { IonContent ,IonSlides, IonSlide, IonHeader, IonPage,IonIcon,IonCardTitle,IonDatetime, IonCard,IonCardHeader,IonLabel,IonGrid, IonListHeader,IonImg,IonList,IonItem ,IonCardSubtitle} from '@ionic/react';
// import { Icon, InlineIcon } from '@iconify/react';
import { heart,heartOutline} from 'ionicons/icons';
import ExploreContainer from '../components/ExploreContainer';
import { useHistory } from 'react-router-dom';
import Cookies from "js-cookie";
// import ExploreContainer from '../components/ExploreContainer';
import './Tab1.scss';
import axios from 'axios';
interface ContainerProps {
  events:Array<any>,
  setviewEvent:any,
  viewEvent:number,
  setCategories: any,
  categories:Array<any>,
  user_id: number,
  setPath:any,
}

const Tab1: React.FC <ContainerProps>= ({events, setviewEvent,setPath, viewEvent, categories,setCategories,user_id}) => { 
//  const [heartButtonClick, setHeartButtonClick] = useState(false)
const [buttontoviewevent, setbuttontoviewevent] = useState<any>(false)
const [isFav, setIsFav] = useState<number>()
const [checker, setChecker] = useState<{checker:boolean | null, event_id:number | null}>({checker:null, event_id:null})
const slideOptsOne = {
  initialSlide: 0,
    slidesPerView: 1,
    autoplay:true,pagination: {
      el: '.swiper-pagination',
      clickable: true,
      renderBullet: function (index, className) {
        return '<span class="' + className + '">' + (index + 1) + '</span>';
      },
    }
  };
const history = useHistory();

  // if we click on img cart w go to the event page
if(buttontoviewevent) {
  history.push(`/eventpage/${viewEvent}`)
  setbuttontoviewevent(false)
}

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
    }  

      ).catch((err) => console.log(err)
      )
  } 
}
console.log(checker);


return (
  <IonPage>
      <IonHeader>
        <IonListHeader>
             <IonLabel className="favorite_title_size"  color="primary" >
             Categories
         </IonLabel>
         </IonListHeader>
      </IonHeader>
      &nbsp;

        <IonSlides  options={slideOptsOne}>
      <IonSlide className='container' >
      {categories.map((category,index) => (
        <IonList className='box'>
              {/* <IonImg
              key={index} 
              class="scroll-content"
              style={{ display: 'flex',flexDirection:'column',flex:4}}
              src={category.category_image} className="categoryImg"/> */}
              <IonItem className="i">{category.category_name}</IonItem>
              </IonList>
            ))}      
        </IonSlide>
        </IonSlides>
              <IonContent className="events">
                {events.map((event,i) => (
                  
        // <IonCard key={i} >
          
            
        // <IonCardHeader >
        // <IonGrid>
        //     <IonCardSubtitle>{event.title}</IonCardSubtitle>
        //     <IonCardTitle className="event_title">{event.location}</IonCardTitle>
        //     <IonRow>
        //     <IonDatetime className="event_time" value={event.start_time} display-timezone="utc" disabled={true}></IonDatetime>
        //     </IonRow>
        //     <IonRow>
        //     <IonCol size="10.5">
        //     <IonLabel id="price_favorite_size">{event.price=== "Free"? "Free" : event.price +' DT'}</IonLabel>
        //   </IonCol>
        //     <IonCol>
        //       {!checker.checker ?
        //     <IonIcon onClick={()=> {addToFavorite(event.event_id);if (isFav===event.event_id){ setChecker({checker:true, event_id:event.event_id})}} } icon={heartOutline}  id="heart_favorite-hover"/> 
        //      :
        //     <IonIcon onClick={()=> {addToFavorite(event.event_id);if (isFav===event.event_id){ setChecker({checker:false, event_id:event.event_id})} } } icon={heart}  id="heart_favorite-hover"/> 
        //       }
        //     </IonCol>
        //     </IonRow>
        //     </IonGrid>     
        // </IonCardHeader>
        // </IonCard>
               <SingleEvent setviewEvent={setviewEvent} event={event} key={i} setPath={setPath}/>   
                ))}
              
            </IonContent> 
        <ExploreContainer name="Tab 1 page" />
    </IonPage>
  );
};
export default Tab1;
