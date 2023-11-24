import AuthProvider from './src/context/AuthContext';
import Routes from './src/routes';


export default function App({ children }) {
  return (
    <AuthProvider>
      <Routes />   
    </AuthProvider>    
  )
}

  /* tag 7.2.0 */

