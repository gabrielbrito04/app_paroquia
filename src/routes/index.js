import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Welcome from '/home/gabriel/Documentos/app_paroquia/src/pages/Welcome/index.js';
import Tabs from '/home/gabriel/Documentos/app_paroquia/src/routes/tabs.js';

const Stack = createNativeStackNavigator();

export default function Routes(){
    return(
        <Stack.Navigator>
            <Stack.Screen
                name='Welcome'
                component={Welcome}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name='Tabs'
                component={Tabs}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    )
}