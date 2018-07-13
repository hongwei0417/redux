import { combineReducers } from 'redux'
import todos from './todos'
import visibilityFilter from './visibilityFilter'

export default combineReducers({ //把兩個reducers做合併
        todos,
        visibilityFilter
    })
    /*************等同於下面****************/
    /*
    export default combineReducers({ 
        todos: todos,
        visibilityFilter: visibilityFilter
    })
    */
    /*
    export default function todoApp(state = {}, action) {
      return {
        todos: todos(state.todos, action),
        visibilityFilter: visibilityFilter(state.visibilityFilter, action),
      }
    }
    */