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
  IonButton,
  IonFabButton
} from "@ionic/react";
import { cashSharp, chatbubbleEllipsesOutline, locationSharp } from "ionicons/icons";
import "./EventPage.scss";

interface ContainerProps {
  viewEvent: any;
}

const EventPage: React.FC<ContainerProps> = ({ viewEvent }) => {
  const [data, setData] = useState<any | null>([]);
  
  // get all the data related to this event
  const getEventPage = () => {
    if (viewEvent !== null) {
      axios.get(`/api/eventpage/${viewEvent}`).then((res) => {
        setData(res.data[0]);
      });
    }
  };

  useEffect(() => {
    getEventPage();
  }, [viewEvent]);



  return (
    <>
      <IonPage>
        <IonContent className="image_bg" fullscreen>
          <IonImg className="img_eventpage" src={data.image} />
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
          <IonIcon
            icon={locationSharp}
            color="light"
            className="icon_eventpage"
          />
          <IonLabel className="price_eventpage">
            {data.price === "Free" ? "Free" : data.price + " DT"}
          </IonLabel>
          <IonIcon
            icon={cashSharp}
            color="light"
            className="icon_cash_eventpage"
          />
          <IonLabel className="span_date">_</IonLabel>
          <IonAvatar className="avatar_eventpage">
            {!data.user_image ? <img 
              src={
                data.user_image !== null
                  ? data.user_image
                  : "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/55a27373859093.5ea2b801a2781.png"
              }
              alt="profil-face"
            /> : <img 
            src={data.user_image}
            alt="profil-face"
          /> }
          </IonAvatar>
          <IonLabel className="organizer_name_eventpage">
            {data.username}
          </IonLabel>
          <IonLabel className="organizer_eventpage">Organizer</IonLabel>
          <IonFabButton className="btn_eventpage" color="light" size="small"><IonIcon icon={chatbubbleEllipsesOutline} size="small" /></IonFabButton>
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
