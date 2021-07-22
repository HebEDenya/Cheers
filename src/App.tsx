import {useState} from 'react';
import { Redirect, Route } from 'react-router-dom';
import {IonApp,IonIcon,IonLabel,IonRouterOutlet,IonTabBar,IonTabButton,IonTabs,} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import CreateEventComponenetPart1 from './components/CreateEvent.Part1';
import CoinsPurchaser from './components/Coins';
import './App.css';
import { heart, person, home, chatboxEllipses, search } from 'ionicons/icons';
import Tab1 from './pages/Tab1';
import Tab2 from './pages/Tab2';
import Tab3 from './pages/Tab3';
import UpdateProfil from './components/UpdateProfil'

import FirstPage from './pages/FirstPage';
import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import './theme/variables.css';


const App: React.FC = () => {
  const [pageswitcher, setPageSwitcher] = useState<boolean>(false)
  
  
  return (
  <IonApp>
    {!pageswitcher? <FirstPage setPageSwitcher={setPageSwitcher}/> : 
    <IonReactRouter>
    <IonRouterOutlet>          
    </IonRouterOutlet>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/tab1">
            <Tab1 />
          </Route>
          <Route exact path="/tab2">
            <Tab2 />
          </Route>
          <Route path="/tab3">
            <Tab3 />
          </Route>
          <Route exact path="/">
            <Redirect to="/tab1" />
          </Route>
          <Route path="/Update" component={UpdateProfil}>
          </Route>
          <Route path="/CreateEvent" component={CreateEventComponenetPart1}>
          </Route>
          <Route path="/CoinsPurchase" component={CoinsPurchaser}>
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="tab1" href="/tab1">
            <IonIcon icon={home} />
          </IonTabButton>
          <IonTabButton tab="tab2" href="/tab2">
            <IonIcon icon={person} />
          </IonTabButton>
          <IonTabButton tab="tab3" href="/tab3">
            <IonIcon icon={heart} />
          </IonTabButton>
          <IonTabButton tab="tab4" href="#">
            <IonIcon icon={chatboxEllipses} />
          </IonTabButton>
          <IonTabButton tab="tab5" href="#">
            <IonIcon icon={search} />
          </IonTabButton>
        </IonTabBar>
  </IonTabs>
</IonReactRouter>
    
    }
    
  </IonApp>
);
}
export default App;
