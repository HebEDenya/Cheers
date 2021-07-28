import { IonIcon, IonContent, IonHeader, IonPage,useIonAlert , IonTitle, IonToolbar, IonInput, IonItem, IonLabel, IonList, IonItemDivider, IonButton, IonFooter, } from '@ionic/react';
//import ExploreContainer from '../components/ExploreContainer';
import axios from 'axios';
import { lockClosed, person, mailOpen } from 'ionicons/icons';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import nodemailer from "nodemailer";

// import './Register.scss';
//import { star } from 'ionicons/icons';
const NewPass: React.FC = () => {
    const [email,setEmail] = useState<string>();
    const [user_id, setUser_id] = useState<string>();
    const [newPassword, setNewPassword] = useState<string>();
    const [isRegistred, setIsregistred] = useState<boolean>(false)
    const [present] = useIonAlert();

    const resetPassword = () => {
    //   axios.put("http://localhost:3001/api/user/newpassword", {
    //     email: email,
    //     user_id: user_id,
    //     newPassword: newPassword,
    //     oldPassword: oldPassword,
    //   }).then((response) => {
    //     console.log(response)
    //     if(response.data.message && response.statusText ==="OK") {
    //       setIsregistred(true)
    //       present(`${response.data.message}`, [{ text: 'Ok' }])
    //     } 
    //   })
    console.log('clicked')
    
    
    }

    function Handleclick () {
        console.log('cccc')
        //   axios.put("http://localhost:3001/api/user/newpassword", {
  //     email: email,
  //     user_id: user_id,
  //     newPassword: newPassword,
  //     oldPassword: oldPassword,
  //   }).then((response) => {
  //     console.log(response)
  //     if(response.data.message && response.statusText ==="OK") {
  //       setIsregistred(true)
  //       present(`${response.data.message}`, [{ text: 'Ok' }])
  //     } 
  //   })
    }
  return (
    <IonPage>
    <IonHeader className="ion-no-border"> 
     
    </IonHeader>
    <IonContent>
    <br /><br /><br /><br /><br />

    <IonToolbar>    
        <IonTitle className="ion-text-center custom-font ">Reset Password</IonTitle>
      </IonToolbar>
      <br /><br /><br /><br /><br />

      <IonList className="ion-padding-bottom ion-margin-horizontal">
      <IonItem>
        <IonLabel position="floating">E-mail</IonLabel>
          <IonInput clear-input type="email" value={email} placeholder="Enter E-mail..." onIonChange={e => setEmail(e.detail.value!)}>
          <IonIcon size="small" slot="start" icon={mailOpen} />
          </IonInput>
        </IonItem>
        
         
      </IonList>
      <br /><br />
      <div className="ion-text-center custom-font">

      <IonButton onClick={ resetPassword } size="small"  fill="solid">Submit</IonButton>
     </div>
      <br /><br /><br /><br /><br />

      <IonToolbar>
    <div className="ion-text-center custom-font">Have an account? <Link to="/login">Login</Link></div>
  </IonToolbar>
     
    </IonContent>
  </IonPage>
  );
};
export default NewPass;
