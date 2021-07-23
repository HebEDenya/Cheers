import React, {useState,useEffect} from 'react';
import {IonicSafeString, IonInfiniteScroll, IonInfiniteScrollContent, IonNote,IonCol, IonRow} from '@ionic/react';
import { IonContent, IonHeader, IonPage,IonIcon,IonCardTitle,IonDatetime, IonCard,IonCardHeader,IonLabel,IonGrid, IonListHeader,IonImg,IonList,IonItem ,IonCardSubtitle} from '@ionic/react';
import { Icon, InlineIcon } from '@iconify/react';
import moment from 'moment';
import heartIcon from '@iconify-icons/ion/heart';
import ExploreContainer from '../components/ExploreContainer';


// import ExploreContainer from '../components/ExploreContainer';
import axios from 'axios';
import './Tab1.scss';

const Tab1: React.FC = () => {
 const [categories, setCategories] = useState(['https://lh3.googleusercontent.com/proxy/q3dMpilRN10QnDQlAvqhBd98oEHZdQCGGGKkPTAzP88Gq4yk_oxzTydRvl5zut7uA0pMMolL6PUaXYuGMYx8vHDyCRLNB2uMHZTVfMnwkSOJsPMWfVgkNxXuq4D26H8YpgY7Io8mGAM4uM7tjg','https://images.squarespace-cdn.com/content/v1/5acb6f9fb27e3910337cdd37/1588499747331-SQOD997KAC1GTGN3A6IP/ke17ZwdGBToddI8pDm48kMMrhUZ3rQXTcnRxiSGi1G17gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QHyNOqBUUEtDDsRWrJLTmaUzSiviepfuOufnJa7SEDRKl7z_LUwe8cDB0iQ_YpMlSenNy3wuK8-Q9DCm8gcSo/IMG_1877.JPG?format=1500w','https://images.squarespace-cdn.com/content/v1/55b76e9ee4b03c58b8546b0c/1589791183324-DGUJ55BN5Z404VS53IYJ/cover-davidsfonds1.3.jpg?format=2500w'])
 const [events, setEvents] = useState([]);
 const [heartButtonClick, setHeartButtonClick] = useState(false)
 useEffect(() => {
   axios.get('http://localhost:3001/api/home').then((result) => {
    console.log('we r events daddy', result);
    setEvents(result.data)
   })
  //  .catch((err) => {
  //   console.log(err);
  // });
 },[])
 return (
    <IonPage>
      <IonHeader>
      
        <IonListHeader>
             <IonLabel className="favorite_title_size"  color="primary" >
             Home
         </IonLabel>
         </IonListHeader>
      </IonHeader>
      <IonContent>
        <IonItem>
            {categories.map((category,index) => (
              <IonImg 
              class="scroll-content"
              style={{ display: 'flex',flexDirection:'column',flex:4}}
              src={category} className="categoryImg"/>
            ))}
            </IonItem>
            <IonList class="scroll-content">         
              <IonItem className="events">
                {events.map((event,i) => (
                  <>
                    <IonCard key={i}>
            <img src={event.image} alt=""  className="favorite_img_size" />
        <IonCardHeader>
        <IonGrid>
            <Icon  icon={heartIcon}  id="heart_favorite-hover"/> 
            <IonCardSubtitle>{event.title}</IonCardSubtitle>
            <IonCardTitle className="event_title">{event.location}</IonCardTitle>
            <IonRow>
            <IonDatetime className="event_time" value={moment(event.start_time).format("MMM D YYYY")} display-timezone="utc"></IonDatetime>
            <IonDatetime className="event_time" value={moment(event.end_time).format("MMM D YYYY")} display-timezone="utc"></IonDatetime>
            </IonRow>
            <IonRow>           
            <IonCol>
          </IonCol>
            </IonRow>
            </IonGrid>
        </IonCardHeader>
        </IonCard>
                    {/* <IonTextarea className="items">
                    </IonTextarea> */}
                    {/* <IonTextarea>
                      
                    </IonTextarea> */}
                    
                  </>
                ))}
              </IonItem>
        </IonList>
            </IonContent>
        <ExploreContainer name="Tab 1 page" />
    </IonPage>
  );
};

export default Tab1;
