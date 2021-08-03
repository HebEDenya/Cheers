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
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonDatetime,
  IonButtons,
  IonBackButton,
  IonButton,
} from "@ionic/react";
import "./FollowedEvents.scss";
import axios from "axios";
import { useHistory } from "react-router";

interface props {
  user_id: number;
  setviewEvent: (any) => any;
  viewEvent: number;
  eventAdded: boolean;
  setPath: (any) => any;
  followedEvents: any[]
  
}

const FollowedEvents: React.FC<props> = ({
  user_id,
  setviewEvent,
  viewEvent,
  eventAdded,
  setPath,
  followedEvents
  
}) => {
  const [buttontoviewevent, setbuttontoviewevent] = useState<any>(false);
  const history = useHistory();

  // if the btn clicked we go to the event page
  if (buttontoviewevent) {
    history.push("/eventpage");
    setbuttontoviewevent(false);
  }

  return (
    <>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle className="myevent_title">Followed Events</IonTitle>
            <IonButtons slot="start">
              <IonBackButton className="back_button" text="" color="dark" />
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          &nbsp;
          {followedEvents.length ? (
            followedEvents.map((event, key) => {
              return (
                <IonCard key={key}>
                  <img
                    className="favorite_img_size"
                    src={event.image}
                    alt=""
                    onClick={() => {
                      setviewEvent(event.event_id);
                      setbuttontoviewevent(true);
                      setPath("followedevents");
                    }}
                  />
                  <IonCardHeader>
                    <IonCardSubtitle>{event.title}</IonCardSubtitle>
                    <IonCardTitle className="event_title">
                      {event.location}
                    </IonCardTitle>
                    <IonDatetime
                      className="event_time"
                      value={event.start_time}
                      display-timezone="utc"
                      disabled={true}
                    ></IonDatetime>
                    <IonLabel>
                      {event.price === "Free" ? "Free" : event.price + "DT"}
                    </IonLabel>
                  </IonCardHeader>
                </IonCard>
              );
            })
          ) : (
            <>
              &nbsp;
              <IonContent fullscreen>
                &nbsp;
                <IonCard>
                  <img
                    src="https://res.cloudinary.com/dxhyydpng/image/upload/v1627568150/uqkkvedkbl5v9oo77nuk.gif"
                    alt=""
                    className=""
                  />
                  <IonCardHeader>
                    <IonLabel className="no_title_followed">No Followed Events Yet!</IonLabel>
                    <IonButton
                      fill="outline"
                      expand="full"
                      routerLink="/tab1"
                    >
                      {" "}
                      Follow Events{" "}
                    </IonButton>
                  </IonCardHeader>
                </IonCard>
              </IonContent>
            </>
          )}
        </IonContent>
      </IonPage>
    </>
  );
};

export default FollowedEvents;
