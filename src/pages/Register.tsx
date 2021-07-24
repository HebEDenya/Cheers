import { IonIcon, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonItem, IonLabel, IonList, IonItemDivider, IonButton, IonFooter, } from '@ionic/react';
//import ExploreContainer from '../components/ExploreContainer';
import axios from 'axios';
import React, { useState } from 'react';
// import './Register.scss';
//import { star } from 'ionicons/icons';
const Register: React.FC = () => {
    const [emailReg, setemailReg] = useState<string>();
    const [usernameReg, setUsernameReg] = useState<string>();
    const [passwordReg, setPasswordReg] = useState<string>();
    const userRegister = () => {
      axios.post("http://localhost:3001/api/user/register", {
        email: emailReg,
        username: usernameReg,
        password: passwordReg,
      }).then((response) => {
        console.log(response.data.message)
        if(response.data.message) {
          alert(response.data.message)
        } 
      })
    }
  return (
    <IonPage>
    <IonHeader className="ion-no-border"> 
      <IonToolbar>    
        <IonTitle className="ion-text-center custom-font ">Register</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent>
      <IonList className="ion-padding-bottom ion-margin-horizontal">
        <IonItemDivider>E-mail</IonItemDivider>
        <IonItem>
          <IonInput clear-input type="email" value={emailReg} placeholder="Enter E-mail..." onIonChange={e => setemailReg(e.detail.value!)}></IonInput>
        </IonItem>
        <IonItemDivider>Username</IonItemDivider>
        <IonItem>
          <IonInput clear-input type="text" value={usernameReg} placeholder="Enter Username..." onIonChange={e => setUsernameReg(e.detail.value!)}></IonInput>
        </IonItem>
        <IonItemDivider>Password</IonItemDivider>
        <IonItem>
          <IonInput clear-input type="password" value={passwordReg} placeholder="Enter Password..."  onIonChange={e => setPasswordReg(e.detail.value!)}></IonInput>
        </IonItem>
      </IonList>
      <div className="ion-text-center custom-font">
      <IonButton onClick={ userRegister} size="small" shape="round" fill="outline">Signup</IonButton>
      </div>
    </IonContent>
  </IonPage>
  );
};
export default Register;
