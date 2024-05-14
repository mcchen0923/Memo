const express = require('express')
const router = express.Router()

const {
    getAllMemos,
    createMemo,
    getMemo,
    updateMemo,
    deleteMemo} = require('../controllers/memos')

router.route('/').get(getAllMemos).post(createMemo)
router.route('/:id').get(getMemo).patch(updateMemo).delete(deleteMemo)
module.exports = router