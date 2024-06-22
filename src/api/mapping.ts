import type { ISlot, ISlotApi } from "@/types";


function transformSlots(data: Array<ISlotApi>): Array<ISlot> {
    const dataMapped = data.map(slot => ({
        start: slot.Start,
        end: slot.End,
        taken: slot.Taken ?? false
    }));
    return dataMapped;
}

export {
    transformSlots
}