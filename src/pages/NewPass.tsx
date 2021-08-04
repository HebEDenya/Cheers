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
  IonImg,
} from "@ionic/react";
//import ExploreContainer from '../components/ExploreContainer';
import axios from "axios";
import { lockClosed, person, mailOpen } from "ionicons/icons";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import Cookies from "js-cookie";
import "./NewPass.scss";
import forgotimage from "../photos/forgot.png";
const NewPass: React.FC = () => {
  const [email, setEmail] = useState<string>();
  const [user_id, setUser_id] = useState<string>();
  const [newPassword, setNewPassword] = useState<string>();
  const [isRegistred, setIsregistred] = useState<boolean>(false);
  const [present] = useIonAlert();
  const history = useHistory();
  const resetPassword = () => {
    axios
      .post("http://localhost:3001/api/user/mail", {
        email: email,
      })
      .then((response) => {
        present(`${response.data.message}`, [
          {
            text: "Ok",
            handler: (d) => {
              // if (response.data.status === "ok") history.push(`/reset/`);
            },
          },
        ]);
      });
  };
  return (
    <IonPage>
      <IonContent>
        <IonImg
          src={forgotimage}
          alt="forgot_password"
          className="newpass_image"
        />
        <IonLabel className="forgot_title">Forgot Password?</IonLabel>
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
        <div className="login_button">
          <IonButton
            onClick={() => {
              Cookies.set("reset", "true");
              resetPassword();
            }}
            size="large"
            fill="outline"
            expand="block"
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
            Have an account?{" "}
            <Link to="/login" className="login_btn">
              Login
            </Link>
          </div>
        </IonToolbar>
      </IonContent>
    </IonPage>
  );
};
export default NewPass;
