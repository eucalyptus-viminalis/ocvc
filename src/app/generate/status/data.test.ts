import { getStatusData, getFCEngagementScoreByFID, getFCEngagementScoreByFname, getFCFollowingScoreByFID, getFCFollowingScoreByFname, getFirstTokenTransferFrom } from "./data";

// const data = await getFirstTokenTransferFrom("0xea990ae72939B8751cB680919C6B64A05B8e1451", "base")
// console.log(data)

// const data = await getStatusData(13642)
// console.log(data)

const score = await getFCEngagementScoreByFID(13642)
// const score2 = await getFCFollowingScoreByFID(13642)
console.log(score)
// console.log(score2)