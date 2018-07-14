import { combineReducers } from 'redux'
import {
  SELECT_SUBREDDIT, INVALIDATE_SUBREDDIT,
  REQUEST_POSTS, RECEIVE_POSTS
} from '../actions'

const selectedSubreddit = (state = 'reactjs', action) => { //處理選擇動作
  switch (action.type) {
    case SELECT_SUBREDDIT:
      return action.subreddit //回傳一個state => action.subreddit
    default:
      return state
  }
}

const posts = (state = { //處理文章
  isFetching: false,
  didInvalidate: false,
  items: []
}, action) => {
  switch (action.type) {
    case INVALIDATE_SUBREDDIT:
      return {
        ...state,
        didInvalidate: true //終止動作設為true
      }
    case REQUEST_POSTS:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }
    case RECEIVE_POSTS: //當接收貼文時...
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        items: action.posts, //所有文章的陣列
        lastUpdated: action.receivedAt
      }
    default:
      return state
  }
}

const postsBySubreddit = (state = { }, action) => { //處理來自類群的文章
  switch (action.type) {
    case INVALIDATE_SUBREDDIT:
    case RECEIVE_POSTS:
    case REQUEST_POSTS: //當要求貼文時...
      return {
        ...state,
        [action.subreddit]: posts(state[action.subreddit], action) //回傳一個有action.subreddit屬性的物件裡面放posts的資訊
      }
      /* 上面return等同於下面
      let nextState = {}
      nextState[action.subreddit] = posts(state[action.subreddit], action)
      return Object.assign({}, state, nextState)
      */
    default:
      return state
  }
}

const rootReducer = combineReducers({
  postsBySubreddit,
  selectedSubreddit
})

export default rootReducer
