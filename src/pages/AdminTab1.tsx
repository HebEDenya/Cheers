import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonItem,
    IonLabel,
    IonAvatar,
    IonBadge,
    IonText,
    IonCard,
    IonCardContent,
    IonIcon,
    useIonAlert,
    IonListHeader
  } from "@ionic/react";
  import {useHistory} from "react-router-dom"
  import ExploreContainer from "../components/ExploreContainer";
  import { chevronForwardOutline, logOut } from "ionicons/icons";
  import './Admin.scss' 
  import Cookies from "js-cookie";
  
  
  interface adminProps {
    setLogout:any,
    type_user: string
  }
  
  
  const AdminTab1: React.FC<adminProps> = ({setLogout, type_user}) => {
    const [present] = useIonAlert();
    const history = useHistory()
  
  const LogoutRedirect = () => {
    setLogout(true);
    history.go(0)
  }
  
    return (
       <IonPage>
     <IonHeader>
        <IonListHeader>
        <IonLabel className="homepage_admine_title"  color="warning" >
             Welcome To Admin Dashbord
         </IonLabel>
         </IonListHeader>
      </IonHeader>
     <IonContent className= "admin_dashbord_space">
     <IonCard routerLink="/adminTab2">
          <IonCardContent className="my_account_text" >
            Manage Posts
            <div className="userDasbord_icon">
              <IonIcon icon={chevronForwardOutline} className="icon-card" />
            </div>
          </IonCardContent>
        </IonCard>
      {Cookies.get("type_user") === "superAdmin" ?
     <IonCard routerLink="/adminTab3" >
          <IonCardContent className="my_account_text">
            Manage admins
            <div className="userDasbord_icon">
              <IonIcon icon={chevronForwardOutline} className="icon-card" />
            </div>
          </IonCardContent>
        </IonCard> :
        <IonCard onClick={() => present("You don't have permission 🛑", [{ text: 'Ok' }])}>
        <IonCardContent className="my_account_text">
          Manage admins
          <div className="userDasbord_icon">
            <IonIcon icon={chevronForwardOutline} className="icon-card" />
          </div>
        </IonCardContent>
      </IonCard>
        }
         <IonCard routerLink="/postCategory">
          <IonCardContent className="my_account_text" >
            Manage Categories
            <div className="userDasbord_icon">
              <IonIcon icon={chevronForwardOutline} className="icon-card" />
            </div>
          </IonCardContent>
        </IonCard>
        <IonCard onClick={()=>{LogoutRedirect()}}>
          <IonCardContent className="my_account_text">
            Log Out
            <div className="userDasbord_icon">
              <IonIcon icon={chevronForwardOutline} className="icon-card" />
            </div>
          </IonCardContent>
        </IonCard>
        <ExploreContainer name="AdminTab1 page" />
      </IonContent>
    </IonPage>
  );
      
  };
  
  export default AdminTab1;
  