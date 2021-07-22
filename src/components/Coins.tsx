import {IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle,IonThumbnail, IonImg, IonCardContent , IonToolbar,IonRow, IonLabel ,IonBadge, IonTitle,IonPage, IonBackButton, IonButtons,IonHeader,IonProgressBar,IonText,IonContent, IonInput,IonSelectOption, IonItem, IonList, IonSegment, IonIcon,IonSegmentButton, IonTextarea,IonListHeader, IonSelect, IonDatetime, IonButton, IonGrid, IonCol } from '@ionic/react';
import { diamondOutline } from 'ionicons/icons';
import axios from "axios";
import './CreateEvent.scss';
import {useState, useEffect} from 'react';

interface ContainerProps {
  
}

const CoinsPurchaser: React.FC<ContainerProps> = () => {
    const coinsInfo = {0:[50, 1, "Coins, coins, coins!", ""], 1:[100, 2, "Coins and new friends!", ""], 2:[150, 3, "More coins, more fun !", ""]}
   
    //to get the users coins 
    // const handleGettingUserCoinsInfo = () => {
    //   axios.get('/api/getCoins').then((result) => {
    //     console.log(result);
        
    //   })
    // }

    // useEffect(()=> {
    //   handleGettingUserCoinsInfo()
    // }, [])

    
  
  
    return (
    <IonPage>
    <IonHeader>
    <IonToolbar>
    <IonTitle>Coins Store</IonTitle>
    <IonButtons slot="start">
    <IonBackButton text="Back" color="dark"/> 
    </IonButtons>
    </IonToolbar>
    </IonHeader>
    <IonContent>
         &nbsp;
         <IonGrid fixed={true}>
      <IonRow > 
         &nbsp;
        <IonCol size="8.5" className="color_title_coins">Coins</IonCol>
        <IonCol size="3"> <IonBadge className="coins_icon_size"> <IonIcon icon={diamondOutline} /> 40</IonBadge></IonCol>
      </IonRow>
      </IonGrid>
      
      &nbsp;
     
          
          {[...Array(3)].map((item, index)=> {
              return (
          <IonCard key={index} className="coins_card_size">
          <IonCardHeader>
            <IonCardSubtitle> </IonCardSubtitle>
            <IonGrid>
            <IonRow>
            <IonCol size="7"><IonCardTitle className="coins_card_title_info">{coinsInfo[index][0] }<IonIcon icon={diamondOutline} size="small" /></IonCardTitle></IonCol>
            <IonCol><IonCardTitle className="coins_card_title_info" >{coinsInfo[index][1]}DT</IonCardTitle></IonCol>
            </IonRow>
            </IonGrid>
          </IonCardHeader>
           <IonCardContent className="text_size_coins">
          {coinsInfo[index][2] }
      </IonCardContent>
       <IonButton expand="full"color="primary">Buy Now</IonButton>
      &nbsp;
        </IonCard> 
        
              )
          })}
        
     </IonContent>
    </IonPage>
  );
};

export default CoinsPurchaser;
