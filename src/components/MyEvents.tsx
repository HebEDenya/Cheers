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
  IonButtons,
  IonBackButton
} from "@ionic/react";
import "./MyEvents.scss";
import axios from "axios";

const MyEvents: React.FC = () => {
  const [data, setData] = useState<any | null>([]);

  // Get events for the user
  const getEvents = () => {
    axios.get("http://localhost:3001/api/events/5").then((res) => {
      // Hard coded ID
      setData(res.data);
    });
  };

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <>
      <IonPage>
      <IonHeader>
    <IonToolbar>
    <IonTitle>My Events</IonTitle>
    <IonButtons slot="start">
    <IonBackButton text="Back" color="dark"/> 
    </IonButtons>
    </IonToolbar>
    </IonHeader>
        <IonContent fullscreen>
          &nbsp;
          {data.map((event, key) => {
            return (
              <IonCard key={key}>
                <img className="favorite_img_size" src={event.image} alt="" />
                <IonCardHeader>
                  <IonCardSubtitle>{event.title}</IonCardSubtitle>
                  <IonCardTitle className="event_title">
                    {event.location}
                  </IonCardTitle>
                  <IonDatetime
                    className="event_time"
                    value={event.start_time}
                    display-timezone="utc"
                  ></IonDatetime>
                  <IonLabel>
                    {event.price === "Free" ? "Free" : event.price + "DT"}
                  </IonLabel>
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
