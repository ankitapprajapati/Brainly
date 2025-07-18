import { atom } from "recoil";
import { statusProps } from "../../components/types/status";

export const statusAtom = atom<statusProps|null>({
    key : "statusAtom",
    default : null
})