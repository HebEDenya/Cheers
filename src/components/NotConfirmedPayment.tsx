import { IonPage, IonContent, IonCard,IonCardHeader,IonLabel,IonButton } from '@ionic/react';
import Cookies from "js-cookie";



const NotConfirmedPayment: React.FC = () => {
  Cookies.remove("coins")   
  return (
    <IonPage>
     <IonContent fullscreen>
           &nbsp;
          <IonCard>
          <img src="https://res.cloudinary.com/dxhyydpng/image/upload/v1627496104/bypaumesyekd3rqdjswj.gif" alt=""  className="favorite_img_size" />
          <IonCardHeader>
          <IonLabel className="no_title_fav">Failed payment!</IonLabel>
          <IonButton fill="outline" expand="full" routerLink="/CoinsPurchase"> Try again</IonButton>
        </IonCardHeader>
        </IonCard>
        </IonContent>
    </IonPage>
  );
};

export default NotConfirmedPayment;
