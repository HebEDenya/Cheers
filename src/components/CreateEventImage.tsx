import  { useState , useEffect, useMemo} from 'react';
import {IonContent,IonList,IonItem, IonThumbnail,IonImg , IonLabel, IonButton, IonIcon,IonPopover} from '@ionic/react';
import ImagePicker from 'image-picker-mobile';
import { camera, caretDownOutline } from 'ionicons/icons';

interface Files {
  url: string,
  preview?: string, 
  loading?: boolean, 
  errorTip?: string, 
  name?: string, 
  [index: string]: any,
}
interface props {
  setImage: any,
  image: string,
}

export default ({setImage, image})  => {
  const [filesList, setFilesList] = useState<Array<Files>>([]);
  const [popoverState, setShowPopover] = useState<{showPopover:boolean, event:any}>({ showPopover: false, event: undefined });
 
  useEffect(() => {
    if(filesList.length) {
    setImage(filesList[0].url)}
  },[filesList])
  
  const onChange = (arr: Array<Files>) => {
    setFilesList(arr);
  };
  const onUpload = (item: any): Promise<object | undefined> => {
    return new Promise((resolve, reject) => {
      const rate = Math.random();
      setTimeout(() => {
        if (rate > 0.3) {
          return resolve({ fssid: rate.toString().slice(-6) });
        }
        reject('error while loading');
      }, 5000);
    });
  };
 
 
  return (
    <>
<IonLabel className="color_subtitle_create" >Place you image<span className="obligatoire">*</span> </IonLabel>
<ImagePicker
      filesList={filesList}
      onChange={onChange}
      multiple
      max={1}
      mode="cover"
      onUpload={onUpload}
      size ={124290}
    />
      <IonPopover
        cssClass='my-custom-class'
        event={popoverState.event}
        isOpen={popoverState.showPopover}
        onDidDismiss={() => setShowPopover({ showPopover: false, event: undefined })}>  
        <img src={image} alt="" />
      </IonPopover>
      <IonIcon icon={caretDownOutline} onClick={
        (e: any) => {
          e.persist();
          setShowPopover({ showPopover: true, event: e })
        }}/>
    </>
  );
};
