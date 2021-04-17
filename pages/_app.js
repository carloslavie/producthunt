import App from 'next/app';
import firebase, { FirebaseContext } from '../firebase' //Aca estoy importando el index que esta en firebase
import useAutenticacion from '../hooks/useAutenticacion';
//Este es como si fuera el app.js de create-react-app

const MyApp = props => {

  const usuario = useAutenticacion();
 
  const { Component, pageProps } = props;//Component seria el componente actual y props los props de la pagina

  return(
    <FirebaseContext.Provider
      value={{
        firebase,
        usuario
      }}
    >
        <Component {...pageProps} />
    </FirebaseContext.Provider>

  )
}

export default MyApp;



