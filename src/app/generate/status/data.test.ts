import { getData, getFirstTokenTransferFrom } from "./data";

// const data = await getFirstTokenTransferFrom("0xea990ae72939B8751cB680919C6B64A05B8e1451", "base")
const data = await getData(13642)
console.log(data)