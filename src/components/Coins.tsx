import {
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonThumbnail,
  IonImg,
  IonCardContent,
  IonToolbar,
  IonRow,
  IonLabel,
  IonBadge,
  IonTitle,
  IonPage,
  IonBackButton,
  IonButtons,
  IonHeader,
  IonProgressBar,
  IonFooter,
  IonContent,
  IonInput,
  IonSelectOption,
  IonItem,
  IonList,
  IonSegment,
  IonIcon,
  IonSegmentButton,
  IonTextarea,
  IonListHeader,
  IonSelect,
  IonDatetime,
  IonButton,
  IonGrid,
  IonCol,
  IonNote,
} from "@ionic/react";
import { diamondOutline } from "ionicons/icons";
import axios from "axios";
import "./CreateEvent.scss";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import {Link, useHistory} from 'react-router-dom'
import { Plugins } from '@capacitor/core';
const { App: CapApp } = Plugins;
interface ContainerProps {
  setCoinsUser: (any) => any;
  coinsUser: number;
}

const CoinsPurchaser: React.FC<ContainerProps> = ({coinsUser, setCoinsUser}) => {
  const [paymementLink, setPaymentLink] = useState<string>('')
  const history = useHistory()
  const coinsInfo = {
    0: [50, 1, "Coins, coins, coins!", ""],
    1: [100, 2, "Coins and new friends!", ""],
    2: [150, 3, "More coins, more fun !", ""],
  };

  const goToPayment = (coins, price) => {
    const user_id = Cookies.get("user_id")
    axios.post(`/api/payments/init-payment`, {user_id:+user_id,coins_quantity:coins, price: price}).then((result) => {     
      Cookies.set("coins", `${coins}`)
    
      window.open(result.data.payUrl)
    })
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Coins Store</IonTitle>
          <IonButtons slot="start">
            <IonBackButton className="back_button" text="" color="dark" />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        &nbsp;
        <IonGrid fixed={true}>
          <IonRow>
            &nbsp;
            <IonCol size="8.5" className="color_title_coins">
              Coins
            </IonCol>
            <IonCol size="3">
              {" "}
              <IonBadge className="coins_icon_size">
                {" "}
                <IonIcon icon={diamondOutline} /> {coinsUser}
              </IonBadge>
            </IonCol>
          </IonRow>
        </IonGrid>
        &nbsp;
        {[...Array(3)].map((item, index) => {
          return (
            <IonCard key={index} className="coins_card_size">
              <IonCardHeader>
                <IonCardSubtitle> </IonCardSubtitle>
                <IonGrid>
                  <IonRow>
                    <IonCol size="10">
                      <IonCardTitle className="coins_card_title_info">
                        {coinsInfo[index][0] + " "}
                        <IonIcon icon={diamondOutline} size="small"/>
                      </IonCardTitle>
                    </IonCol>
                    <IonCol>
                      <IonCardTitle className="coins_card_title_info">
                        {coinsInfo[index][1]}DT
                      </IonCardTitle>
                    </IonCol>
                  </IonRow>
                </IonGrid>
              </IonCardHeader>
              <IonCardContent className="text_size_coins">
                {coinsInfo[index][2]}
              </IonCardContent>
              <IonButton expand="full" color="primary" onClick={()=> {let coins = coinsInfo[index][0]; let price = coinsInfo[index][1]; goToPayment(coins, price)
              }}>
                Buy Now
              </IonButton>
              &nbsp;
            </IonCard>
          );
        })}
      </IonContent>
      <IonFooter className="ion-no-border">
      <IonNote className="coins_contact_admin">Contact us: Cheers@gmail.com </IonNote>      
    </IonFooter>
    </IonPage>
  );
};

export default CoinsPurchaser;
