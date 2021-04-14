import app from 'firebase/app';
import 'firebase/auth'

import firebaseConfig from './config';

//Crear una clase que va a inicializar la app

class Firebase {
    constructor() {
        if(!app.apps.length){
            app.initializeApp(firebaseConfig)
        }
        this.auth = app.auth();//para tener metodo de autenticacion en cualquier instancia que se necesite
    }
    
    //Registra un usuario
    async registrar(nombre, email, password) {
        const nuevoUsuario = await this.auth.createUserWithEmailAndPassword(email, password);

        return await nuevoUsuario.user.updateProfile({ //user(metodo para acceder a la info del usuario) updateProfile(del perfil del usuario actualiza displayName)
            displayName: nombre
        })
    }
}

const firebase = new Firebase();
export default firebase;
