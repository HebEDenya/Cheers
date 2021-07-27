import React, { useState, useEffect } from "react";
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
  IonTextarea,
  IonButton,
  useIonAlert,
  IonButtons,
  IonBackButton,
} from "@ionic/react";
import "./UpdateProfil.scss";
import ImageContainer from "./CreateEventImage";
import axios from "axios";

interface ContainerProps {
  user_id: number,
  setimageProfileUpdated:any
}

const UpdateProfil: React.FC<ContainerProps> = ({user_id, setimageProfileUpdated}) => {
  const [imageUpdated, setImageUpdated] = useState<boolean>(false);
  const [present] = useIonAlert();
  const [image, setImage] = useState<string>(
    "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/55a27373859093.5ea2b801a2781.png"
  );
  const [img, setImg] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  // Get the image of the user
  const getUserData = () => {
    if (user_id) {
    axios
      .get(`http://localhost:3001/api/user/${user_id}`)
      .then((res) => {
        setImg(res.data[0].user_image);
        setDescription(res.data[0].user_description);
      })
      .catch((err) => {
        console.log(err);
      });}
  };

  // Confirm updated request
  const confirmUpdate = () => {
    if (user_id) {
    axios
      .put(`http://localhost:3001/api/user/${user_id}/updateprofil`, { description, image })
      .then((result) => {
        if (result.statusText === "OK") {
          present("Your profil have been Updated 👌", [{ text: "Done" }]);
          setimageProfileUpdated(true)
          setImageUpdated(true)
        } 
      })
      .catch((err) => {
        console.log(err);
      });}
  };

  useEffect(() => {
    getUserData();
  }, []);

  // // Function combine confirm and update.
  const onClickBtn = () => {
    present("Loading ... 🕓", [{ text: "Ok" }]);
    confirmUpdate();
  };

  return (
    <>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Update Profil</IonTitle>
            <IonButtons slot="start">
              <IonBackButton text="Back" color="dark" />
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          &nbsp;
          <IonAvatar className="profil_photo">
            { !imageUpdated ? <img 
              src={
                img !== null
                  ? img
                  : "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/55a27373859093.5ea2b801a2781.png"
              }
              alt="profil-face"
            /> : <img 
            src={image}
            alt="profil-face"
          /> }
          </IonAvatar>
          &nbsp;
          <IonItem className="input_create_Event">
            <ImageContainer image={image} setImage={setImage} />
          </IonItem>
          &nbsp;
          <IonLabel className="description_title">Description</IonLabel>
          &nbsp;
          <IonItem className="input_description">
            <IonTextarea
              placeholder="Update your description..."
              clearOnEdit={true}
              value={description}
              onIonChange={(e) => setDescription(e.detail.value!)}
            ></IonTextarea>
          </IonItem>
          <IonButton
            size="default"
            type="submit"
            className="button_update_profil"
            onClick={() => {
              onClickBtn()
            }}
          >
            Confirm
          </IonButton>
        </IonContent>
      </IonPage>
    </>
  );
};

export default UpdateProfil;
