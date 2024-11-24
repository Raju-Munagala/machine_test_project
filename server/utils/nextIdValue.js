import { loginCounter } from "../models/CounterModal.js"


export const getNextId = async (sequenceName) => {
    const nextId = await loginCounter.findOneAndUpdate(
        {_id : sequenceName },
        {$inc : {sequence_value : 1}},
        {new : true, upsert : true}
    );
    return nextId.sequence_value;
}