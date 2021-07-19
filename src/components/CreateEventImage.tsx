import {IonContent,IonList,IonItem, IonThumbnail,IonImg , IonLabel, IonButton, IonIcon,IonPopover} from '@ionic/react';
import { Camera, CameraResultType } from '@capacitor/camera';
import { camera, caretDownOutline } from 'ionicons/icons';
import './CreateEvent.scss'
import React, { useState } from 'react';


interface ContainerProps {
  image: string;
  setImage: any;
}

const ImageContainer: React.FC<ContainerProps> = ({ image, setImage}) => {
    const [popoverState, setShowPopover] = useState({ showPopover: false, event: undefined });

    async function takeProfilePicture() {
        const image = await Camera.getPhoto({
            quality: 90,
            allowEditing: true,
            resultType: CameraResultType.Uri
        });
        setImage(image.webPath) 
      }
  return (
    <>
     <IonLabel className="color_subtitle_create" onClick={()=>{takeProfilePicture()}}>Place you image<span className="obligatoire">*</span> </IonLabel>
     <IonIcon icon={camera} onClick={()=>{takeProfilePicture()}}/>
     <IonPopover
        cssClass='my-custom-class'
        event={popoverState.event}
        isOpen={popoverState.showPopover}
        onDidDismiss={() => setShowPopover({ showPopover: false, event: undefined })}>  
        <img src={image} />
      </IonPopover>
      <IonIcon icon={caretDownOutline} onClick={
        (e: any) => {
          e.persist();
          setShowPopover({ showPopover: true, event: e })
        }}/>



    </>
  );
};

export default ImageContainer;