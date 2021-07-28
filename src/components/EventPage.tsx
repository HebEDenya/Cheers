import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
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
  IonFabButton,
  IonButtons,
  IonBackButton,
} from "@ionic/react";
import {
  cashSharp,
  chatbubbleEllipsesOutline,
  locationSharp,
  calendarNumberSharp,
  timeSharp,
  checkmarkCircleOutline,
  addCircleOutline,
  chevronBackOutline,
} from "ionicons/icons";
import Cookies from "js-cookie";
import "./EventPage.scss";
interface ContainerProps {
  viewEvent: any;
  btnpath: string;
  setPath: any;
}

const EventPage: React.FC<ContainerProps> = ({
  viewEvent,
  btnpath,
  setPath,
}) => {
  const [data, setData] = useState<any | null>([]);
  const [startTime, setstartTime] = useState<any | null>([]);
  const [endTime, setendtime] = useState<any | null>([]);
  const [clicked, setclicked] = useState<boolean>(true);
  const [places, setPlaces] = useState<number | null>();
  const history = useHistory();

  const userId = Cookies.get("user_id");

  // verify if the user have a place in this event
  const verifyFollow = () => {
    if (+userId && viewEvent) {
      axios.get(`/api/vote/color/${+userId}/${viewEvent}`).then((result) => {
        if (result.data === "Followed") {
          setclicked(false);
        } else {
          setclicked(true);
        }
      });
    }
  };

  // update if the user take a place in this event
  const voteEvent = () => {
    if (+userId && viewEvent) {
      axios
        .put(`/api/vote/${+userId}/${viewEvent}`)
        .then((result) => {})
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    getEventPage();
  }, [viewEvent]);

  useEffect(() => {
    if (+userId && viewEvent) {
      verifyFollow();
    }
  }, [viewEvent]);

  // get all the data related to this event
  const getEventPage = () => {
    if (viewEvent !== null) {
      axios.get(`/api/eventpage/${viewEvent}`).then((res) => {
        setData(res.data[0]);
        setstartTime(res.data[0].start_time.split("T")[1]);
        setendtime(res.data[0].end_time.split("T")[1]);
        setPlaces(res.data[0].available_places);
      });
    }
  };

  // return the available_places depend of n places
  const availablePlaces = () => {
    if (places === -1) {
      return <IonLabel className="place_eventpage">Open to everyone</IonLabel>;
    } else if (places === 0) {
      return <IonLabel className="place_eventpage">Full</IonLabel>;
    } else {
      return (
        <IonLabel className="place_eventpage">
          Available : {places} places'
        </IonLabel>
      );
    }
  };

  // To switch button and color and inc or dec places
  const btnClick = () => {
    if (places && places !== -1) {
      if (clicked) {
        return (
          <IonFabButton
            onClick={() => {
              setclicked(false);
              voteEvent();
              setPlaces(places - 1);
            }}
            className="btn_vote_eventpage"
            color="light"
            size="small"
          >
            <IonIcon icon={addCircleOutline} size="small" />
          </IonFabButton>
        );
      } else if (!clicked) {
        return (
          <IonFabButton
            onClick={() => {
              setclicked(true);
              voteEvent();
              setPlaces(places + 1);
            }}
            className="btn_vote_eventpage"
            color="primary"
            size="small"
          >
            <IonIcon icon={checkmarkCircleOutline} size="small" />
          </IonFabButton>
        );
      }
    } else {
      return "";
    }
  };

  const Path = () => {
    if (btnpath === "admin") {
      return (
        <IonIcon
          className="back_button_eventpage"
          icon={chevronBackOutline}
          onClick={() => history.push("/adminTab2")}
        />
      );
    } else if (btnpath === "myevents") {
      return (
        <IonIcon
          className="back_button_eventpage"
          icon={chevronBackOutline}
          onClick={() => history.push("/myevents")}
        />
      );
    } else if (btnpath === "tab1") {
      return (
        <IonIcon
          className="back_button_eventpage"
          icon={chevronBackOutline}
          onClick={() => history.push("/tab1")}
        />
      );
    } else if (btnpath === "search") {
      return (
        <IonIcon
          className="back_button_eventpage"
          icon={chevronBackOutline}
          onClick={() => history.push("/tab5")}
        />
      );
    }
  };

  return (
    <>
      <IonPage>
        <IonContent className="image_bg" fullscreen>
          <IonImg className="img_eventpage" src={data.image} />
          <IonLabel className="category_eventpage">{data.category}</IonLabel>
          <IonLabel className="title_eventpage">{data.title}</IonLabel>
          {availablePlaces()}
          {btnClick()}
          {Path()}
          <IonDatetime
            className="start_time_eventpage"
            displayFormat="HH:mm"
            value={startTime}
            display-timezone="utc"
            disabled={true}
          ></IonDatetime>
          <IonDatetime
            className="end_time_eventpage"
            displayFormat="HH:mm"
            value={endTime}
            display-timezone="utc"
            disabled={true}
          ></IonDatetime>
          <IonLabel className="span_time">_</IonLabel>
          <IonIcon
            icon={timeSharp}
            color="light"
            className="time_icon_eventpage"
          />
          <IonIcon
            icon={calendarNumberSharp}
            color="light"
            className="calendar_eventpage"
          />
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
            {!data.user_image ? (
              <img
                src={
                  data.user_image !== null
                    ? data.user_image
                    : "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/55a27373859093.5ea2b801a2781.png"
                }
                alt="profil-face"
              />
            ) : (
              <img src={data.user_image} alt="profil-face" />
            )}
          </IonAvatar>
          <IonLabel className="organizer_name_eventpage">
            {data.username}
          </IonLabel>
          <IonLabel className="organizer_eventpage">Organizer</IonLabel>
          <IonFabButton className="btn_eventpage" color="light" size="small">
            <IonIcon icon={chatbubbleEllipsesOutline} size="small" />
          </IonFabButton>
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
