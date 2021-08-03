import React, { useState, useEffect } from "react";
import { IonCardHeader, IonCol, IonRow } from "@ionic/react";
import {
  IonContent,
  IonPage,
  IonIcon,
  IonCardTitle,
  IonDatetime,
  IonCard,
  IonLabel,
  IonGrid,
  IonCardSubtitle,
} from "@ionic/react";
// import { Icon, InlineIcon } from '@iconify/react';
import { heart, heartOutline } from "ionicons/icons";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";
// import ExploreContainer from '../components/ExploreContainer';
import "./SingleEvent.scss";
import axios from "axios";
interface ContainerProps {
  event: any;
  setPath: (any) => any;
  setviewEvent: React.Dispatch<React.SetStateAction<number>>;
  verifyDeleteBtn : boolean;
  setVerifyDeleteBtn: (any) => any;
  setTest: (any) => any;
  test: number | null;
 
}
const SingleEvent: React.FC<ContainerProps> = ({
  event,
  setviewEvent,
  setPath,
  verifyDeleteBtn,
  setVerifyDeleteBtn,
  test,
  setTest
  
}) => {
  //  const [heartButtonClick, setHeartButtonClick] = useState(false)
  const [buttontoviewevent, setbuttontoviewevent] = useState<any>(false);
  const [isFav, setIsFav] = useState<number>();
  const [liked, setLiked] = useState<number|null>(event.isFavorite)
  const [oneEvent, setOneEvent] = useState([]);
  const [eventId, seteventId] = useState<number | null>(event.event_id);
  const history = useHistory();

  if (buttontoviewevent) {
    history.push("/eventpage");
    setbuttontoviewevent(false);
  }

  useEffect(() => {
    if (test && test === eventId) {
       setLiked(null)
    }
  }, [test])
  

  const addToFavorite = (event_id) => {
    const user_id = Cookies.get("user_id");
    if (user_id) {
      axios
        .post("/api/favorite", { event_id: event_id, user_id: +user_id })
        .then((res) => {
          setIsFav(event_id);
        })
        .catch((err) => console.log(err));
    }
  };


  return (
    <>
      <IonCard>
        <img
          onClick={() => {
            setviewEvent(event.event_id);
            setbuttontoviewevent(true);
            setPath("tab1");
          }}
          src={event.image}
          alt=""
          className="favorite_img_size-cat"
        />
        <IonCardHeader>
          <IonCardSubtitle className="title_category_style_card">
            {event.title}
          </IonCardSubtitle>
          <IonCardTitle className="event_title_cat">
            {event.location}
          </IonCardTitle>

          <IonDatetime
            className="event_time_cat"
            value={event.start_time}
            display-timezone="utc"
            disabled={true}
          ></IonDatetime>
          <IonGrid>
            <IonRow>
              <IonCol size="10">
                <IonLabel id="price_favorite_size_cat">
                  {event.price === "Free" ? "Free" : event.price + " DT"}
                </IonLabel>
              </IonCol>
               <IonIcon
                    onClick={() => {
                      if (liked ) {
                        setLiked(null)
                        setVerifyDeleteBtn(!verifyDeleteBtn)
                      } else if (!liked) {
                        setLiked(1)
                        setVerifyDeleteBtn(!verifyDeleteBtn)
                      }
                      addToFavorite(event.event_id);
                    }}
                    icon={liked  ? heart:heartOutline }
                    id="heart_favorite_cat-hover"
                  />
                
            </IonRow>
          </IonGrid>
        </IonCardHeader>
      </IonCard>
    </>
  );
};
export default SingleEvent;



