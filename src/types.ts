export interface ISlotApi {
    Start: string,
    End: string,
    Taken?: boolean
}

export interface ISlot {
    start: string,
    end: string,
    taken: boolean
}

export interface SlotPostApi {
    start: string,
    end: string,
}