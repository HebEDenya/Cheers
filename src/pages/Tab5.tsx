import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonSearchbar, IonFooter,IonList, IonListHeader,IonLabel } from '@ionic/react';
import React, { useState } from 'react';
import './Tab3.scss'

  
  const Tab5: React.FC = () => {
    const [searchText, setSearchText] = useState('');
    return (
      <IonPage>
      <IonHeader>
        <IonListHeader>
        <IonLabel className="favorite_title_size"  color="primary" >
             Search
         </IonLabel>
         </IonListHeader>
      </IonHeader>
      <IonContent>
      <IonToolbar>
        <IonSearchbar value={searchText} onIonChange={e => setSearchText(e.detail.value!)}></IonSearchbar>
      </IonToolbar>
      

    </IonContent>
    </IonPage>
    );
  };
  
  export default Tab5;
  