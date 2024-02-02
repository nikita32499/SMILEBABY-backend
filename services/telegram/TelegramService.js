import axios from "axios"



class _TelegramService_{
    constructor(){

    }



    SendMessage=async({message})=>{
        let response
        try {
            response = await axios.post(`http://${global.config.servers.telegram}/api/telegram/sendMessage`,{
                message
            })
        } catch (error) {
            console.error(error)
        }
    }
}




const TelegramService = new _TelegramService_()

export default TelegramService


