import ACTION_TYPES from './actions/actionTypes'

const initialState = {
    user: null,
    tasks: [],
    isLoading: false,
    error: null,
    notification: null
  }

const reducer = (state = initialState,action) =>{
    switch(action.type){
      case ACTION_TYPES.LOGIN_USER_ERROR:
        case ACTION_TYPES.REGISTER_USER_ERROR:
          case ACTION_TYPES.GET_TASKS_ERROR:
            case ACTION_TYPES.CREATE_TASK_ERROR:
              case ACTION_TYPES.DELETE_TASK_ERROR:
                case ACTION_TYPES.AUTH_USER_ERROR:
                  case ACTION_TYPES.AUTH_QR_USER_ERROR: {
        const {payload: error} = action;

        return {
          ...state,
          error,
          isLoading: false
        }
      }
      case ACTION_TYPES.LOGIN_USER_SUCCESS:
        case ACTION_TYPES.REGISTER_USER_SUCCESS:
          case ACTION_TYPES.AUTH_USER_SUCCESS:
            case ACTION_TYPES.AUTH_QR_USER_SUCCESS: {
          const {payload: user} = action

          return {
            ...state,
            user,
            isLoading: false,
            error: null
          }
        }
        case ACTION_TYPES.GET_TASKS_SUCCESS: {
          const {payload: tasks} = action

          return {
            ...state,
            tasks,
            isLoading: false,
            error: null
          }
        }
        case ACTION_TYPES.CREATE_TASK_SUCCESS: {
          return {
            ...state,
            isLoading: false,
            error: null
          }
        }
        case ACTION_TYPES.DELETE_TASK_SUCCESS: {
          return {
            ...state,
            isLoading: false,
            error: null
          }
        }
        case ACTION_TYPES.LOGIN_USER_REQUEST:
          case ACTION_TYPES.REGISTER_USER_REQUEST: 
            case ACTION_TYPES.GET_TASKS_REQUEST:
              case ACTION_TYPES.CREATE_TASK_REQUEST:
                case ACTION_TYPES.DELETE_TASK_REQUEST:
                  case ACTION_TYPES.AUTH_USER_REQUEST:
                    case ACTION_TYPES.AUTH_QR_USER_REQUEST: {
                  const {payload} = action;

                  return {
                    ...state,
                    isLoading: true
                  }
                }
      case ACTION_TYPES.LOGIN_USER_REQUEST: {
        return {
          ...initialState
        }
      }
      case 'NOTIFICATION': {
        const {payload: {notification}} = action
        return {
          ...state,
          notification
        }
      }
      case ACTION_TYPES.EMPTY_USER_OBJECT_REQUEST: {
        return {
          ...state,
          user: {}
        }
      }
      
      default: return state
      
    }
}

export default reducer;