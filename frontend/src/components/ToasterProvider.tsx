import { Toaster } from "react-hot-toast";

const ToasterProvider = () => {
    return(
        <Toaster 
            toastOptions={{
                duration : 5000,
            }}
        />
    )
}

export default ToasterProvider;