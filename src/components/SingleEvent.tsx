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
}
const SingleEvent: React.FC<ContainerProps> = ({
  event,
  setviewEvent,
  setPath,
}) => {
  //  const [heartButtonClick, setHeartButtonClick] = useState(false)
  const [buttontoviewevent, setbuttontoviewevent] = useState<any>(false);
  const [isFav, setIsFav] = useState<number>();
  const [liked, setLiked] = useState<boolean|null>(null)
  const [checker, setChecker] = useState<{
    checker: boolean | null;
    event_id: number | null;
  }>({ checker: null, event_id: null });
  const [oneEvent, setOneEvent] = useState([]);
  const [eventId, seteventId] = useState<number | null>(null);
  const history = useHistory();

  if (buttontoviewevent) {
    history.push("/eventpage");
    setbuttontoviewevent(false);
  }

  // const checkLike = (event_id,user_id) => {
  //   axios.get(`/api/verifying/${eventId}/${user_id}`).then((result) => {
  //     console.log(result);
  //   }).catch((err) => console.log(err)
  //   )
  // }
  const addToFavorite = (event_id) => {
    const user_id = Cookies.get("user_id");
    if (user_id) {
      axios
        .post("/api/favorite", { event_id: event_id, user_id: +user_id })
        .then((res) => {
          console.log(res);
          setIsFav(event_id);
          if (res.data === "removed") {
            setLiked(false);
          } else {
            setLiked(true);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  // const verifyFollow = () => {
  //   const user_id = Cookies.get("user_id");
  //   axios
  //     .get(`/api/singlefavorite/${eventId}/${+user_id}`)
  //     .then((result) => {
  //       if (result.data === "Favorite") {
  //         setChecker({ checker: true, event_id: null });
  //       } else {
  //         setChecker({ checker: false, event_id: null });
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };
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
              {/* <IonGrid>{!liked ?
              <IonCol>
                {!checker.checker ? (
                  <IonIcon
                    onClick={() => {
                      // makeLike(event.event_id);
                      addToFavorite(event.event_id);
                      if (isFav === event.event_id) {
                        setChecker({ checker: true, event_id: event.event_id });
                      }
                    }}
                    icon={heartOutline}
                    id="heart_favorite_cat-hover"
                  />
                ) : (
                  <IonIcon
                    onClick={() => {
                      // makeLike(event.event_id);
                      addToFavorite(event.event_id);
                      if (isFav === event.event_id) {
                        setChecker({
                          checker: false,
                          event_id: event.event_id,
                        });
                      }
                    }}
                    icon={heart}
                    id="heart_favorite_cat-hover"
                  />
                )}
              </IonCol> : 
              <IonIcon
              onClick={() => {
                addToFavorite(event.event_id);
                if (isFav === event.event_id) {
                  setChecker({
                    checker: false,
                    event_id: event.event_id,
                  });
                }
              }}
              icon={heart}
              id="#heart_favorite_cat-hover_liked"
            />
              }</IonGrid> */}
         
               <IonIcon
                    onClick={() => {
                      // if(liked === true){
                      //   setLiked(false);
                      // } else if (liked === null){
                      //   setLiked(true)
                      // } else if(event.isFavorite && liked){
                      //   setLiked(false)
                      // }
                      addToFavorite(event.event_id);
                    }}
                    icon={event.isFavorite ? heart:heartOutline }
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



