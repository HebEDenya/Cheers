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
import "./Register.scss";
import { resultingClientExists } from "workbox-core/_private";
// import './Register.scss';
//import { star } from 'ionicons/icons';
import young from "../photos/young.png";

const Register: React.FC = () => {
  const [emailReg, setemailReg] = useState<string>();
  const [usernameReg, setUsernameReg] = useState<string>();
  const [passwordReg, setPasswordReg] = useState<string>();
  const [isRegistred, setIsregistred] = useState<boolean>(false);
  const [present] = useIonAlert();

  const userRegister = () => {
    axios
      .post("http://localhost:3001/api/user/register", {
        email: emailReg,
        username: usernameReg,
        password: passwordReg,
      })
      .then((response) => {
        // console.log(response.data.sqlMessage.split(`USERS.email`).length);

        if (response.data === '"email" must be a valid email') {
          present("Please verify your Email ❌");
        } else if (
          response.data ===
          '"password" length must be at least 8 characters long'
        ) {
          present("Password minimum 8 characters ❌");
        } else if (
          response.data ===
          '"username" length must be at least 5 characters long'
        ) {
          present("Username minimum 5 characters ❌");
        } else if (response.data.message && response.statusText === "OK") {
          setIsregistred(true);
          present(`${response.data.message}`, [{ text: "Ok" }]);
        } else if (response.data.sqlMessage.split(`USERS.email`).length === 2) {
          present("Email not accepted ⛔");
        } else if (
          response.data.sqlMessage.split(`USERS.username`).length === 2
        ) {
          present("Try another username ❗");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <IonPage>
      <IonImg className="image_register" src={young} alt="" />
      <IonContent>
        <IonLabel className="create_account_title">Create Account</IonLabel>
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
              value={emailReg}
              placeholder="Enter E-mail..."
              onIonChange={(e) => setemailReg(e.detail.value!)}
            >
              <IonIcon size="small" slot="start" icon={mailOpen} />
            </IonInput>
          </IonItem>

          <IonItem>
            <IonLabel position="floating">Username</IonLabel>
            <IonInput
              clear-input
              type="text"
              value={usernameReg}
              placeholder="Enter Username..."
              onIonChange={(e) => setUsernameReg(e.detail.value!)}
            >
              <IonIcon size="small" slot="start" icon={person} />
            </IonInput>
          </IonItem>

          <IonItem>
            <IonLabel position="floating">Password</IonLabel>
            <IonInput
              clear-input
              type="password"
              value={passwordReg}
              placeholder="Enter Password..."
              onIonChange={(e) => setPasswordReg(e.detail.value!)}
            >
              <IonIcon size="small" slot="start" icon={lockClosed} />
            </IonInput>
          </IonItem>
        </IonList>
        <br />
        <br />
        <div className="signup_btn">
          {!isRegistred ? (
            <IonButton
              onClick={userRegister}
              size="large"
              fill="outline"
              expand="block"
            >
              Signup
            </IonButton>
          ) : (
            <IonButton
              routerLink="Login"
              size="large"
              fill="outline"
              expand="block"
              className="signup_btn"
            >
              Go to Login
            </IonButton>
          )}
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
export default Register;
