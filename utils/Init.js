import fs from "fs"

global.config = JSON.parse(fs.readFileSync("./config.json"))




