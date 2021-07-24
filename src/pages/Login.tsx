import {IonAvatar, IonChip, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonItem, IonFooter, IonList, IonItemDivider, IonButton } from '@ionic/react';
//import ExploreContainer from '../components/ExploreContainer';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
// import './Login.scss';
import Tab1 from './Tab1';
import {Link} from 'react-router-dom'
import { useHistory } from 'react-router'
const Login: React.FC = () => {
    const [username, setUsername] = useState<string>();
    const [password, setPassword] =  useState<string>();
    const [loginStatus, setLoginStatus] =  useState<boolean>(false);
    axios.defaults.withCredentials = true;
    const history = useHistory();
    const userLogin = () => {
      axios.post("http://localhost:3001/api/user/login", {
        username: username,
        password: password,
      }).then((response) => {
        console.log(response)
        if(response.data.message) {
          setLoginStatus(false);
          alert(response.data.message)
        } else {
          localStorage.setItem("token", response.data.token)
          setLoginStatus(true);
          window.history.replaceState({}, "", "/home")
          history.go(0);
          console.log(response.data.result[0].username+ ' is connected')
        }
      })
    }
    useEffect(() => {
       axios.get("http://localhost:3001/api/user/login").then((response) => {
        console.log(response)
        if(response.data.loggedIn === true) {
            setLoginStatus(response.data.result[0].username)
        }
      })
    }, [])
  return (
    // <div>
    // {loginStatus ? <div><Tab1 /></div>
    //   :<div></div>}
    // </div>
    <IonPage>
      <IonHeader className="ion-header ion-no-border">
        <IonToolbar>
          <div className="ion-toolbar"></div>
          <IonTitle className="ion-text-center custom-font"><h5>Login</h5></IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="ion-content"></div>
        <IonList className="--padding-bottom">
          <IonItemDivider>Username</IonItemDivider>
          <IonItem>
            <IonInput clear-input value={username} placeholder="Enter Username..." onIonChange={e => setUsername(e.detail.value!)}></IonInput>
          </IonItem>
          <IonItemDivider>Password</IonItemDivider>
          <IonItem>
            <IonInput clear-input value={password} placeholder="Enter Password..." onIonChange={e => setPassword(e.detail.value!)}></IonInput>
          </IonItem>
        </IonList>
        <div className="ion-text-center custom-font loginbtn">
        <IonButton onClick={userLogin} size="small" shape="round" fill="outline">Login</IonButton>
        </div>
        {/* <IonButton color="secondary">Secondary</IonButton> */}
      </IonContent>
      <IonFooter class="ion-no-border">
  <IonToolbar>
    <div className="ion-text-center custom-font">New Here? <Link to="/register">Register</Link></div>
  </IonToolbar>
</IonFooter>
    </IonPage>
  );
};
export default Login;
