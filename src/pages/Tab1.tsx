import React, {useState,useEffect} from 'react';
import { IonContent, IonHeader, IonPage, IonTitle,IonText, IonToolbar,IonImg } from '@ionic/react';
// import ExploreContainer from '../components/ExploreContainer';
import axios from 'axios';

const Tab1: React.FC = () => {
 const [categories, setCategories] = useState(['https://media.istockphoto.com/vectors/gamer-using-gaming-controller-vector-id1129878609?k=6&m=1129878609&s=612x612&w=0&h=4DoiAU1tCtU568M_Mg8QIJiUsoytvzNXzUdKT3mJGTw=','https://images.squarespace-cdn.com/content/v1/55b76e9ee4b03c58b8546b0c/1589791183324-DGUJ55BN5Z404VS53IYJ/cover-davidsfonds1.3.jpg?format=2500w'])
 const [events, setEvents] = useState([]);
//  useEffect(() => {
//    axios.get('http://localhost:3001/api/select').then((result) => {
//     console.log('we r events daddy', result);
//     setEvents(result.data)
//    })
//    .catch((err) => {
//     console.log(err);
//   });
//  },[])
 return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle className="category-photos">
            {categories.map((category,index) => (
              <IonImg  key={index}
              style={{ display: 'flex', flexDirection: 'row' }}
              src={category} className="categoryImg"/>
            ))}
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">
              <div>
                {events.map((event,i) => (
                  <div key={i}>
                    <div>
                      <IonTitle>{event.title}</IonTitle>
                      <IonImg src={event.image} />
                      {/* <ion-icon name="heart"></ion-icon> */}
                      {/* <FaBeer /> */}
                    </div>
                    <div>
                      <IonText>{event.start_time}</IonText>
                      <IonText>{event.end_time}</IonText>
                    </div>
                    <div>
                      <IonText>{event.location}</IonText>
                      <IonText>{event.numberOfFollowers}</IonText>
                    </div>
                  </div>
                ))}
              </div>
            </IonTitle>
          </IonToolbar>
        </IonHeader>
        {/* <ExploreContainer name="Tab 1 page" /> */}
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
