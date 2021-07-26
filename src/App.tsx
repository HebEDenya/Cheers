import React, { useState, useEffect } from "react";
import { Redirect, Route, useHistory } from "react-router-dom";
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonToolbar,
   
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import CreateEventComponenetPart1 from "./components/CreateEvent.Part1";
import CoinsPurchaser from "./components/Coins";
import "./App.css";
import { heart, person, home, chatboxEllipses, search, personAdd,build } from "ionicons/icons";
import Tab1 from "./pages/Tab1";
import Tab2 from "./pages/Tab2";
import Tab3 from "./pages/Tab3";
import Tab5 from "./pages/Tab5";
import UpdateProfil from "./components/UpdateProfil";
import axios from "axios";
import MyEvents from "./components/MyEvents";
import FirstPage from "./pages/FirstPage";
import "@ionic/react/css/core.css";
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";
import "./theme/variables.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cookies from "js-cookie";
import AdminTab1 from "./pages/AdminTab1";
import AdminTab2 from "./pages/AdminTab2";
import AdminTab3 from "./pages/AdminTab3";
import './pages/Admin.scss';

const App: React.FC = () => {
  const [isLoding, setIsLoading] = useState<boolean>(true)
  const [coinsUser, setCoinsUser] = useState<number>(40)
  const [user_id, setuser_id] = useState<number |null>(null)
  const [login, setLogin] = useState<{auth:boolean, result:any}>({auth:false, result:{}})
  const [events, setEvents] = useState([]);
  const [type_user, setTypeUser] = useState<string | null>(null);
  const [logOut, setLogout] = useState<boolean>(false);

  
/// for the first page to load 
  useEffect(()=> {
    setTimeout(()=> {
      setIsLoading(false)
    },2000);
  },[])


  // add id to cookies 
      if ( login.auth) {
      const id = login.result.user_id
      const type_user = login.result.type_user      
      Cookies.set("user_id", `${id}`) 
      Cookies.set("type_user", `${type_user}`) 
    }
 
 // to get cookie
 const readCookie = () => {
  const user = Cookies.get("user_id")
  const type = Cookies.get("type_user")
  if (user) {
  setuser_id(+user)
  setTypeUser(type)
 }
 }
 useEffect(()=> {
  readCookie()
 },[])

 //remove Cookies user_id and type_use when logOut
  if (logOut) {
    Cookies.remove("user_id")
    Cookies.remove("type_user")   
    localStorage.removeItem('token')
  }

  ///// to get the users coins
  const handleGettingUserCoinsInfo = () => {
    if(user_id) {
    axios
      .get(`/api/getCoins/${user_id}`)
      .then((result) => {
        setCoinsUser(result.data[0].coins_quantity);
      })
      .catch((err) => {
        console.log(err);
      });}
  };

  useEffect(() => {
    handleGettingUserCoinsInfo();
  }, [coinsUser, user_id]);
  
  // to get all events
  useEffect(() => {
    axios.get('/api/home').then((result) => {
     setEvents(result.data)
    })
    .catch((err) => {
     console.log(err);
   });
  },[])
  
  if (isLoding) {
    return (
    <FirstPage />
    )
  }  else {
  return (
  <IonApp>
    {!login.auth && user_id===null ? 
    <IonReactRouter>
      <Route exact path='/register'>
    <Register /> 
    </Route>
    <Redirect exact from="/" to="/register">
    </Redirect>
    <Route exact path="/login">
    <Login  login={login} setLogin={setLogin} setuser_id={setuser_id} /> 
    </Route>
    <Redirect exact from="/tab2" to="/login"></Redirect>
    </IonReactRouter>
     :
    <IonReactRouter>  
    <IonRouterOutlet>          
    </IonRouterOutlet>
      <IonTabs>
        <IonRouterOutlet>
   {Cookies.get("type_user") === "superAdmin" ||  Cookies.get("type_user") === "Admin"? <Redirect exact from="/login" to="/adminTab1" /> : <Redirect exact from="/login" to="/tab1" /> }
          <Route exact path="/tab1">
            <Tab1  events = {events}/>
          </Route>
          <Route exact path="/tab2">
            <Tab2 coinsUser= {coinsUser} user_id={user_id} setLogout={setLogout}/>
          </Route>
          <Route path="/tab3" >
            <Tab3 user_id={user_id} />
          </Route>
          <Route path="/tab5">
            <Tab5 events={events} />
          </Route>
          <Route exact path="/">
            <Redirect to="/tab1" />
          </Route>
          <Route path="/update">
            <UpdateProfil user_id={user_id}  />
          </Route>
          <Route path="/CreateEvent" >
            <CreateEventComponenetPart1 setCoinsUser={setCoinsUser} coinsUser={coinsUser} user_id={user_id}/>
          </Route>
          <Route path="/CoinsPurchase" >
            <CoinsPurchaser  coinsUser= {coinsUser}setCoinsUser={setCoinsUser} />
            </Route>
          <Route path="/myevents" >
            <MyEvents user_id={user_id} />
          </Route>
          <Route path="/adminTab1" >
            <AdminTab1 setLogout={setLogout} type_user= {type_user}/>
          </Route>
          <Route path="/adminTab2" >
            <AdminTab2  />
          </Route>
          <Route path="/adminTab3" >
            <AdminTab3 type_user= {type_user}/>
          </Route>
        </IonRouterOutlet>
       {Cookies.get("type_user") === "superAdmin" ||  Cookies.get("type_user") === "Admin"? 
        <IonTabBar slot="bottom" >
      <IonTabButton tab="Admin1" href="/adminTab1" className="amdin_tool_bar" >
        <IonIcon icon={home} className="amdin_tool_bar"/>
      </IonTabButton>
      <IonTabButton tab="Admin2" href="/adminTab2" className="amdin_tool_bar">
        <IonIcon icon={build} className="amdin_tool_bar" />
      </IonTabButton>
      <IonTabButton tab="Admin3" href="/adminTab3" className="amdin_tool_bar">
        <IonIcon icon={personAdd} className="amdin_tool_bar" />
      </IonTabButton>
    </IonTabBar>
:
        <IonTabBar slot="bottom">
        <IonTabButton tab="tab1" href="/tab1">
          <IonIcon icon={home} />
        </IonTabButton>
        <IonTabButton tab="tab2" href="/tab2">
          <IonIcon icon={person} />
        </IonTabButton>
        <IonTabButton tab="tab3" href="/tab3">
          <IonIcon icon={heart} />
        </IonTabButton>
        <IonTabButton tab="tab4" href="#">
          <IonIcon icon={chatboxEllipses} />
        </IonTabButton>
        <IonTabButton tab="tab5" href="/tab5" >
          <IonIcon icon={search} />
        </IonTabButton>
      </IonTabBar> 
  }
  </IonTabs>
</IonReactRouter>}
  </IonApp>
);}
}
export default App;
