import app from 'firebase/app';
import 'firebase/auth'//autenticacion
import 'firebase/firestore';//base de datos
import 'firebase/storage'; //para utilizar el storage de firebase

import firebaseConfig from './config';

//Crear una clase que va a inicializar la app

class Firebase {
    constructor() {
        if(!app.apps.length){
            app.initializeApp(firebaseConfig)
        }
        this.auth = app.auth();//para tener metodo de autenticacion en cualquier instancia que se necesite
        this.db = app.firestore();//Hacemos referencia a db para acceder a la base de datos
        this.storage = app.storage();
    }
    
    //Registra un usuario
    async registrar(nombre, email, password) {
        const nuevoUsuario = await this.auth.createUserWithEmailAndPassword(email, password);

        return await nuevoUsuario.user.updateProfile({ //user(metodo para acceder a la info del usuario) updateProfile(del perfil del usuario actualiza displayName)
            displayName: nombre
        })
    }
    
    //Inicia sesion del usuario
    async login(email, password) {
        return this.auth.signInWithEmailAndPassword(email, password);
    }

    //Cierra la sesion del usuario
    async cerrarSesion() {
        await this.auth.signOut()
    }



}


const firebase = new Firebase();
export default firebase;
