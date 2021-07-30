import { IonIcon, IonContent, IonHeader, IonPage, useIonAlert, IonTitle, IonToolbar, IonInput, IonItem, IonLabel, IonList, IonItemDivider, IonButton, IonFooter, IonTextarea, } from '@ionic/react';
//import ExploreContainer from '../components/ExploreContainer';
import axios from 'axios';
import { lockClosed, person, mailOpen, text } from 'ionicons/icons';
import React, { useState } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import Cookies from "js-cookie";

// interface resetProps extends RouteComponentProps<{
//     id: string;
// }> { }
// import './Register.scss';
//import { star } from 'ionicons/icons';
const Chat: React.FC = ({ }) => {
    const [email, setEmail] = useState<string>();
    const [lastName, setLastName] = useState<string>();
    const [firstName, setFirstName] = useState<string>();
    const [text, setText] = useState<string>();
    const [sent, setSend] = useState<boolean>(false)
    const [present] = useIonAlert();

    const formSubmit = () => {
        console.log('clicked')
        let data = {
            firstName,
            lastName,
            email,
            text
        }
        axios.post('/api/user/form', data).then((Response) => {
            setSend(true)
        })
    }

    const resetForm = () => {
        setFirstName('')
        setLastName('')
        setEmail('')
        setText('')
        

        setTimeout(() => {
            setSend(false)
        },3000)

    }





    return (
        <IonPage>
            <IonHeader className="ion-no-border">

            </IonHeader>
            <IonContent onSubmit={formSubmit}>
                <br /><br /><br /><br /><br />

                <IonToolbar>
                    <IonTitle className="ion-text-center custom-font "> Contact </IonTitle>
                </IonToolbar>
                <br /><br /><br /><br /><br />
                <IonItem>
                    <IonLabel position="floating">First Name</IonLabel>
                    <IonInput clear-input type="text" value={firstName} placeholder="Enter First Name..." onIonChange={e => setFirstName(e.detail.value!)}>
                        <IonIcon size="small" slot="start" icon={person} />
                    </IonInput>
                </IonItem>


                <IonItem>
                    <IonLabel position="floating">Last Name</IonLabel>
                    <IonInput clear-input type="text" value={lastName} placeholder="Enter Last Name..." onIonChange={e => setLastName(e.detail.value!)}>
                        <IonIcon size="small" slot="start" icon={person} />
                    </IonInput>
                </IonItem>

                <IonItem>
                    <IonLabel position="floating">E-mail</IonLabel>
                    <IonInput clear-input type="email" value={email} placeholder="Enter E-mail..." onIonChange={e => setEmail(e.detail.value!)}>
                        <IonIcon size="small" slot="start" icon={mailOpen} />
                    </IonInput>
                </IonItem>
                <br /><br /><br />
                <IonList>

                    <IonItemDivider>Message</IonItemDivider>
                    <IonItem>
                        <IonLabel position="floating">Please Enter Here Your Message ...</IonLabel>
                        <IonTextarea value={text} onIonChange={e => setText(e.detail.value!)}></IonTextarea>
                    </IonItem>


                </IonList>
                <br /><br /><br /><br /><br />
                <div className="ion-text-center custom-font">

                    <IonButton type='submit' size="small" fill="solid">Submit</IonButton>
                </div>




            </IonContent>
        </IonPage>
    );
};
export default Chat;
