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
  IonInput,
IonCardHeader,
IonCardSubtitle,
IonCardTitle,
  IonCard,
  IonSelect,
IonSelectOption,
  IonCardContent,
  IonIcon,
  useIonAlert,
  IonListHeader,
  IonList,
  IonButton
} from "@ionic/react";
import { useState, useEffect, } from "react";
import { addOutline,  close, remove, checkmark, mail, mailOutline } from "ionicons/icons";
import axios from "axios";
import Cookies from "js-cookie";



interface adminProps {
  type_user: string
}

const AdminTab3: React.FC<adminProps> = ({type_user}) => {
const [adminList, setAdminList] = useState<Array<any>>([])
const [removeButton, setremoveButton] = useState<{clicked:boolean, btn_Id: number | null}>({clicked:false, btn_Id:null })
const [addButton, setAddButton] = useState<boolean>(false)
const [adminEmail, setAdminEmail] = useState<string>();
const [adminUsername, setAdminUsername] = useState<string>();
const [adminPassword, setAdminPassword] = useState<string>();
const [adminStatus, setAdminStatus] = useState<string>();
const [present] = useIonAlert();

//reset values
const resetValues = () => {
  setAdminEmail('')
  setAdminPassword('')
  setAdminStatus('')
  setAdminUsername('')
}
// to get the list of the admin
const getAdminListe = ()=> {
  axios.get('/api/listeofadmin').then((result) => {
    setAdminList(result.data)
  }).catch((err) => {console.log(err);
  })
}
useEffect(()=> {
  getAdminListe()
},[addButton])

// to remove an admin
useEffect(() => {
  const userId = Cookies.get("user_id")
  if (type_user && +userId=== removeButton.btn_Id) { 
    present("You can't remove yourself ❗")
  }
  if (type_user && +userId!== removeButton.btn_Id) {
    setAdminList(adminList.filter((item)=> item.user_id !==removeButton.btn_Id ))
  if(removeButton.btn_Id && +userId!== removeButton.btn_Id ) {
    axios.delete(`/api/removeAdmin/${removeButton.btn_Id}`).then((result)=> {
       if (result.data ="Admin removed") {
         present('Admin removed successfully 👌')
         
       }   
    }).catch(() => {
      present('An error has occured ❌')
    })
  }}
}, [removeButton.btn_Id])

 // To add a new admin 
 const handleAddAdmin = () => {
   if (adminPassword && adminStatus && adminUsername && adminEmail) {
     axios.post('/api/addadmin', {email: adminEmail, username:adminUsername, type_user: adminStatus, password: adminPassword}).then((result) => {
       if ( result.data === "added") {
        present('Admin added successfully')
        setAddButton(false)
        setAdminList(adminList.concat({email: adminEmail, username:adminUsername, type_user: adminStatus, password: adminPassword}))
        resetValues()
       }  
     }).catch(err=> {console.log(err);})
   } else {
    present('Missing input(s)')
   }
 }

  return (
    <IonPage>
    <IonHeader>
      <IonListHeader>
      <IonLabel className="homepage_admine_title"  color="warning" >
           List of admins
       </IonLabel>
       </IonListHeader>
    </IonHeader>
    <IonContent className= "admin_dashbord_space" >
    <IonList>
    {adminList.length && adminList.map((admin, i) => {
      return (
      <IonItem className="admin_liste_style" lines="none" key={i}>
      <IonLabel>
        <h2 className="text_admin_label_color">
           { admin.type_user === "superAdmin" ?  'Head Admin : '+ admin.username : admin.type_user+ ' : ' + admin.username }
        </h2>
      </IonLabel> <IonIcon icon={remove}  color="warning" onClick={()=> {setremoveButton({clicked:true, btn_Id:admin.user_id})}}/>
    </IonItem>)
    })}
    </IonList>
    <IonButton color="warning" className="btn_admin_tab3_style" onClick={()=> {setAddButton(true)}}> <IonIcon icon={addOutline} color="light"  /> </IonButton>
    {addButton ? 
      <IonCard>
      <IonCardHeader>
        <IonCardTitle className="add_admintab3_title_style">Add a new admin </IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
      <IonItem>
            <IonLabel>E-mail |</IonLabel>
            <IonInput type="email" value={adminEmail} onIonChange={e => setAdminEmail(e.detail.value!)} clearInput></IonInput>
          </IonItem>
      <IonItem>
            <IonLabel >Username |</IonLabel>
            <IonInput type="text"value={adminUsername} onIonChange={e => setAdminUsername(e.detail.value!)} clearInput></IonInput>
          </IonItem>
      <IonItem>
            <IonLabel >Password |</IonLabel>
            <IonInput type="password" value={adminPassword} onIonChange={e => setAdminPassword(e.detail.value!)} clearInput></IonInput>
          </IonItem>
       
          <IonItem >
             <IonLabel >Status </IonLabel> 
             <IonSelect value={adminStatus} okText="Okay"  onIonChange={e => {setAdminStatus(e.detail.value);}} >
               <IonSelectOption value="superAdmin"  >Head Admin</IonSelectOption>
               <IonSelectOption value="Admin"  >Admin</IonSelectOption>
             </IonSelect>
           </IonItem>
        <IonItem lines="none">
          <IonIcon color="warning"  icon={close} slot="start" onClick={()=> {setAddButton(false); resetValues()}}></IonIcon>
          <IonIcon color="warning"  icon={checkmark} slot="end" onClick={()=> { handleAddAdmin()}}></IonIcon>
        </IonItem>
      </IonCardContent>
    </IonCard>


    : ''}
    </IonContent>
    </IonPage>
  );
};

export default AdminTab3;
  