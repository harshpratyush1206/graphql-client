import * as React from 'react';
import { toast } from 'react-toastify';
import * as Icon from 'react-bootstrap-icons';

export function success(message: string) {
    toast.success(<Toast.ShowToast type='success' msg={message}/>);
}
export function error(message: string) {
    toast.error(<Toast.ShowToast type='error' msg={message}/>);
}

export function warn(message: string) {
    toast.warn(<Toast.ShowToast type='warn' msg={message}/>);
}


const Toast = {
   ShowToast : function DatePicker(props:any) {
        switch (props.type){
            case 'error':
                return <div className='toaster'><Icon.ExclamationTriangleFill size='25px'/>{props.msg}</div>;

            case 'success':
                return <div className='toaster'><Icon.CheckAll size='25px'/>{props.msg}</div>;
                    
            case 'warn':
                    return <div className='toaster'><Icon.Exclamation size='25px'/>{props.msg}</div>; 
            default:
                return <div>{props.msg}</div>; 
        }
    }
  }


export default { success, error, warn };