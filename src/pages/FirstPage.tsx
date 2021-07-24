import {IonToolbar, IonImg , IonPage,  } from '@ionic/react';
import hotocheerse from  '../photos/photocheerse.png';

interface ContainerProps {
  setPageSwitcher: any,
}

const FirstPage: React.FC  = () => {
    return (
      <IonPage>
        <IonToolbar></IonToolbar>
        <IonImg src={hotocheerse} />
      </IonPage>
    );
  };
  
  export default FirstPage;
  