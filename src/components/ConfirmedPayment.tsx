import { IonPage, IonContent, IonCard,IonCardHeader,IonLabel,IonButton,IonIcon } from '@ionic/react';
import axios from 'axios';
import Cookies from "js-cookie";
import { alertCircle } from 'ionicons/icons';

interface coinsProps {
  setCoinsUser:any,
  setuser_id:any,
  coinsUser:number
}

const ConfirmedPayment: React.FC<coinsProps> = ({setCoinsUser,setuser_id}) => {

  const updateCoins = () => {
    const user_id = Cookies.get("user_id")
    const coins = Cookies.get("coins")
    axios.put(`api/paymentInfo/${+user_id}/${+coins}`).then((result) => {
      setCoinsUser(+coins+result.data)
      setuser_id(+user_id)
      Cookies.remove("coins")   
    })
  }
 
  return (
    <IonPage>
     <IonContent fullscreen>
           &nbsp;
          <IonCard>
          <img src="https://res.cloudinary.com/dxhyydpng/image/upload/v1627496603/oce77p3elunbv3qghsig.gif" alt=""  className="favorite_img_size" />
          <IonCardHeader>
          <IonLabel className="no_title_fav">Payment completed !</IonLabel>
          <IonLabel className="no_title_fav"></IonLabel>
          <IonButton color="danger" fill="outline" expand="full" routerLink="/CoinsPurchase" onClick={() => {updateCoins()}}> <IonIcon size="large" slot="start" icon={alertCircle}  /> 
          Click here to update your coins</IonButton>
        </IonCardHeader>
        </IonCard>
        </IonContent>
    </IonPage>
  );
};

export default ConfirmedPayment;
