import Toast from 'react-native-toast-message';


export class ToastMessage{

    private message: string
    private time: number
    
    constructor(message: string, time: number = 3000){
        this.message = message;
        this.time = time
    }

    public successToast() {
        Toast.show({
            type: 'success',
            text1: 'Féliciton !',
            text2: this.message,
            visibilityTime: this.time,
            position: 'top',
        });
    } 
    
    public errorToast (){
        Toast.show({
            type: 'error',
            text1: 'Oops !',
            text2: this.message,
            visibilityTime: this.time,
            position: 'top',
        });
    }
}
