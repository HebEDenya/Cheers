import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonAvatar,
  IonBadge,
  IonText,
  IonCard,
  IonCardContent,
  IonIcon,
  useIonAlert,
} from "@ionic/react";
import { useState, useEffect } from "react";
import ExploreContainer from "../components/ExploreContainer";
import { chevronForwardOutline, logOut } from "ionicons/icons";
import { useHistory } from "react-router";
import "./Tab2.scss";
import axios from "axios";

interface ContainerProps {
  coinsUser: number;
  user_id: number;
  setLogout: (any) => any;
  setimageProfileUpdated: (any) => any;
  imageProfileUpdated: boolean;
}

const Tab2: React.FC<ContainerProps> = ({
  coinsUser,
  user_id,
  setLogout,
  setimageProfileUpdated,
  imageProfileUpdated,
}) => {
  const [data, setData] = useState<any | null>([]);
  const [present] = useIonAlert();
  const history = useHistory();

  const LogoutRedirect = () => {
    setLogout(true);
    history.go(0);
  };

  // Get the user Data from the Database
  const getUserData = () => {
    if (user_id) {
      axios
        .get(`/api/user/${user_id}`) // For now we use user_id
        .then((res) => {
          setData(res.data[0]);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    setimageProfileUpdated(false);
    getUserData();
  }, [imageProfileUpdated]);

  return (
    <IonPage>
      &nbsp;
      <IonContent>
        <IonHeader class="ion-margin">
          <IonTitle class="ion-margin" className="avatar_username">
            {data.username}
          </IonTitle>
          <IonAvatar class="ion-margin" className="avatar_image">
            <img
              src={
                data.user_image !== null
                  ? data.user_image
                  : "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/55a27373859093.5ea2b801a2781.png"
              }
              alt=""
            />
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

        {coinsUser ? (
          <IonCard routerLink="/CreateEvent">
            <IonCardContent className="my_account_text">
              Create Event
              <div className="userDasbord_icon">
                <IonIcon icon={chevronForwardOutline} className="icon-card" />
              </div>{" "}
            </IonCardContent>
          </IonCard>
        ) : (
          <IonCard
            onClick={() =>
              present("You don't have enough coins", [{ text: "Ok" }])
            }
          >
            <IonCardContent className="my_account_text">
              Create Event
              <div className="userDasbord_icon">
                <IonIcon icon={chevronForwardOutline} className="icon-card" />
              </div>{" "}
            </IonCardContent>
          </IonCard>
        )}
        <IonCard routerLink="/myevents">
          <IonCardContent className="my_account_text">
            My Events
            <div className="userDasbord_icon">
              <IonIcon icon={chevronForwardOutline} className="icon-card" />
            </div>{" "}
          </IonCardContent>
        </IonCard>

        <IonCard routerLink="/followedevents">
          <IonCardContent className="my_account_text">
            Followed Events
            <div className="userDasbord_icon">
              <IonIcon icon={chevronForwardOutline} className="icon-card" />
            </div>{" "}
          </IonCardContent>
        </IonCard>

        <IonCard routerLink="/CoinsPurchase">
          <IonCardContent className="my_account_text">
            My Coins
            <IonBadge color="primary" className="coins_position">
              {coinsUser}
            </IonBadge>
            <div className="userDasbord_icon">
              <IonIcon icon={chevronForwardOutline} className="icon-card" />
            </div>
          </IonCardContent>
        </IonCard>

        <IonCard
          onClick={() => {
            LogoutRedirect();
          }}
        >
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
