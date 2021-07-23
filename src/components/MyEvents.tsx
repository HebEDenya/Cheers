import React, { useState, useEffect } from "react";
import {
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonAvatar,
  IonItem,
  IonInput,
  IonLabel,
  IonText,
  IonListHeader,
  IonContent,
  IonTextarea,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonDatetime,
} from "@ionic/react";
import "./MyEvents.scss";
import axios from "axios";

const MyEvents: React.FC = () => {
  const [data, setData] = useState<any | null>([]);

  // Get events for the user
  const getEvents = () => {
    axios.get("http://localhost:3001/api/events/5").then((res) => { // Hard coded ID
      setData(res.data);
    });
  };

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <>
      <IonPage>
        <IonContent fullscreen>
          <IonListHeader>
            <IonLabel className="color_update_profil">My Events</IonLabel>
          </IonListHeader>
          &nbsp;
          {data.map((event, key) => {
            return (
              <IonCard key={key}>
                <img
                  className="favorite_img_size"
                  src="https://resize.programme-television.ladmedia.fr/r/670,670/img/var/premiere/storage/images/tele-7-jours/news-tv/marrakech-du-rire-un-edition-2019-survoltee-en-prime-sur-m6-4642827/95601501-1-fre-FR/Marrakech-du-rire-Un-edition-2019-survoltee-en-prime-sur-M6.jpg"
                  alt=""
                />
                <IonCardHeader>
                  <IonCardSubtitle>{event.title}</IonCardSubtitle>
                  <IonCardTitle className="event_title">
                    {event.title}
                  </IonCardTitle>
                  <IonDatetime
                    className="event_time"
                    value={event.start_time}
                    display-timezone="utc"
                  ></IonDatetime>
                  <IonLabel>{event.price}</IonLabel>
                </IonCardHeader>
              </IonCard>
            );
          })}
        </IonContent>
      </IonPage>
    </>
  );
};

export default MyEvents;
