import { roleListModel } from "model/homeModel";
import { useRecoilState } from "recoil";
import { getRoleList } from "servers/api";




export async function UseinitRoleList() {
    const [userInfoStatus,] = useRecoilState(roleListModel);

    await getRoleList()

}