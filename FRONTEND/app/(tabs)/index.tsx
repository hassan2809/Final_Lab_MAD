

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../../src/screens/HomeScreen';
import ProductScreen from '../../src/screens/ProductScreen';
import CartScreen from '../../src/screens/CartScreen';
import Profile from '../../src/screens/Profile';
import Login from '../../src/screens/Login';
import Signup from '../../src/screens/Signup';
import { CartProvider } from '../../context/CartContext';
import Icon from 'react-native-vector-icons/MaterialIcons';
import RoomListing from '@/src/screens/RoomListing';

const HomeStack = createStackNavigator();
const CartStack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Stack Navigator for Home and Product screens
function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="Product" component={ProductScreen} />

      <HomeStack.Screen name="Login" component={Login} />
      <HomeStack.Screen name="Signup" component={Signup} />
      <HomeStack.Screen name="RoomListing" component={RoomListing} />
    </HomeStack.Navigator>
  );
}

// Stack Navigator for Cart
function CartStackScreen() {
  return (
    <CartStack.Navigator>
      <CartStack.Screen name="Cart" component={CartScreen} />
    </CartStack.Navigator>
  );
}

// Tab Navigator
export default function App() {
  return (
    <CartProvider>
      {/* <NavigationContainer> */}
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'HomeStack') {
              iconName = focused ? 'home' : 'home';
            } else if (route.name === 'CartStack') {
              iconName = focused ? 'shopping-cart' : 'shopping-cart';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'person' : 'person';
            }

            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#6200EE',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: { height: 60, paddingBottom: 5 },
          headerShown: false, // Hides the header
        })}
      >
        <Tab.Screen
          name="HomeStack"
          component={HomeStackScreen}
          options={{ tabBarLabel: 'Home' }}
        />
        <Tab.Screen
          name="CartStack"
          component={CartStackScreen}
          options={{ tabBarLabel: 'Cart' }}
        />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
      {/* </NavigationContainer> */}
    </CartProvider>
  );
}



//                                 Subabase authentication code


// import { useState, useEffect } from 'react'
// import { supabase } from '../../lib/supabase'
// import Auth from '../../components/Auth'
// import Account from '../../components/Account'
// import { View } from 'react-native'
// import { Session } from '@supabase/supabase-js'

// export default function App() {
//   const [session, setSession] = useState<Session | null>(null)

//   useEffect(() => {
//     supabase.auth.getSession().then(({ data: { session } }) => {
//       setSession(session)
//     })

//     supabase.auth.onAuthStateChange((_event, session) => {
//       setSession(session)
//     })
//   }, [])

//   return (
//     <View>
//       {session && session.user ? <Account key={session.user.id} session={session} /> : <Auth />}
//     </View>
//   )
// }

