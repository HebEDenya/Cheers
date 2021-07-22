import React, { useState } from "react";
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
  IonTextarea
  
} from "@ionic/react";
import './UpdateProfil.scss';
import ImageContainer from './CreateEventImage';




const UpdateProfil: React.FC = () => {
  const [image, setImage] = useState<string>('https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/55a27373859093.5ea2b801a2781.png');
  const [description, setDescription] = useState<string>();


  
  return (
    <>
    <IonPage>
    <IonContent>
      <IonListHeader>
        <IonLabel className="color_update_profil">
          Profil Photo
        </IonLabel>
      </IonListHeader>
      &nbsp;
      <IonAvatar className="profil_photo">
      <img src="https://www.pngkey.com/png/full/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png" alt="" />
    </IonAvatar>
    &nbsp;
      <IonItem className="input_create_Event">
         <ImageContainer  image ={image} setImage={setImage}/>
         </IonItem>
        &nbsp;
        <IonLabel className="description_title">
          Description
        </IonLabel>
        &nbsp;
        <IonItem className="input_description">
            <IonTextarea placeholder="Update your description..." clearOnEdit={true} value={description} onIonChange={e => setDescription(e.detail.value!)}></IonTextarea>
          </IonItem>

      </IonContent>
    </IonPage>
    </>
  );
};

export default UpdateProfil;
