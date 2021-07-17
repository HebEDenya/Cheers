import {IonToolbar, IonImg , IonPage,  } from '@ionic/react';
import hotocheerse from  '../photos/photocheerse.png';

interface ContainerProps {
  setPageSwitcher: any,
}

const FirstPage: React.FC<ContainerProps>  = ({setPageSwitcher}) => {
    return (
      <IonPage>
        <IonToolbar></IonToolbar>
        <IonImg src={hotocheerse} onClick={()=> {setPageSwitcher(true)}}/>
      </IonPage>
    );
  };
  
  export default FirstPage;
  