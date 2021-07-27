import React, { useState, useEffect } from "react";
import {
  IonHeader,
  IonIcon,
  IonTextarea,
  IonList,
  IonItem,
  IonInput,
  IonLabel,
  IonPage,
  IonButton,
  useIonAlert,
  IonTitle,
  IonToolbar,
   
} from "@ionic/react";
import ImageContainer from './CreateEventImage';
import axios from 'axios';

interface props {
    user_id:number
  }
  

const Category : React.FC<props>= ({user_id}) => {
  const [present] = useIonAlert();
  const [category_name, setCategory_name] = useState<string>('');
  const [description, setDescription] = useState('');
  const [buttonClick, setButtonClick] = useState<boolean | null>(false);
  // const [inputVerif, setInputVerif] = useState<boolean>(false)
  const [image, setImage] = useState<string>('');
   
  var verif = () => {
    let inputVerif = true;
    if(!(category_name.length > 0) && !(description.length > 0) && !(image.length > 0)){
      inputVerif = false
    }
    return inputVerif
  }

  const postCategory = () => {
    axios.post('/api/admin/postCategory').then((result) => {
     console.log('posted')
      })
    .catch((err) => console.log(err)
    )
  }
    return (
        <>
        <IonPage>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Create Category</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonList>
          <IonItem className="input_create_Event">
         <IonLabel position="floating" className="color_subtitle_create">Category Name</IonLabel>
         <IonInput type="text" name="title" value={category_name} onIonChange={e => {setCategory_name(e.detail.value!);}} 
         clearInput required spellcheck  maxlength= {50} > 
         </IonInput>
         </IonItem>
         <IonItem className="input_create_Event">
             <IonLabel position="floating" className="color_subtitle_create">Description <span className="obligatoire">*</span></IonLabel>
             <IonTextarea name="description" value={description} onIonChange={e => {setDescription(e.detail.value!); 
             }} clearOnEdit required spellcheck autoGrow maxlength= {2000}></IonTextarea>
           </IonItem>      
        </IonList>  
        &nbsp;
        <IonItem className="input_create_Event">
         <ImageContainer image={image} setImage={setImage}/>       
         </IonItem>
         &nbsp;
         {!buttonClick ? <><button onClick={()=> {setButtonClick(null)}} className="second_button_create_event" >Cancel</button>
         <IonButton  size="default"  type="submit" className="button_create_event" 
         onClick={()=> { if (verif()){postCategory()}
         else if (!verif()){ present('All mandatory * fields must be filled', [{ text: 'Ok' }]) }  }}>Confirm</IonButton>
        </>:''
       }
        </IonPage>
        </>
    )
}


export default Category;
