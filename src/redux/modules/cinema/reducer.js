
const initialState = {
    isFetching: false,
    list: [],
}

export default function GetData(state = initialState, action) {
    switch (action.type) {
        case 'setRequest':
            return Object.assign({}, state, {
                isFetching: action.payload.isFetching,
            });
        case 'setList':
            return Object.assign({}, state, {
                list: action.payload.list,
                isFetching: action.payload.isFetching,
            });
        default:
            return state
    }
}
