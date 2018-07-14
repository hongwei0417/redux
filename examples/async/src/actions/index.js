export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const SELECT_SUBREDDIT = 'SELECT_SUBREDDIT'
export const INVALIDATE_SUBREDDIT = 'INVALIDATE_SUBREDDIT'

export const selectSubreddit = subreddit => ({ //選擇類群動作
  type: SELECT_SUBREDDIT,
  subreddit
})

export const invalidateSubreddit = subreddit => ({ //終止動作
  type: INVALIDATE_SUBREDDIT,
  subreddit
})

export const requestPosts = subreddit => ({ //要求貼文(文章)動作
  type: REQUEST_POSTS,
  subreddit
})

export const receivePosts = (subreddit, json) => ({ //接收貼文(文章)動作
  type: RECEIVE_POSTS,
  subreddit,
  posts: json.data.children.map(child => child.data), //所有文章放進陣列
  receivedAt: Date.now()
})

const fetchPosts = subreddit => dispatch => { //取得貼文
  dispatch(requestPosts(subreddit)) //執行要求動作
  return fetch(`https://www.reddit.com/r/${subreddit}.json`)
    .then(response => response.json())
    .then(json => dispatch(receivePosts(subreddit, json))) //執行接收動作
}

const shouldFetchPosts = (state, subreddit) => { //是否要取得貼文
  const posts = state.postsBySubreddit[subreddit]
  if (!posts) { //null => false 
    return true
  }
  if (posts.isFetching) {
    return false
  }
  return posts.didInvalidate 
}

export const fetchPostsIfNeeded = subreddit => (dispatch, getState) => { //查看是否要重新整理
  if (shouldFetchPosts(getState(), subreddit)) {
    return dispatch(fetchPosts(subreddit))
  }
}
