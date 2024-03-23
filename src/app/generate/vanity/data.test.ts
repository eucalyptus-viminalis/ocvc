import { getData } from "./data";

const data = await getData(13642)
console.log(JSON.stringify(data,null,2))