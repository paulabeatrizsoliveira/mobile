import AuthProvider from './src/context/AuthContext';
import Routes from './src/routes';


export default function App({ children }) {
  return (
<<<<<<< HEAD

    <NavigationContainer>
      <StatusBar backgroundColor="#38A69D" barStyle="light-content" />
      <Routes/>
    </NavigationContainer>
  );
=======
    <AuthProvider>
      <Routes />   
    </AuthProvider>    
  )
>>>>>>> main
}

  /* tag 7.2.1 */

