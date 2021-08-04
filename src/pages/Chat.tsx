import { IonIcon, IonContent, IonHeader, IonPage, useIonAlert, IonTitle, IonToolbar, IonInput, IonItem, IonLabel, IonList, IonItemDivider, IonButton, IonFooter, IonTextarea, IonButtons, useIonViewWillEnter, useIonViewDidEnter, IonRefresher, IonRefresherContent, useIonViewDidLeave, } from '@ionic/react';
import axios from 'axios';
import { lockClosed, person, mailOpen, text, send, settingsOutline, chevronDownCircleOutline } from 'ionicons/icons';
import Cookies from 'js-cookie';
//import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Link, RouteComponentProps, useLocation } from "react-router-dom";
import Message from './Message';
import { useHistory } from 'react-router';
import {RefresherEventDetail} from '@ionic/core'


import './Chat.scss'
// interface resetProps extends RouteComponentProps<{
//     id: string;
// }> { }
// import './Register.scss';
//import { star } from 'ionicons/icons';
const Chat: React.FC = ({ }) => {

    const [text, setText] = useState<string>();
    const [messages, setMessages] = useState<any[]>([]);
    const [title, setTitle] = useState<string>("Current Event");
    const [present] = useIonAlert();
    const history = useHistory();

    const formSubmit = async () => {
        await axios.post('/api/user/message', {
            senderid: Cookies.get('user_id'),
            receiverid: Object.values(location.state)[0],
            eventid: Object.values(location.state)[1],
            text: text
        }).then((response) => {
            setText("")
            fetchMessages()
        })

    }

    const location = useLocation()

    const fetchMessages =  () => {
       
         axios.get('/api/users/messages/' + Object.values(location.state)[1])
            .then((response) => {
                setMessages(response.data)
            })
            .catch(error=>{})
    }

    useIonViewDidEnter(() => {
      
    })
    useIonViewDidLeave(() => {
       // fetchMessages()
        //setMessages([])
        //setTitle('no titlle')
    })

    //    useIonViewWillEnter(() => {
    //     fetchMessages()
    //    })
    useEffect(() => {
        try{fetchMessages()
            setTitle(Object.values(location.state)[2])}
            catch(error){}

    },[location])

    function doRefresh(event: CustomEvent<RefresherEventDetail>) {
        
         fetchMessages()
         setTitle(Object.values(location.state)[2])
        event.detail.complete();
      }
    
    return (

        <IonPage>
            <IonHeader className="ion-no-border">

            </IonHeader>
            <IonContent >
                <IonToolbar>
                    <IonTitle className="ion-text-center custom-font "> Chat room - {title}  </IonTitle>
                </IonToolbar>
                <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
                    <IonRefresherContent
                        pullingIcon={chevronDownCircleOutline}
                        pullingText="Pull to refresh"
                        refreshingSpinner="circles"
                        refreshingText="Refreshing..."
                    ></IonRefresherContent>
                </IonRefresher>


                <IonList>
                    <div className="ContainerMessge">
                        <div className="imessage">

                            {messages.length > 0 && messages.map((msg, i) => {
                                return (
                                    <div key={i}>
                                        <Message item={msg} />

                                    </div>

                                )
                            })
                            }
                        </div>
                    </div>
                    {/* <Message messge={item} */}
                </IonList>
                <br /><br /><br /><br /><br />
                <div className="ion-text-center custom-font">
                </div>

            </IonContent>
            <IonFooter>
                {/* <IonItem>
                        <IonLabel position="floating">Please Enter Here Your Message ...</IonLabel>
                        <IonTextarea value={text} onIonChange={e => setText(e.detail.value!)}>  <IonButtons>  
                        <IonButton onClick={formSubmit} type='submit' size="small" fill="solid">
                           </IonButton>
                     </IonButtons>
                    
                    </IonTextarea>
                  </IonItem> */}
                <IonItem>
                    <IonInput type="text" placeholder="Please Enter Here Your Message ..." value={text} onIonChange={e => setText(e.detail.value!)}>
                    </IonInput>
                    <IonButtons>
                        <IonButton slot="end" onClick={formSubmit} type='submit' size="small" fill="solid">
                            <IonIcon onClick={formSubmit} icon={send} />
                        </IonButton>
                    </IonButtons>
                </IonItem>
            </IonFooter>
        </IonPage>
    );
};
export default Chat;