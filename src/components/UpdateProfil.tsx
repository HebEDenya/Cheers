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
} from "@ionic/react";
import "./UpdateProfil.scss";
import ImageContainer from "./CreateEventImage";
import axios from "axios";

const UpdateProfil: React.FC = () => {
  const [present] = useIonAlert();
  const [image, setImage] = useState<string>(
    "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/55a27373859093.5ea2b801a2781.png"
  );
  const [img, setImg] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  // Get the image of the user
  const getUserData = () => {
    axios
      .get("http://localhost:3001/api/user/5")
      .then((res) => {
        setImg(res.data[0].image);
        setDescription(res.data[0].description);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Confirm updated request
  const confirmUpdate = () => {
    axios
      .put("http://localhost:3001/api/user/5/updateprofil", { description })
      .then((result) => {
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getUserData();
  }, []);

  // Function combine confirm and update.
  const onClickBtn = () => {
    present("Your description have been Updated", [{ text: "Done" }]);
    confirmUpdate();
  };

  return (
    <>
      <IonPage>
        <IonContent>
          <IonListHeader>
            <IonLabel className="color_update_profil">Profil Photo</IonLabel>
          </IonListHeader>
          &nbsp;
          <IonAvatar className="profil_photo">
            <img
              src={
                img !== null
                  ? img
                  : "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/55a27373859093.5ea2b801a2781.png"
              }
              alt="profil-face"
            />
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
              onClickBtn();
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
