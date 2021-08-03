import { IonGrid, IonChip, IonContent, IonHeader, IonPage, useIonAlert, IonTitle, IonToolbar, IonInput, IonItem, IonFooter, IonList, IonItemDivider, IonButton, IonCol, IonRow, IonCheckbox, IonLabel, IonIcon, IonSpinner, IonRange } from '@ionic/react';
//import ExploreContainer from '../components/ExploreContainer';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
// import './Login.scss';
import Tab1 from './Tab1';
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router'
import { lockClosed, person } from 'ionicons/icons';

interface loginProps {
  login: any,
  setLogin: any,
  setuser_id: any
}


const Login: React.FC<loginProps> = ({ login, setLogin, setuser_id }) => {
  const [username, setUsername] = useState<string>();
  const [rememberMe, setRememberMe] = useState<boolean>(true);
  const [password, setPassword] = useState<string>();
  const [loginStatus, setLoginStatus] = useState<boolean>(false);
  axios.defaults.withCredentials = true;
  const history = useHistory();
  const [present] = useIonAlert();

  const userLogin = () => {
    axios.post("http://localhost:3001/api/user/login", {
      username: username,
      password: password
    }).then((response) => {
      if (response.data.message) {
        setLoginStatus(false);
        present(`${response.data.message}`, [{ text: 'Ok' }])
      } else {
        let res = response.data.result;
        res.rememberMe = rememberMe;
          setuser_id(response.data.result.user_id);
          setLogin({ auth: response.data.auth, result: res, token: response.data.token })
        localStorage.setItem("token", response.data.token)
        setLoginStatus(true);
        
      }
    })
  }
  useEffect(() => {
    // axios.get("http://localhost:3001/api/user/login").then((response) => {
    //   if (response.data.auth === true) {
    //     console.log(response.data.auth);
    //     setLoginStatus(response.data.result[0].username)
    //   }
    // })
  }, [])
  return (
    <IonPage>
      <IonHeader className="ion-header ion-no-border">
      </IonHeader>
      <IonContent>
        <br /><br /><br /><br /><br /><br /><br />
        <IonToolbar>
          <div className="ion-toolbar"></div>
          <IonTitle className="ion-text-center custom-font"><h5>Login</h5></IonTitle>
        </IonToolbar>
        <IonGrid>
          <br /><br /><br />
          <IonRow>
            <IonCol>
              <IonList>
                <IonItem>
                <IonLabel position="floating">Username</IonLabel>
                  <IonInput clearInput type="text" value={username} placeholder="Enter Username..." onIonChange={e => setUsername(e.detail.value!)}>
                  <IonIcon size="small" slot="start" icon={person} />
                  </IonInput>
                </IonItem>
                <IonItem>
                <IonLabel position="floating">Password </IonLabel>
                  <IonInput clear-input type="password" value={password} placeholder="Enter Password..." onIonChange={e => setPassword(e.detail.value!)}>
                    <IonIcon size="small" slot="start" icon={lockClosed} /></IonInput>
                </IonItem>
                <br />
                <IonList>
                  <IonItem lines="none" >
                  <IonLabel>Remember me</IonLabel> 
                    <IonCheckbox onIonChange={(e)=>{setRememberMe(e.detail.checked)}} checked={rememberMe} slot="start" />
                  </IonItem>
                </IonList>
                <br /><br />
                <div className="ion-text-center custom-font">
                <IonButton onClick={userLogin}  size="default" fill="solid" >  Login  </IonButton>
                </div>
              </IonList>
              <IonToolbar>
            <div className="ion-text-center custom-font" ><Link to="/password">Forgot password ? <IonIcon size="small" slot="start" icon={lockClosed} /></Link></div>
          </IonToolbar>
            </IonCol>
          </IonRow>
        </IonGrid>
        <br /><br /><br /><br /><br />

        <IonFooter class="ion-no-border">
          <IonToolbar>
            <div className="ion-text-center custom-font">New Here? <Link to="/register">Register</Link></div>
          </IonToolbar>
        </IonFooter>
      </IonContent>

    </IonPage>
  );
};
export default Login;
