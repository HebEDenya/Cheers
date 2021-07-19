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
} from "@ionic/react";
import './UpdateProfil.scss';

const UpdateProfil: React.FC = () => {

  
  return (
    <>
    <IonPage>
      <IonListHeader>
        <IonLabel className="color_update_profil">
          Profil Photo
        </IonLabel>
      </IonListHeader>
    </IonPage>
    </>
  );
};

export default UpdateProfil;
