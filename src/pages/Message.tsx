import { IonIcon, IonContent, IonHeader, IonPage, useIonAlert, IonTitle, IonToolbar, IonInput, IonItem, IonLabel, IonList, IonItemDivider, IonButton, IonFooter, IonTextarea, IonButtons, IonAvatar, IonChip, } from '@ionic/react';
import axios from 'axios';
import { lockClosed, person, mailOpen, text, send, settingsOutline } from 'ionicons/icons';
import Cookies from 'js-cookie';
import moment from 'moment';
//import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Link, RouteComponentProps, useLocation } from "react-router-dom";


interface messageProps {
    item: {
        message_id: number;
        text: string;
        time: Date;
        sender_id: number;
        receiver_id: number
    };
}

const Message: React.FC<messageProps> = ({ item }) => {
    const [email, setEmail] = useState<string>();
    const [userNameSender, setuserNameSender] = useState<string>();
    const [userNameReciever, setuserNameReciever] = useState<string>();
    const [userPhotoSender, setuserPhotSender] = useState<string>();




    const getSenderInfo = async (varIdUser) => {

        await axios.get('/api/user/' + varIdUser).then((response) => {
            setuserNameSender(response.data[0].username)
            setuserPhotSender(response.data[0].user_image)

        })
    }

    const getRecieverInfo = async (varIdUser) => {

        await axios.get('/api/user/' + varIdUser).then((response) => {
            setuserNameReciever(response.data[0].username)

        })
    }






    useEffect(() => {

        getSenderInfo(item.sender_id)
        getRecieverInfo(item.receiver_id)
    }, [])


    return (
        <div>


            <p className={parseInt(Cookies.get('user_id')) === item.sender_id ? "from-me ion-float-right" : "from-them"} key={item.message_id}>


                <IonAvatar>
                    <img src={userPhotoSender} />
                </IonAvatar>
                <div style={{ fontSize: '0.5rem' }}>{userNameSender}</div>

                <div>{item.text}</div>
                <div style={{ fontSize: '0.5rem' }} className='ion-float-right'>{moment(item.time).format('h:mm a')}</div>
                <br></br>
                {/* <div>{moment(
                moment(
                    item.time
                )
            ).fromNow()}</div> */}

            </p>
        </div>
    );
};
export default Message;
