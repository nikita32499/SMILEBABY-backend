
import pkg from 'pg';
const { Pool } = pkg;


class _Database_{
    constructor(){
        this.init()
        this.set_query_storage=[]
    }
    SetQuery=(self)=>{
        this.set_query_storage.push(self)
    }

    init=async()=>{
        this.pool=new Pool(global.config.databases.smilebaby)
        await this.pool.connect()
        console.log("Connect To Database")
        // console.log((await this.pool.query("SELECT * FROM accounts")).rows)
        this.set_query_storage.forEach((self)=>{
            self.pool=this.pool
        })
    }
}



const Database= new _Database_()

export default Database
