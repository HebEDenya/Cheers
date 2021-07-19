import React from "react";
import {
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonAvatar,
  IonItem,
  IonInput,
  IonLabel,
  IonText,
  IonListHeader,
  IonContent,
} from "@ionic/react";
import './UpdateProfil.scss';

const UpdateProfil: React.FC = () => {

  
  return (
    <>
    <IonPage>
    <IonContent>
      <IonListHeader>
        <IonLabel className="color_update_profil">
          Profil Photo
        </IonLabel>
      </IonListHeader>
      </IonContent>
    </IonPage>
    </>
  );
};

export default UpdateProfil;
