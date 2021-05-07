import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Home from './components/Home';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack'
import SubCategory from './components/SubCategory';
import subPage from './components/subPage';
import Options from './components/Options';


const Stack = createStackNavigator()

export default function App() {

  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName= "home"
          screenOptions={{headerShown:false}}
          
          >
          <Stack.Screen name="home" component={Home}/>
          <Stack.Screen name="Subcategory" component={SubCategory}/>
          <Stack.Screen name="SubPage" component={subPage}/>
          <Stack.Screen name="Options" component={Options}/>
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    flex:1
  },
});
