import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
<<<<<<< HEAD
import { GestureHandlerRootView } from 'react-native-gesture-handler';
=======
<<<<<<< HEAD
import { GestureHandlerRootView } from 'react-native-gesture-handler';
=======
>>>>>>> 15ffe86c1701d38e84a3734d0559786b811e275e
>>>>>>> 14ca8de3f4e884cc599f92a2d2c347e54ba3e633
import HomeScreen from './hometest';
import DangKy from './screens/dangky';
import Lienhe from './screens/lienhe';
import Series3 from './screens/Series3';
import Series4GC from './screens/Series4C';
<<<<<<< HEAD
import Series4C from './screens/Series4';
=======
<<<<<<< HEAD
import Series4C from './screens/Series4';
=======
import Series4C from './screens/Series4C';
>>>>>>> 15ffe86c1701d38e84a3734d0559786b811e275e
>>>>>>> 14ca8de3f4e884cc599f92a2d2c347e54ba3e633
import Series5 from './screens/Series5';
import Series7 from './screens/Series7';
import Series8GC from './screens/Series8GC';
import SeriesX3 from './screens/SeriesX3';
import SeriesX4 from './screens/SeriesX4';
import SeriesX5 from './screens/SeriesX5';
import SeriesX6 from './screens/SeriesX6';
import SeriesX7 from './screens/SeriesX7';
import SeriesZ4 from './screens/SeriesZ4';
import SeriesXM from './screens/SeriesXM';
import SeriesiX3 from './screens/SeriesiX3';
import Seriesi4 from './screens/Seriesi4';
import Seriesi7 from './screens/Seriesi7';
import Digital from './screens/digi';
<<<<<<< HEAD
import fv from './screens/fv';
=======
<<<<<<< HEAD
>>>>>>> 14ca8de3f4e884cc599f92a2d2c347e54ba3e633





<<<<<<< HEAD
=======
=======
import SeeAllCars from './screens/SeeAllCars';
>>>>>>> 15ffe86c1701d38e84a3734d0559786b811e275e
>>>>>>> 14ca8de3f4e884cc599f92a2d2c347e54ba3e633

const Tab = createBottomTabNavigator();
import Chatbot from './chatbot';

<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 14ca8de3f4e884cc599f92a2d2c347e54ba3e633

export default function AppNavigator() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>

<<<<<<< HEAD
=======
=======
export default function AppNavigator() {
  return (
>>>>>>> 15ffe86c1701d38e84a3734d0559786b811e275e
>>>>>>> 14ca8de3f4e884cc599f92a2d2c347e54ba3e633
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ tabBarStyle: { display: 'none' } }}>
        <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Tab.Screen name="DangKy" component={DangKy} options={{ headerShown: false }} />
        <Tab.Screen name="Lienhe" component={Lienhe} options={{ headerShown: false }} />
        <Tab.Screen name="Series3" component={Series3} options={{ headerShown: false }} />
        <Tab.Screen name="Series4GC" component={Series4GC} options={{ headerShown: false }} />
        <Tab.Screen name="Series4C" component={Series4C} options={{ headerShown: false }} />
        <Tab.Screen name="Series5" component={Series5} options={{ headerShown: false }} />
        <Tab.Screen name="Series7" component={Series7} options={{ headerShown: false }} />
        <Tab.Screen name="Series8GC" component={Series8GC} options={{ headerShown: false }} />
        <Tab.Screen name="SeriesX3" component={SeriesX3} options={{ headerShown: false }} />
        <Tab.Screen name="SeriesX4" component={SeriesX4} options={{ headerShown: false }} />
        <Tab.Screen name="SeriesX5" component={SeriesX5} options={{ headerShown: false }} />
        <Tab.Screen name="SeriesX6" component={SeriesX6} options={{ headerShown: false }} />
        <Tab.Screen name="SeriesX7" component={SeriesX7} options={{ headerShown: false }} />
        <Tab.Screen name="SeriesZ4" component={SeriesZ4} options={{ headerShown: false }} />
        <Tab.Screen name="SeriesXM" component={SeriesXM} options={{ headerShown: false }} />
        <Tab.Screen name="SeriesiX3" component={SeriesiX3} options={{ headerShown: false }} />
        <Tab.Screen name="Seriesi4" component={Seriesi4} options={{ headerShown: false }} />
        <Tab.Screen name="Seriesi7" component={Seriesi7} options={{ headerShown: false }} />
        <Tab.Screen name="Digital" component={Digital} options={{ headerShown: false }} />
<<<<<<< HEAD
        <Tab.Screen name="Chatbot" component={Chatbot} options={{ headerShown: false }} />
        <Tab.Screen name="fv" component={fv} options={{ headerShown: false }} />
=======
<<<<<<< HEAD
        <Tab.Screen name="Chatbot" component={Chatbot} options={{ headerShown: false }} />
>>>>>>> 14ca8de3f4e884cc599f92a2d2c347e54ba3e633

      </Tab.Navigator>
    </NavigationContainer>
    </GestureHandlerRootView>
<<<<<<< HEAD
=======
=======
        <Tab.Screen name="SeeAllCars" component={SeeAllCars} options={{ headerShown: false }} />
        <Tab.Screen name="Chatbot" component={Chatbot} options={{ headerShown: false }} />
      </Tab.Navigator>
    </NavigationContainer>
>>>>>>> 15ffe86c1701d38e84a3734d0559786b811e275e
>>>>>>> 14ca8de3f4e884cc599f92a2d2c347e54ba3e633
  );
}
