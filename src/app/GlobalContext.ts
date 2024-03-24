import { Dispatch, RefObject, SetStateAction, createContext } from "react"
import { IdentityData } from "./generate/identity/data"
import { StatusData } from "./generate/status/data"
import { VanityData } from "./generate/vanity/data"
import { TasteData } from "./generate/taste/data"

export type ENS = `${string}.eth` | string

type GlobalContextType = {
    identity: IdentityData
    setIdentity: Dispatch<SetStateAction<IdentityData>>
    status: StatusData
    setStatus: Dispatch<SetStateAction<StatusData>>
    vanity: VanityData
    setVanity: Dispatch<SetStateAction<VanityData>>
    taste: TasteData
    setTaste: Dispatch<SetStateAction<TasteData>>
}

export const GlobalContext = createContext<GlobalContextType>({} as GlobalContextType)
