

// activity suggestion api
// const tip = document.querySelector('.heads-up')
// function appFunc(){
//     const quoteApi = 'https://www.boredapi.com/api/activity';
//     fetch(quoteApi)
//     .then(function(response) {
//     return response.json()
// })
// .then(function(data) {
//     tip.innerHTML = data.activity
// })
// }
// appFunc()
// const fencing = document.querySelector('.fence')
// const opt = function() {
//     const showOpt = `
//     <div class="options">
//         <p>5 minutes left</p>
//         <ul class="listing">
//             <li>All</li>
//             <li>Active</li>
//             <li>Completed</li>
//         </ul>
//         <p>clear completed</p>
//     </div>
//     `
//     fencing.insertAdjacentHTML('beforeend', showOpt)
// }

const todoWrap = document.querySelector('.todo-box')
const todoDrop = function(text, att) {
    const elemetHtml = `
    <div class="todo-check">
        <div class="check-contain">
            <div class="check-con">
                <input type="checkbox" id="${att}" class="todo-checkbox">
                <label for="${att}" class="todo-label"></label>
            </div>
            <p class="contain-para">${text}</p>
        </div>
        <img src="/images/icon-cross.svg" class="cancel-todo">
    </div>
    `
    todoWrap.insertAdjacentHTML("afterbegin", elemetHtml)
}



const addTodoBtn = document.querySelector('.add-btn')
const emoji = document.querySelector('.emo')
const popBg = document.querySelector('.popBg')
const visitorName = document.querySelector('.visitor-name')
const options = document.querySelector('.options')
// let executed = false;
function addTodo() {
    const result = Math.random().toString(36).substring(2, 7);
    let todoInsert = document.querySelector('.todo-search').value

    if (todoInsert == '') {
        emoji.innerHTML = '👀'
        options.style.opacity = '0'
    } else {
        emoji.innerHTML = '😎'

        const mainText = todoInsert.charAt(0).toUpperCase() + todoInsert.slice(1)

        todoDrop(mainText, result)

        document.querySelector('.todo-search').value = '';

        storedTdfunc(todoInsert);

        options.style.opacity = '1'

        const checkboxes = document.querySelectorAll('.todo-checkbox');
        const savedCheckboxState = JSON.parse(localStorage.getItem('checkboxState')) || {};
        console.log(savedCheckboxState);

        checkboxes.forEach((checkbox, index) => {
            checkbox.addEventListener('change', () => {
                savedCheckboxState[index] = checkbox.checked; 
            });  
            localStorage.setItem('checkboxState', JSON.stringify(savedCheckboxState))
        });

        

        const todoDiv = document.querySelector('.todo-check')
        const cancelIcon = document.querySelector('.cancel-todo')

        cancelIcon.addEventListener('click', function() {
            todoDiv.remove()
            const xx = this.closest('.todo-check')
            const xxx  = xx.querySelector('.contain-para').textContent;
            const nearestText = xxx.charAt(0).toLowerCase() + xxx.slice(1)
            console.log(nearestText);
            updateData(nearestText)
            

            const remainingTodos = document.querySelectorAll('.todo-check');
            if (remainingTodos.length === 0) {
                options.style.opacity = '0';
            }
        })
    }
}
addTodoBtn.addEventListener('click', addTodo)

function storedTdfunc(todoInsert) {
    const insertedData = JSON.parse(localStorage.getItem('key')) || []
    insertedData.push(todoInsert)
    console.log(insertedData);
    localStorage.setItem('key', JSON.stringify(insertedData));
}

const updateData = function(x) {
    const upToDate = JSON.parse(localStorage.getItem('key')) || []
    const a = upToDate.find(z => z === x);
    const b = upToDate.indexOf(a)
    console.log(b);
    const shallow = upToDate.slice()
    shallow.splice(b, 1)
    console.log(shallow);
    localStorage.setItem('key', JSON.stringify(shallow))
}
// ------------------------

function updDateClock() {
    const now = new Date()
    const hours = now.getHours().toString().padStart(2, '0')
    const minutes = now.getMinutes().toString().padStart(2, '0')
    const seconds = now.getSeconds().toString().padStart(2, '0')

    document.querySelector('.seconds').innerHTML = seconds
    document.querySelector('.minutes').innerHTML = minutes
    document.querySelector('.hours').innerHTML = hours
}
setInterval(updDateClock, 1000)

const moon = document.querySelector('.moon');
const header = document.querySelector('.head');
const bottom = document.querySelector('.bottom')

moon.addEventListener('click', () => {
    moon.classList.toggle('switch')
    if (moon.classList.contains('switch')) {
        enableLight()
        localStorage.setItem('switchMode', 'enable')
    } else {
        enableDark()
        localStorage.setItem('switchMode', 'disable')
    }
})

function enableDark() {
    moon.src = "images/icon-sun.svg"
    header.style.backgroundImage = 'url(images/bg-desktop-dark.jpg)'
    bottom.style.backgroundColor = 'hsl(235, 21%, 11%)'
}

function enableLight() {
    moon.src = "images/icon-moon.svg"
    header.style.backgroundImage = 'url(images/bg-desktop-light.jpg)'
    bottom.style.backgroundColor = 'hsl(236, 33%, 92%)'
}

const checkMode = localStorage.getItem('switchMode')
if (checkMode === 'enable') {
    document.body.style.backgroundColor = 'hsl(236, 33%, 92%)';
} else {
    document.body.style.backgroundColor = 'hsl(235, 21%, 11%)';
}
// -------------------------

// localStorage.clear()

window.onload = () => {
    const savedTodos = JSON.parse(localStorage.getItem('key')) || [];
    savedTodos.forEach((todoTx, index) => {
        const onloadTxt = todoTx.charAt(0).toUpperCase() + todoTx.slice(1)
        todoDrop(onloadTxt, index)
        

        const cancelIcon = document.querySelector('.cancel-todo')
        cancelIcon.addEventListener('click', () => {
            const todoDivs = document.querySelector('.todo-check')
            todoDivs.remove()
            savedTodos.splice(index, 1);
            localStorage.setItem('key', JSON.stringify(savedTodos));
            if (savedTodos.length === 0) {
                options.style.opacity = '0';
            } else {
                options.style.opacity = '1';
            }
        });
        

        const retrieveBoxItem = localStorage.getItem('checkboxState')
        for (const key in retrieveBoxItem) {
            if (retrieveBoxItem.hasOwnProperty(key)) {
                const value = retrieveBoxItem[key];
                const checkboxes = document.querySelectorAll('.todo-checkbox'); // Get the checkbox element by ID
                checkboxes.forEach((checkbox, ind) => {
                    if (checkbox) {
                        checkbox.checked = value;
                    } 
                })
            }
        }
    })

    console.log(savedTodos.length, savedTodos);
    if (savedTodos.length === 0) {
        options.style.opacity = '0';
    } else {
        options.style.opacity = '1';
    }
    
    // ----------------------------------------
    function enableDark() {
        moon.src = "images/icon-sun.svg"
        header.style.backgroundImage = 'url(images/bg-desktop-dark.jpg)'
        bottom.style.backgroundColor = 'hsl(235, 21%, 11%)'
    }
    
    function enableLight() {
        moon.src = "images/icon-moon.svg"
        header.style.backgroundImage = 'url(images/bg-desktop-light.jpg)'
        bottom.style.backgroundColor = 'hsl(236, 33%, 92%)'
    }

    const checkMode = localStorage.getItem('switchMode')
    if (checkMode == 'enable') {
        enableLight()
    } else {
        enableDark()
    }
}