import {
  IonContent,
  IonHeader,
  IonPage,
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
} from "@ionic/react";
import React, { useState } from "react";
import { useHistory } from "react-router";
import "./Tab3.scss";

interface searchProps {
  events: Array<any>,
  setviewEvent: any,
  viewEvent: number,
  setPath: any,
}

const Tab5: React.FC<searchProps> = ({ events, setviewEvent, setPath }) => {
  const [searchText, setSearchText] = useState<string>("");
  const [buttontoviewevent, setbuttontoviewevent] = useState<any>(false);
  const history = useHistory();

  // if the btn clicked we go to the event page
  if (buttontoviewevent) {
    history.push("/eventpage");
    setbuttontoviewevent(false);
  }

  return (
    <IonPage>
      <IonHeader>
        <IonListHeader>
          <IonLabel className="favorite_title_size" color="primary">
            Search
          </IonLabel>
        </IonListHeader>
      </IonHeader>

      <IonToolbar>
        &nbsp;
        <IonSearchbar
          value={searchText}
          type="search"
          spellcheck={true}
          onIonChange={(e) => setSearchText(e.detail.value!)}
        ></IonSearchbar>
      </IonToolbar>
      <IonContent>
        {searchText &&
          events
            .filter((item) => {
              let search = searchText.toLowerCase();
              return (
                item.location.toLowerCase().includes(search) ||
                item.title.toLowerCase().includes(search) ||
                item.category.toLowerCase() === search ||
                item.price.toLowerCase() === search
              );
            })
            .map((item, index) => {
              return (
                <IonCard key={index}>
                  <img
                    src={item.image}
                    alt=""
                    className="favorite_img_size"
                    onClick={() => {
                      setviewEvent(item.event_id);
                      setbuttontoviewevent(true);
                      setPath('search')
                    }}
                  />
                  <IonCardHeader>
                    <IonGrid>
                      <IonCardSubtitle>{item.title}</IonCardSubtitle>
                      <IonCardTitle className="event_title">
                        {item.location}
                      </IonCardTitle>
                      <IonRow>
                        <IonDatetime
                          className="event_time"
                          value={item.start_time}
                          display-timezone="utc"
                          disabled={true}
                        ></IonDatetime>
                      </IonRow>
                      <IonRow>
                        <IonCol size="10.5">
                          <IonLabel id="price_favorite_size">
                            {item.price === "Free"
                              ? "Free"
                              : item.price + " DT"}
                          </IonLabel>
                        </IonCol>
                      </IonRow>
                    </IonGrid>
                  </IonCardHeader>
                </IonCard>
              );
            })}
        {!searchText && (
          <IonContent>
            &nbsp;
            <img
              src="https://res.cloudinary.com/dxhyydpng/image/upload/v1627241137/gcaakc4euaujvyfluhnj.gif"
              alt=""
              className="img_nosearch_size"
            />
          </IonContent>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Tab5;
