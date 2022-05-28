import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from "../pages/home"
import User from "../pages/user"
import Login from "../pages/login"
import CreateUSer from "../pages/createUser"
import ResetPassword from "../pages/resetPassword"
import Splash from "../pages/splash"
import { createStackNavigator } from "@react-navigation/stack";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useEffect } from 'react';

import { AuthContext } from "./context"

const AuthStack = createStackNavigator();
const AuthStackScreen = () => (
  <AuthStack.Navigator>
    <AuthStack.Screen
      name="Login"
      component={Login}
      options={{ headerShown: false }}
    />
    <AuthStack.Screen
      name="resetPassword"
      component={ResetPassword}
      options={{ headerShown: false }}
    />
    <AuthStack.Screen
      name="createUser"
      component={CreateUSer}
      options={{ headerShown: false }}
    />
  </AuthStack.Navigator>
);

const Tabs = createBottomTabNavigator();
const TabsScreen = () => (
  <Tabs.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color }) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = focused
            ? 'home'
            : 'home';
        }
        // You can return any component that you like here!
        return <FontAwesome5 name={iconName} size={32} color={color} />;
      },
    })}
    tabBarOptions={{}}
  >
    <Tabs.Screen name="Home" component={Home} />
  </Tabs.Navigator>
);

const RootStack = createStackNavigator();
const RootStackScreen = ({ userToken }) => (
  <RootStack.Navigator headerMode="none">
    {userToken ? (   
      <RootStack.Screen
        name="App"
        component={TabsScreen}
        options={{
          animationEnabled: false
        }}
      />
    ) : (
      <RootStack.Screen
        name="Auth"
        component={AuthStackScreen}
        options={{
          animationEnabled: false
        }}
      />
    )}
  </RootStack.Navigator>
);


export default function App() {
  const [isLoading, setisLoading] = React.useState(true)
  const [userToken, setUserToken] = React.useState(null)

  function listenloginUserInNodeApi() {
    var myHeaders = new Headers()
    myHeaders.append("Content-type", "application/json")

    var raw = JSON.stringify({
      "email": "a@b.com",
      "password": "123456"
    })

    var requesteOption = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
      mode: 'cors'
    }

    fetch("http://localhost:8080/loginUser", requesteOption)
      .then((response) => { return response.json() })
      .then((response) => { console.log(response.token); })
      .catch((error) => { console.log(error); })

  }

  const authContext = React.useMemo(() => {
    return {
      signIn: () => {
        setisLoading(false)
        setUserToken("123456agdgaydsga")
        return "123456agdgaydsga"
      },
      signOut: () => {
        setisLoading(false)
        setUserToken(null)
      },
    }
  }, [])

  React.useEffect(() => {
    console.log("Foi usado");
    listenloginUserInNodeApi()
    setTimeout(() => {
      setisLoading(false)
    }, 2000);
  }, [])

  if (isLoading) {
    return <Splash />
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <RootStackScreen userToken={userToken} />
      </NavigationContainer>
    </AuthContext.Provider>
  );
}