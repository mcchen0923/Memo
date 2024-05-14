const memosDOM = document.querySelector('.memos')
const loadingDOM = document.querySelector('.loading-text')
const formDOM = document.querySelector('.memo-form')
const memoInputDOM = document.querySelector('.memo-input')
const formAlertDOM = document.querySelector('.form-alert')
// Load memos from /api/memos
const showMemos = async () => {
  loadingDOM.style.visibility = 'visible'
  try {
    const {
      data: { memos },
    } = await axios.get('/api/v1/memos')
    if (memos.length < 1) {
      memosDOM.innerHTML = '<h5 class="empty-list">No memos in your list</h5>'
      loadingDOM.style.visibility = 'hidden'
      return
    }
    const allMemos = memos
      .map((memo) => {
        const { completed, _id: memoID, name } = memo
        return `<div class="single-memo ${completed && 'memo-completed'}">
<h5><span><i class="far fa-check-circle"></i></span>${name}</h5>
<div class="memo-links">



<!-- edit link -->
<a href="memo.html?id=${memoID}"  class="edit-link">
<i class="fas fa-edit"></i>
</a>
<!-- delete btn -->
<button type="button" class="delete-btn" data-id="${memoID}">
<i class="fas fa-trash"></i>
</button>
</div>
</div>`
      })
      .join('')
    memosDOM.innerHTML = allMemos
  } catch (error) {
    memosDOM.innerHTML =
      '<h5 class="empty-list">There was an error, please try later....</h5>'
  }
  loadingDOM.style.visibility = 'hidden'
}

showMemos()

// delete memo /api/memos/:id

memosDOM.addEventListener('click', async (e) => {
  const el = e.target
  if (el.parentElement.classList.contains('delete-btn')) {
    loadingDOM.style.visibility = 'visible'
    const id = el.parentElement.dataset.id
    try {
      await axios.delete(`/api/v1/memos/${id}`)
      showMemos()
    } catch (error) {
      console.log(error)
    }
  }
  loadingDOM.style.visibility = 'hidden'
})

// form

formDOM.addEventListener('submit', async (e) => {
  e.preventDefault()
  const name = memoInputDOM.value

  try {
    await axios.post('/api/v1/memos', { name })
    showMemos()
    memoInputDOM.value = ''
    formAlertDOM.style.display = 'block'
    formAlertDOM.textContent = `success, memo added`
    formAlertDOM.classList.add('text-success')
  } catch (error) {
    formAlertDOM.style.display = 'block'
    formAlertDOM.innerHTML = `error, please try again`
  }
  setTimeout(() => {
    formAlertDOM.style.display = 'none'
    formAlertDOM.classList.remove('text-success')
  }, 3000)
})
