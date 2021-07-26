import { IonIcon, IonContent, IonHeader, IonPage,useIonAlert , IonTitle, IonToolbar, IonInput, IonItem, IonLabel, IonList, IonItemDivider, IonButton, IonFooter, } from '@ionic/react';
//import ExploreContainer from '../components/ExploreContainer';
import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import './Register.scss';
//import { star } from 'ionicons/icons';
const Register: React.FC = () => {
    const [emailReg, setemailReg] = useState<string>();
    const [usernameReg, setUsernameReg] = useState<string>();
    const [passwordReg, setPasswordReg] = useState<string>();
    const [isRegistred, setIsregistred] = useState<boolean>(false)
    const [present] = useIonAlert();

    const userRegister = () => {
      axios.post("http://localhost:3001/api/user/register", {
        email: emailReg,
        username: usernameReg,
        password: passwordReg,
      }).then((response) => {
        if(response.data.message && response.statusText ==="OK") {
          setIsregistred(true)
          present(`${response.data.message}`, [{ text: 'Ok' }])
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
     {!isRegistred? <IonButton onClick={ userRegister} size="small" shape="round" fill="outline">Signup</IonButton>: <IonButton routerLink="Login" size="small" shape="round" fill="outline">Go to log in</IonButton> }
      </div>
      <IonToolbar>
    <div className="ion-text-center custom-font">Have an account? <Link to="/login">Login</Link></div>
  </IonToolbar>
    </IonContent>
  </IonPage>
  );
};
export default Register;
