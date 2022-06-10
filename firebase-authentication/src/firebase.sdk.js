import {initializeApp} from 'firebase/app';
import firebaseConfig from './firebase.config';

const intialize =()=>{
 initializeApp(firebaseConfig);
}
export default intialize;