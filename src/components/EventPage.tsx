import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonImg,
  IonCardHeader,
  IonCard,
  IonToolbar,
  IonIcon,
  IonSearchbar,
  IonFooter,
  IonList,
  IonListHeader,
  IonLabel,
  IonCardSubtitle,
  IonCardTitle,
  IonDatetime,
  IonCol,
  IonRow,
  IonGrid,
  IonTitle,
  IonAvatar,
  IonText,
  IonTextarea,
} from "@ionic/react";
import { cashSharp, locationSharp } from "ionicons/icons";
import "./EventPage.scss";


interface ContainerProps {
    viewEvent:number,
  }

const EventPage: React.FC <ContainerProps> = ({viewEvent}) => {
  const [data, setData] = useState<any | null>([]);
    console.log(viewEvent);
    
  const getEventPage = () => {
    axios.get(`/api/eventpage/1`).then((res) => {
      console.log(res.data);
      setData(res.data[0]);
    });
  };

  useEffect(() => {
    getEventPage();
  }, []);

  return (
    <>
      <IonPage>
        <IonContent className="image_bg" fullscreen>
          <IonImg
            className="img_eventpage"
            src={data.image}
          />
          <IonLabel className="category_eventpage">{data.category}</IonLabel>
          <IonLabel className="title_eventpage">{data.title}</IonLabel>
          <IonDatetime
            className="start-time_eventpage"
            value={data.start_time}
            display-timezone="utc"
            disabled={true}
          ></IonDatetime>
          <IonDatetime
            className="end-time_eventpage"
            value={data.end_time}
            display-timezone="utc"
            disabled={true}
          ></IonDatetime>
          <IonLabel className="location_eventpage">{data.location}</IonLabel>
          <IonIcon icon={locationSharp} color="light" className="icon_eventpage" />
          <IonLabel className="price_eventpage">{data.price=== "Free" ? "Free" : data.price +' DT'}</IonLabel>
          <IonIcon icon={cashSharp} color="light" className="icon_cash_eventpage" />
          <IonLabel className="span_date">_</IonLabel>
          <IonAvatar className="avatar_eventpage">
            <img
              src={data.user_image}
              alt=""
            />
          </IonAvatar>
          <IonLabel className="organizer_name_eventpage">
            {data.username}
          </IonLabel>
          <IonLabel className="organizer_eventpage">Organizer</IonLabel>
          <IonLabel className="about_eventpage">About</IonLabel>
          <IonText className="abouttext_eventpage">
            <p>{data.description}</p>
          </IonText>
        </IonContent>
      </IonPage>
    </>
  );
};

export default EventPage;
