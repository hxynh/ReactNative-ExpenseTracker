import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'; 
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { GlobalStyles } from './constants/styles';
import { Ionicons } from '@expo/vector-icons';
import AllExpenses from './screens/AllExpenses';
import ManageExpense from './screens/ManageExpense';
import RecentExpenses from './screens/RecentExpenses';
import IconButton from './UI/IconButton';
import ExpensesContextProvider from './store/expenses-context';

const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();

function ExpensesOverview() {
  return (
    <BottomTab.Navigator 
      screenOptions={({navigation}) => ({
        headerStyle: { backgroundColor: GlobalStyles.colors.primary500, },
        headerTintColor: 'white',
        tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500},
        tabBarActiveTintColor: GlobalStyles.colors.accent500,
        headerRight: ({tintColor}) => 
            <IconButton 
              icon="add" 
              size={24} 
              color={tintColor} 
              onPress={() => {
                navigation.navigate('ManageExpense')
              }}
            />,
      })}
    >
      <BottomTab.Screen 
        name='RecentExpense' 
        component={RecentExpenses} 
        options={{
          title: 'Recent Expenses',
          tabBarLabel: 'Recent',
          tabBarIcon: ({color, size}) => <Ionicons name='hourglass' color={color} size={size} />        
      }}/>

      <BottomTab.Screen 
        name='AllExpenses'
        component={AllExpenses}
        options={{
          title: 'All Expenses',
          tabBarLabel: 'All Expenses',
          tabBarIcon: ({color, size}) => <Ionicons name='calendar' color={color} size={size} />
        }}  
      />
    </BottomTab.Navigator>  
  );
}

export default function App() {

  return (
    <>
      <StatusBar style='light' />
      <ExpensesContextProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: { backgroundColor: GlobalStyles.colors.primary500},
              headerTintColor: 'white'
            }}
          >
            <Stack.Screen name='ExpenseOverview' component={ExpensesOverview} options={{
              headerShown: false,
            }}/>
            <Stack.Screen name='ManageExpense' component={ManageExpense} options={{
              presentation: 'modal',
            }}/>
          </Stack.Navigator>
        </NavigationContainer>
      </ExpensesContextProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
