import React, { useState } from "react";
import { IonCol, IonRow } from "@ionic/react";
import SingleEvent from "../components/SingleEvent";
import {
  IonContent,
  IonSlides,
  IonSlide,
  IonHeader,
  IonPage,
  IonIcon,
  IonCardTitle,
  IonDatetime,
  IonCard,
  IonCardHeader,
  IonLabel,
  IonGrid,
  IonListHeader,
  IonImg,
  IonList,
  IonItem,
  IonCardSubtitle,
} from "@ionic/react";
// import { Icon, InlineIcon } from '@iconify/react';
import { heart, heartOutline } from "ionicons/icons";
import ExploreContainer from "../components/ExploreContainer";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";
// import ExploreContainer from '../components/ExploreContainer';
import "./Tab1.scss";
import axios from "axios";
interface ContainerProps {
  events: Array<any>;
  setviewEvent: (any) => any;
  viewEvent: number;
  setCategories: (any) => any;
  categories: Array<any>;
  user_id: number;
  setPath: (any) => any;
  verifyDeleteBtn: boolean;
  setVerifyDeleteBtn: (any) => any;
  setTest:(any)=> any;
  test: number | null
}

const Tab1: React.FC<ContainerProps> = ({
  events,
  setviewEvent,
  setPath,
  viewEvent,
  categories,
  setCategories,
  verifyDeleteBtn,
setVerifyDeleteBtn,
setTest,
test
  
}) => {
  //  const [heartButtonClick, setHeartButtonClick] = useState(false)
  const [buttontoviewevent, setbuttontoviewevent] = useState<any>(false);
  const [isFav, setIsFav] = useState<number>();
  const [categoryChosen, setCategoryChosen] = useState<string>("");
  const [checker, setChecker] = useState<{
    checker: boolean | null;
    event_id: number | null;
  }>({ checker: null, event_id: null });
  const slideOptsOne = {
    initialSlide: 0,
    slidesPerView: 1,
    scrollbar: true,
    autoplay: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      renderBullet: function (index, className) {
        return '<span class="' + className + '">' + (index + 1) + "</span>";
      },
    },
  };

  const history = useHistory();

  // if we click on img cart w go to the event page
  if (buttontoviewevent) {
    history.push(`/eventpage/${viewEvent}`);
    setbuttontoviewevent(false);
  }

  return (
    <IonPage>
      <IonHeader>
        <IonListHeader>
          <IonLabel className="favorite_title_size" color="primary">
            Home
          </IonLabel>
        </IonListHeader>
      </IonHeader>
      &nbsp;
      <IonList>
        <IonSlides className="container">
          <IonSlide className="box">
            <IonLabel
              className="category_name"
              onClick={() => {
                setCategoryChosen("");
              }}
            >
              {"All"}
            </IonLabel>
          </IonSlide>
          <IonSlide className="box">
            <IonLabel
              className="category_name"
              onClick={() => {
                setCategoryChosen("Others");
                console.log(categoryChosen);
              }}
            >
              {"Others"}
            </IonLabel>
          </IonSlide>
          {categories.map((category, index) => (
            <IonSlide className="box" key={index}>
              <IonLabel
                className="category_name"
                onClick={() => {
                  setCategoryChosen(category.category_name);
                  console.log(categoryChosen);
                }}
              >
                {category.category_name}
              </IonLabel>
            </IonSlide>
          ))}
        </IonSlides>
      </IonList>
      <IonContent className="events">
        {events
          .filter((event) => {
            if (categoryChosen.length) {
              return event.category === categoryChosen;
            } else {
              return event;
            }
          })
          .map((event, i) => (
            <SingleEvent
              setviewEvent={setviewEvent}
              event={event}
              key={i}
              setPath={setPath}
              verifyDeleteBtn ={verifyDeleteBtn}
              setVerifyDeleteBtn = {setVerifyDeleteBtn}
              test={test}
              setTest={setTest}
            />
          ))}
      </IonContent>
      <ExploreContainer name="Tab 1 page" />
    </IonPage>
  );
};
export default Tab1;
