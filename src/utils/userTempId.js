import { setItem, getItem } from "@/utils/LocalStorage";
import { nanoid } from "nanoid";
const UserTempType = "UserTempType";

function userTempId() {
    // 判断本地存储中是否存有userTempId
    if (getItem(UserTempType)) {
        console.log(111);
        return getItem(UserTempType);
        // 如果不存在本地id，那么需要创建一个id，存入本地存储中，然后再返回
    } else {
        const userTempId = nanoid();
        // console.log(222);
        setItem("UserTempType", userTempId);
        return userTempId;
    }
}

export default userTempId;