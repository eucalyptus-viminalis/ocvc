import { getVanityData } from "./data";

const data = await getVanityData(13642)
console.log(JSON.stringify(data,null,2))