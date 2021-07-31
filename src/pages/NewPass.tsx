import {
  IonIcon,
  IonContent,
  IonHeader,
  IonPage,
  useIonAlert,
  IonTitle,
  IonToolbar,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonItemDivider,
  IonButton,
  IonFooter,
} from "@ionic/react";
//import ExploreContainer from '../components/ExploreContainer';
import axios from "axios";
import { lockClosed, person, mailOpen } from "ionicons/icons";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import Cookies from "js-cookie";
// import './Register.scss';
//import { star } from 'ionicons/icons';
const NewPass: React.FC = () => {
  const [email, setEmail] = useState<string>();
  const [user_id, setUser_id] = useState<string>();
  const [newPassword, setNewPassword] = useState<string>();
  const [isRegistred, setIsregistred] = useState<boolean>(false);
  const [present] = useIonAlert();
  const history = useHistory();
  const resetPassword = () => {
    console.log("dsfbkk");
    axios
      .post("http://localhost:3001/api/user/mail", {
        email: email,
      })
      .then((response) => {
        console.log(response);
        present(`${response.data.message}`, [
          {
            text: "Ok",
            handler: (d) => {
              console.log("ok pressed");
              if (response.data.status === "ok") history.push("/reset");
            },
          },
        ]);
      });
  };

  return (
    <IonPage>
      <IonHeader className="ion-no-border"></IonHeader>
      <IonContent>
        <br />
        <br />
        <br />
        <br />
        <br />

        <IonToolbar>
          <IonTitle className="ion-text-center custom-font ">
            Forgot Password
          </IonTitle>
        </IonToolbar>
        <br />
        <br />
        <br />
        <br />
        <br />

        <IonList className="ion-padding-bottom ion-margin-horizontal">
          <IonItem>
            <IonLabel position="floating">E-mail</IonLabel>
            <IonInput
              clear-input
              type="email"
              value={email}
              placeholder="Enter E-mail..."
              onIonChange={(e) => setEmail(e.detail.value!)}
            >
              <IonIcon size="small" slot="start" icon={mailOpen} />
            </IonInput>
          </IonItem>
        </IonList>
        <br />
        <br />
        <div className="ion-text-center custom-font">
          <IonButton
            onClick={() => {
              Cookies.set("reset", "true");
              resetPassword();
            }}
            size="small"
            fill="solid"
          >
            Reset
          </IonButton>
        </div>
        <br />
        <br />
        <br />
        <br />
        <br />

        <IonToolbar>
          <div className="ion-text-center custom-font">
            Have an account? <Link to="/login">Login</Link>
          </div>
        </IonToolbar>
      </IonContent>
    </IonPage>
  );
};
export default NewPass;
