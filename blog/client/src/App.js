import { useLazyQuery } from "@apollo/client";
import { LoadingButton } from "@mui/lab";
import { Container } from "@mui/material";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import PostsList from "./components/PostsList";
import { GET_ALL_POSTS } from "./queries";
import { POSTS_LOADED, selectPostsIds } from "./reducers/postsSlice";
import { loadAllUsers } from "./reducers/usersSlice";

function App() {
  const [getPosts, { loading, data: postsData }] = useLazyQuery(GET_ALL_POSTS);
  const dispatch = useDispatch();
  const posts = useSelector(selectPostsIds, shallowEqual);

  const onLoadAllPostsClick = () => {
    getPosts();
    dispatch(loadAllUsers());
  };

  if (postsData) {
    dispatch({ type: POSTS_LOADED, payload: postsData.posts });
  }
  return (
    <Container style={{ padding: 20 }}>
      {!posts.length ? (
        <LoadingButton
          variant="outlined"
          loading={loading}
          loadingIndicator="Loading..."
          onClick={onLoadAllPostsClick}
        >
          Load All Posts
        </LoadingButton>
      ) : (
        <PostsList />
      )}
    </Container>
  );
}

export default App;
