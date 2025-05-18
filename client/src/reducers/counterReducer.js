import ACTION_TYPES from '../actions/actionTypes'

const initialState = {
    counter: 0,
    step: 1
  }

const counterReduser = (state = initialState,action) =>{
    switch(action.type){
      case ACTION_TYPES.INCREMENT: {
        return {
          ...state,
          counter: state.counter + state.step
        }
      }
      case ACTION_TYPES.DECREMENT: {
        return {
          ...state,
          counter: state.counter - state.step
        }
      }
      case ACTION_TYPES.STEP: {
        return {
            ...state,
            step: action.payload.step
        }
      }
      default: return state
      
    }
}

export default counterReduser;