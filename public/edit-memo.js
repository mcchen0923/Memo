const memoIDDOM = document.querySelector('.memo-edit-id')
const memoNameDOM = document.querySelector('.memo-edit-name')
const memoCompletedDOM = document.querySelector('.memo-edit-completed')
const editFormDOM = document.querySelector('.single-memo-form')
const editBtnDOM = document.querySelector('.memo-edit-btn')
const formAlertDOM = document.querySelector('.form-alert')
const params = window.location.search
const id = new URLSearchParams(params).get('id')
let tempName

const showMemo = async () => {
  try {
    const {
      data: { memo },
    } = await axios.get(`/api/v1/memos/${id}`)
    const { _id: memoID, completed, name } = memo

    memoIDDOM.textContent = memoID
    memoNameDOM.value = name
    tempName = name
    if (completed) {
      memoCompletedDOM.checked = true
    }
  } catch (error) {
    console.log(error)
  }
}

showMemo()

editFormDOM.addEventListener('submit', async (e) => {
  editBtnDOM.textContent = 'Loading...'
  e.preventDefault()
  try {
    const memoName = memoNameDOM.value
    const memoCompleted = memoCompletedDOM.checked

    const {
      data: { memo },
    } = await axios.patch(`/api/v1/memos/${id}`, {
      name: memoName,
      completed: memoCompleted,
    })

    const { _id: memoID, completed, name } = memo

    memoIDDOM.textContent = memoID
    memoNameDOM.value = name
    tempName = name
    if (completed) {
      memoCompletedDOM.checked = true
    }
    formAlertDOM.style.display = 'block'
    formAlertDOM.textContent = `success, edited memo`
    formAlertDOM.classList.add('text-success')
  } catch (error) {
    console.error(error)
    memoNameDOM.value = tempName
    formAlertDOM.style.display = 'block'
    formAlertDOM.innerHTML = `error, please try again`
  }
  editBtnDOM.textContent = 'Edit'
  setTimeout(() => {
    formAlertDOM.style.display = 'none'
    formAlertDOM.classList.remove('text-success')
  }, 3000)
})
