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
import "./MyEvents.scss";
import axios from "axios";
import { useHistory } from "react-router";

interface props {
  user_id: number;
  setviewEvent: any;
  viewEvent: number;
  eventAdded: boolean;
  setPath: any;
}

const MyEvents: React.FC<props> = ({
  user_id,
  setviewEvent,
  viewEvent,
  eventAdded,
  setPath,
}) => {
  const [data, setData] = useState<any | null>([]);
  const [buttontoviewevent, setbuttontoviewevent] = useState<any>(false);
  const history = useHistory();

  // if the btn clicked we go to the event page
  if (buttontoviewevent) {
    history.push("/eventpage");
    setbuttontoviewevent(false);
  }

  // Get events for the user
  const getEvents = () => {
    if (user_id) {
      axios.get(`/api/events/${user_id}`).then((res) => {
        // Hard coded ID
        setData(res.data);
      });
    }
  };

  useEffect(() => {
    getEvents();
  }, [eventAdded]);

  return (
    <>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle className="myevent_title">My Events</IonTitle>
            <IonButtons slot="start">
              <IonBackButton className="back_button" text="" color="dark" />
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          &nbsp;
          {data.length ? (
            data.map((event, key) => {
              return (
                <IonCard key={key}>
                  <img
                    className="favorite_img_size"
                    src={event.image}
                    alt=""
                    onClick={() => {
                      setviewEvent(event.event_id);
                      setbuttontoviewevent(true);
                      setPath("myevents");
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
                    src="http://res.cloudinary.com/dxhyydpng/image/upload/v1627258353/ybrxtktnn4mrvv8gzq9u.gif"
                    alt=""
                    className=""
                  />
                  <IonCardHeader>
                    <IonLabel className="no_title">No Events Yet!</IonLabel>
                    <IonButton
                      fill="outline"
                      expand="full"
                      routerLink="/CreateEvent"
                    >
                      {" "}
                      Create Events{" "}
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

export default MyEvents;
