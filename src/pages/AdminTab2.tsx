import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonItem,
  IonLabel,
  IonAvatar,
  IonBadge,
  IonText,
  IonCard,
  IonCardContent,
  IonIcon,
  useIonAlert,
  IonListHeader,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonDatetime,
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/react";
import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { trash } from "ionicons/icons";
import axios from "axios";
import "./Admin.scss";

interface adminProps {
  events: Array<any>;
  setEvents: (any) => any;
  setviewEvent: (any) => any;
  viewEvent: number;
  setPath: (any) => any;
}

const AdminTab2: React.FC<adminProps> = ({
  events,
  setEvents,
  setviewEvent,
  viewEvent,
  setPath,
}) => {
  const [deleteButton, setDeleteButton] = useState<{
    clicked: boolean;
    btn_Id: number | null;
  }>({ clicked: true, btn_Id: null });
  const [present] = useIonAlert();
  const [buttontoviewevent, setbuttontoviewevent] = useState<any>(false);
  const history = useHistory();

  // if the btn is click w go to the event
  if (buttontoviewevent) {
    history.push("/eventpage");
    setbuttontoviewevent(false);
  }

  useEffect(() => {
    if (deleteButton.btn_Id) {
      axios
        .delete(`/api/removevent/${deleteButton.btn_Id}`)
        .then((result) => {
          if ((result.data = "event deleted")) {
            setEvents(
              events.filter((item) => item.event_id !== deleteButton.btn_Id)
            );
            present("Event deleted successfully 👌");
          }
        })
        .catch(() => {
          present("An error has occured ❌");
        });
    }
  }, [deleteButton.btn_Id]);

  return (
    <IonPage>
      <IonHeader>
        <IonListHeader>
          <IonLabel className="homepage_admine_title" color="warning">
            List of Events
          </IonLabel>
          &nbsp;
        </IonListHeader>
        &nbsp;
      </IonHeader>
      <IonContent>
        {events.length ? (
          events.map((item, index) => {
            return (
              <IonCard key={index}>
                <img
                  src={item.image}
                  alt=""
                  className="favorite_img_size"
                  onClick={() => {
                    setviewEvent(item.event_id);
                    setbuttontoviewevent(true);
                    setPath("admin");
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
                          {item.price === "Free" ? "Free" : item.price + "Dt"}
                        </IonLabel>
                      </IonCol>
                      <IonCol>
                        <IonIcon
                          onClick={() => {
                            setDeleteButton({
                              clicked: true,
                              btn_Id: item.event_id,
                            });
                          }}
                          icon={trash}
                          id="trash_delete-hover"
                          color="warning"
                        />
                      </IonCol>
                    </IonRow>
                  </IonGrid>
                </IonCardHeader>
              </IonCard>
            );
          })
        ) : (
          <></>
        )}
      </IonContent>
    </IonPage>
  );
};

export default AdminTab2;
