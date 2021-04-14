import App from 'next/app';
import firebase, { FirebaseContext } from '../firebase' //Aca estoy importando el index que esta en firebase

//Este es como si fuera el app.js de create-react-app

const MyApp = props => {

  const { Component, pageProps } = props;//Component seria el componente actual y props los props de la pagina

  return(
    <FirebaseContext.Provider
      value={{
        firebase
      }}
    >
        <Component {...pageProps} />
    </FirebaseContext.Provider>

  )
}

export default MyApp;



// const MyApp({ Component, pageProps }) {
//   return <Component {...pageProps} />
// }

// export default MyApp