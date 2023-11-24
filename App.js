import AuthProvider from './src/context/AuthContext';
import Routes from './src/routes';


export default function App({ children }) {
  return (
    <AuthProvider>
      <Routes />
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Carousel />
      </View>
    </AuthProvider>    
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 40
  }
})

{
  /* tag 6.0.0 */
}
