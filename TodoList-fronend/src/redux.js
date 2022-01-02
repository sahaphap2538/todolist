const redux = require('redux')

const initState = {
    count : 0
}

const reducer = (state = initState, action) => {
    if (action.type === 'ADD_COUNTER') {
        return {...state, count : state.count + action.value}
    }
    if (action.type === 'INCRESE_COUNTER') {
        return {...state, count : state.count + 1}
    }
    return state
}

const store = redux.createStore(reducer)

store.subscribe( () => {
    console.log("Subscribe",store.getState())
})

// Action
store.dispatch({
    type : "INCRESE_COUNTER",
})

store.dispatch({
    type : "ADD_COUNTER",
    value : 5
})

store.dispatch({
    type : "ADD_COUNTER",
    value : 10
})

// Subscription
