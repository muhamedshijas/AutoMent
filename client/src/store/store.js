import {createStore} from 'redux';
const initialState={
    user:{login:null},
    admin:{login:null},
    serviceCenter:{login:null},
    worker:{login:null},
    refresh:true
    
}

function reducer(state=initialState, action){
    switch(action.type){
        case 'user': return {...state, user:action.payload};
        case 'admin': return {...state, admin:action.payload};
        case 'serviceCenter': return {...state, serviceCenter:action.payload};
        case 'worker': return {...state, worker:action.payload};
        case 'refresh': return {...state, refresh:!state.refresh};
        default: return state;
    }

}

export default createStore(reducer)