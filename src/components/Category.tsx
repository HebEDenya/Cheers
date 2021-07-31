import React, { useState, useEffect } from "react";
import {
  IonHeader,
  IonList,
  IonItem,
  IonInput,
  IonLabel,
  IonPage,
  IonButton,
  useIonAlert,
  IonTitle,
  IonToolbar,
  IonListHeader,
  IonContent,
  IonLoading,
} from "@ionic/react";
import "./Category.scss";
import axios from "axios";

interface props {
  user_id: number;
}

const Category: React.FC<props> = ({ user_id }) => {
  const [present] = useIonAlert();
  const [category_name, setCategory_name] = useState<string>("");
  const [spiner, setSpiner] = useState<boolean>(false);
  const [deleteCat, setDelete] = useState<string>("");

  var verif = () => {
    let inputVerif = true;
    if (!(category_name.length > 0)) {
      inputVerif = false;
    }
    return inputVerif;
  };

  const postCategory = () => {
    const body = { category_name: category_name };
    axios
      .post("/api/admin/postCategory", body)
      .then((result) => {
        if (result.data === "added") {
          setSpiner(false);
          present("Category added 👏", [{ text: "Ok" }]);
        }
      })
      .catch((err) => {
        setSpiner(false);
        present("An error has occured 🤦‍♀️", [{ text: "Ok" }]);
      });
  };

  //to delete a category
  const handleDeletCategory = () => {
    if (deleteCat) {
      axios
        .delete(`/api/deleteCategory/${deleteCat}`)
        .then((result) => {
          console.log(result);
          if (result.data === "deleted") {
            setSpiner(false);
            present("Category deleted 🎈", [{ text: "Ok" }]);
          } else {
            setSpiner(false);
            present("Category not found 👀", [{ text: "Ok" }]);
          }
        })
        .catch((err) => {
          setSpiner(false);
          present("An error has occured 🤦‍♀️", [{ text: "Ok" }]);
        });
    }
  };
  return (
    <IonPage>
      <IonHeader>
        <IonListHeader>
          <IonLabel color="warning">Create Categories &nbsp;</IonLabel>
          &nbsp;
        </IonListHeader>
        &nbsp;
      </IonHeader>
      <IonContent>
        &nbsp;
        <IonList>
          &nbsp;
          <IonLabel className="category_admin_description_text_style">
            {" "}
            To add a category
          </IonLabel>
          <IonItem className="input_create_categories">
            <IonLabel position="floating" className="color_subtitle_categories">
              Category Name{" "}
            </IonLabel>
            <IonInput
              type="text"
              name="title"
              value={category_name}
              onIonChange={(e) => {
                setCategory_name(e.detail.value!);
              }}
              clearInput
              required
              spellcheck
              maxlength={50}
            ></IonInput>
          </IonItem>
        </IonList>
        &nbsp;
        &nbsp;
        <IonButton
          size="default"
          type="submit"
          color="warning"
          className="category_admin_btn"
          expand="full"
          onClick={() => {
            if (verif()) {
              postCategory();
              setSpiner(true);
            } else if (!verif()) {
              present("All mandatory * fields must be filled", [
                { text: "Ok" },
              ]);
            }
          }}
        >
          Confirm
        </IonButton>
        <IonLoading
          isOpen={spiner}
          message="Loading ... 🕓"
          onDidDismiss={() => {
            setSpiner(false);
          }}
        ></IonLoading>
        &nbsp;
        <IonLabel className="category_admin_delete_text_style">
          {" "}
          To delete a category
        </IonLabel>
        <IonItem className="admin_category">
          <IonLabel position="floating" className="color_subtitle_categories">
            Category Name
          </IonLabel>
          <IonInput
            type="text"
            name="title"
            value={deleteCat}
            onIonChange={(e) => {
              setDelete(e.detail.value!);
            }}
            clearInput
            required
            spellcheck
            maxlength={50}
          ></IonInput>
        </IonItem>
        <IonButton
          size="default"
          type="submit"
          color="danger"
          className="delete_category_admin_btn"
          expand="full"
          onClick={() => {
            if (deleteCat) {
              handleDeletCategory();
              setSpiner(true);
            } else {
              present("You have to add an input 🤷‍♂️", [{ text: "Ok" }]);
            }
          }}
        >
          Delete
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Category;
