const numbers = document.querySelectorAll('.number');
const operator = document.querySelectorAll('.operator');
const clear = document.querySelector('.clear');
const deleteBut = document.querySelector('.delete');
const effect = document.querySelector('.effect');
const currentAction = document.querySelector('.currentAction');
const previousAction = document.querySelector('.previousAction');

let activeAction = '';
let lastAction = '';
let operation = undefined;

const calculate= ()=> {
    let action
    if(!lastAction ||!activeAction){
        return
    }
    const previous = parseFloat(lastAction);
    const current = parseFloat((activeAction));
    if(isNaN(previous) || isNaN(current)){
        return
    }

    switch (operation) {
        case '+':
            action = previous + current;
            break;
        case '-':
            action = previous - current;
            break;
        case '×':
            action = previous * current;
            break;
        case '/':
            if(current===0){
                clearEffect();
                return;
            }
            action = previous / current;
            break;
        case '^':
            action = Math.pow(previous, current)
            break
        case '%':
            action = previous / 100 * current;
            break
        case '√':
            action = Math.pow(previous, 1 / current);
            break
        case 'log':
            action = Math.log(previous) / Math.log(current);
            break
        default:
            return;
    }
activeAction = action;
    operation = undefined;
    lastAction = '';
}
const selectOperation = (operator)=>{
    if(activeAction===''){
        return
    }
    if(lastAction!==''){
        const previous = previousAction.textContent;
        if(activeAction.toString()==='0' && previous[previous.length-1]==='/'){
            clearEffect();
            return;
        }
        calculate()
    }
    operation = operator;
    lastAction = activeAction;
    activeAction = '';
}
const updateEffect = ()=>{
    currentAction.textContent = activeAction;
    if(operation!= null){
        previousAction.textContent = lastAction + operation
    } else {
        previousAction.textContent = "";
    }
}
const addNumber = (number)=>{
    if(number ==="•"){
        if(activeAction.includes('.')){
            return
        }
        number = "."
    }

activeAction = activeAction.toString() + number.toString()
}

const clearEffect =()=>{
    activeAction = '';
    lastAction = '';
    operation = undefined;
}

numbers.forEach((number)=>{
    number.addEventListener('click', ()=>{
        addNumber(number.textContent)
        updateEffect()
    })
})

const deleteNumber =() =>{
    activeAction = activeAction.toString().slice(0,-1)
}

deleteBut.addEventListener('click', ()=> {
    deleteNumber();
    updateEffect();
    }
)

operator.forEach((operator)=>{
    operator.addEventListener('click', ()=>{
selectOperation(operator.textContent);
        updateEffect();
    })
})

effect.addEventListener('click', ()=>{
    calculate();
    updateEffect();
})
clear.addEventListener('click', ()=>{
    clearEffect();
    updateEffect();
})