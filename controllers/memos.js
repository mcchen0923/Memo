const Memo = require('../models/Memo')
const asyncWrapper = require("../middleware/async")
const { createCustomError } = require('../errors/custom-error')


const getAllMemos = asyncWrapper(async (req, res) => {

    const memos = await Memo.find({})
    res.status(200).json({ memos })
})

const createMemo = async (req, res) => {
    const memo = await Memo.create(req.body)
    res.status(201).json({ memo })
}
const getMemo = asyncWrapper(async (req, res, next) => {

    const { id: memoid } = req.params
    const memo = await Memo.findOne({ _id: memoid })
    if (!memo) {
        return next(createCustomError(`No memo with id : ${memoid}` , 404))
        return res.status(404).json({ msg: `No memo with id : ${memoid}` })
    }
    res.status(200).json({ memo })
})

const deleteMemo = asyncWrapper(async (req, res) => {

    const { id: memoid } = req.params
    const memo = await Memo.findByIdAndDelete({ _id: memoid })
    if (!memo) {
        return next(createCustomError(`No memo with id : ${memoid}` , 404))
        return res.status(404).json({ msg: `No memo with id : ${memoid}` })
    }
    res.status(200).json({ memo })

})

const updateMemo = asyncWrapper(async (req, res) => {
    
        const { id: memoid } = req.params
        const memo = await Memo.findByIdAndUpdate({ _id: memoid }, req.body, { new: true, runValidators: true })
        if (!memo) {
            return next(createCustomError(`No memo with id : ${memoid}` , 404))
            return res.status(404).json({ msg: `No memo with id : ${memoid}` })
        }
        res.status(200).json({ memo })
    
})


module.exports = {
    getAllMemos,
    createMemo,
    getMemo,
    updateMemo,
    deleteMemo,
}

