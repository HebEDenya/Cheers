import { IonIcon, IonContent, IonHeader, IonPage, useIonAlert, IonTitle, IonToolbar, IonInput, IonItem, IonLabel, IonList, IonItemDivider, IonButton, IonFooter, IonTextarea, IonButtons, } from '@ionic/react';
import axios from 'axios';
import { lockClosed, person, mailOpen, text, send, settingsOutline } from 'ionicons/icons';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import {Link, RouteComponentProps, useLocation} from "react-router-dom";


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
    const [messages, setMessages] = useState<[string]>();
    const [user_id, setUser_id] = useState<number>();
    const [title, setTitle] = useState<string>("Current Event");
    const [present] = useIonAlert();
   
    const formSubmit = async () => {
        console.log('clicked')
        console.log('connected user',Cookies.get('user_id'))
        console.log( 'event owner user',Object.values(location.state)[0])
        console.log( 'event id',Object.values(location.state)[1])
       
        let data = {
            firstName,
            lastName,
            email,
            text
        }
        await axios.get('/api/user/' + Cookies.get('user_id')).then((response) => {
            console.log(response.data)
        })
        await axios.get('/api/user/' + Object.values(location.state)[0]).then((response) => {
            console.log(response.data)
        })
        await axios.post('/api/user/message' ,{
            senderid : Cookies.get('user_id') ,
            receiverid:Object.values(location.state)[0],
            eventid  :Object.values(location.state)[1],
            text     :text
         }).then((response) => {
            console.log(response)
            setText("")
        })
        
    }

   
        

       


   const location = useLocation()
//    const  fetchMessages = async()=>{
//     await axios.get('/api/user/messages/'+Object.values(location.state)[1])
//     .then((response) => {
//         console.log(response.data)
//         setMessages(response.data)
//     })
//    }

    useEffect(() => {
        console.log(location.state)
        console.log(Object.values(location.state))
        
       setTitle(Object.values(location.state)[2])
       //fetchMessages()
      }, [])

   
    return (

        <IonPage>
            <IonHeader className="ion-no-border">

            </IonHeader>
            <IonContent >
                <IonToolbar>
                    <IonTitle className="ion-text-center custom-font "> Chat room - {title}  </IonTitle>
                </IonToolbar>
            
                <IonList>
                         {/* { messages.map((item, i) => {
                             return <div key={i}>
                                 <div>{item}</div>
                                 </div>
                         })
                           } */}
                   
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
                    <IonInput type="text" placeholder="Please Enter Here Your Message ...">
                   </IonInput>
                   <IonButtons>
                    <IonButton slot="end"  onClick={formSubmit} type='submit' size="small" fill="solid">
                        <IonIcon onClick={formSubmit} icon={send} />
                   </IonButton>
                   </IonButtons>
                </IonItem>
                    </IonFooter>
        </IonPage>
    );
};
export default Chat;
