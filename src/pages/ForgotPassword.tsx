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
import { Link, RouteComponentProps } from "react-router-dom";
import Cookies from "js-cookie";

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

  const forgotPassword = () => {
    console.log("clicked");
    axios
      .put("http://localhost:3001/api/user/newpassword", {
        userId: match.params.id,
        newPassword: newPassword,
      })
      .then((response) => {
        console.log(response);
        setIsregistred(true);
        present(`${response.data.message}`, [{ text: "Ok" }]);
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
            Reset Password {match.params.id}{" "}
          </IonTitle>
        </IonToolbar>
        <br />
        <br />
        <br />
        <br />
        <br />

        <IonList className="ion-padding-bottom ion-margin-horizontal">
          <IonItem>
            <IonLabel position="floating">Password :</IonLabel>
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
        <div className="ion-text-center custom-font">
          <IonButton
            onClick={() => {
              Cookies.set("reset", "false");
              forgotPassword();
            }}
            size="small"
            fill="solid"
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
            Have an account? <Link to="/login">Login</Link>
          </div>
        </IonToolbar>
      </IonContent>
    </IonPage>
  );
};
export default Forgot;
