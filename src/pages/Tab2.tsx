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
} from "@ionic/react";
import { useState, useEffect } from "react";
import ExploreContainer from "../components/ExploreContainer";
import { chevronForwardOutline } from "ionicons/icons";
import "./Tab2.scss";
import axios from "axios";

const Tab2: React.FC = () => {
  const [data, setData] = useState<any | null>([]);

  // Get the user Data from the Database
  const getUserData = () => {
    axios
      .get("http://localhost:3001/api/user/5") // For now we use user_id
      .then((res) => {
        setData(res.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getUserData();
  },[]);

  return (
    <IonPage>
      &nbsp;
      <IonContent>
        <IonHeader class="ion-margin">
          <IonTitle class="ion-margin">{data.username}</IonTitle>
          <IonAvatar class="ion-margin">
            <img src={data.image} alt="" />
          </IonAvatar>
        </IonHeader>
        <IonText className="email-address">{data.email}</IonText>

        <IonCard routerLink="/update">
          <IonCardContent className="my_account_text">
            Update Profil
            <div className="userDasbord_icon">
              <IonIcon icon={chevronForwardOutline} className="icon-card" />
            </div>{" "}
          </IonCardContent>
        </IonCard>

        <IonCard routerLink="/CreateEvent">
          <IonCardContent className="my_account_text">
            Create Event
            <div className="userDasbord_icon">
              <IonIcon icon={chevronForwardOutline} className="icon-card" />
            </div>{" "}
          </IonCardContent>
        </IonCard>

        <IonCard routerLink="/myevents">
          <IonCardContent className="my_account_text">
            My Events
            <div className="userDasbord_icon">
              <IonIcon icon={chevronForwardOutline} className="icon-card" />
            </div>{" "}
          </IonCardContent>
        </IonCard>

        <IonCard>
          <IonCardContent className="my_account_text">
            My Coins
            <IonBadge color="primary" className="coins_position">
              50
            </IonBadge>
            <div className="userDasbord_icon">
              <IonIcon icon={chevronForwardOutline} className="icon-card" />
            </div>
          </IonCardContent>
        </IonCard>

        <IonCard>
          <IonCardContent className="my_account_text">
            Log Out
            <div className="userDasbord_icon">
              <IonIcon icon={chevronForwardOutline} className="icon-card" />
            </div>
          </IonCardContent>
        </IonCard>
        <ExploreContainer name="Tab 1 page" />
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
