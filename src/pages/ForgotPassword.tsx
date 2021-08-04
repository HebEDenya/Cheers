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
import { Link, RouteComponentProps, useHistory } from "react-router-dom";
import Cookies from "js-cookie";
import "./ForgotPassword.scss";
import reset from "../photos/reset.png"

interface resetProps
  extends RouteComponentProps<{
    id: string;
  }> {}
// import './Register.scss';
//import { star } from 'ionicons/icons';
const Forgot: React.FC<resetProps> = ({ match }) => {
  const [email, setEmail] = useState<string>();
  const [user_id, setUser_id] = useState<string>();
  const [newPassword, setNewPassword] = useState<string>();
  const [isRegistred, setIsregistred] = useState<boolean>(false);
  const [present] = useIonAlert();
  const history = useHistory();
  const forgotPassword = () => {
    axios
      .put("http://localhost:3001/api/user/newpassword", {
        userId: match.params.id,
        newPassword: newPassword,
      })
      .then((response) => {
        setIsregistred(true);
        if (response.data.affectedRows === 1) {
          present(`Password updated  ✔`, [{ text: "Ok" }]);
        } else {
          present(`Try again 👁‍🗨`, [{ text: "Ok" }]);
        }
      });
  };

  return (
    <IonPage>
      <IonContent>
        <IonImg src={reset} alt="" className="reset_image" />
        <br />
        <br />
        <br />
        <br />
        <br />

          <IonLabel className="reset_title">
            Reset Password
          </IonLabel >
        <br />
        <br />
     

        <IonList className="ion-padding-bottom ion-margin-horizontal">
          <IonItem>
            <IonLabel position="floating">Password</IonLabel>
            <IonIcon name="lockClosed"></IonIcon>
            <IonInput
              clear-input
              type="password"
              value={newPassword}
              placeholder="Enter New Password..."
              onIonChange={(e) => setNewPassword(e.detail.value!)}
            >
              <IonIcon size="small" slot="start" icon={lockClosed} />
            </IonInput>
          </IonItem>
        </IonList>
        <br />
        <br />
        <div className="login_button">
          <IonButton
            onClick={() => {
              Cookies.set("reset", "false");
              forgotPassword();
            }}
            size="large"
            fill="outline"
            expand="block"
          >
            Submit
          </IonButton>
        </div>
        <br />
        <br />
        <br />
        <br />
        <br />

        <IonToolbar>
          <div className="ion-text-center custom-font">
            Go to <a href="/login" className="login_btn">Login</a>
          </div>
        </IonToolbar>
      </IonContent>
    </IonPage>
  );
};
export default Forgot;
