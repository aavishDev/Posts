import { makeStyles } from "@mui/styles";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import PostItem from "./PostItem";
import TotalPostsRead from "./TotalPostsRead";

const postListStyles = makeStyles({
  p10: {
    padding: 10,
  },
  divider: { borderBottom: "1px solid", marginTop: 20 },
});

const selectReadPosts = createSelector(
  (state) => state.posts.byId,
  (postsById) => {
    let readCount = 0;
    Object.keys(postsById).forEach((postId) => {
      if (postsById[postId].read) {
        readCount += 1;
      }
    });
    return readCount;
  }
);

export default function PostsList() {
  const postIds = useSelector((state) => state.posts.allIds);
  const readPostsCount = useSelector(selectReadPosts);
  const classes = postListStyles();

  const renderPosts = postIds.map((postId, index) => {
    return (
      <div className={classes.p10} key={postId}>
        <PostItem postId={postId} />
        {index + 1 !== postIds.length ? (
          <div className={classes.divider}></div>
        ) : null}
      </div>
    );
  });
  return (
    <div>
      {renderPosts}
      <TotalPostsRead total={postIds.length} read={readPostsCount} />
    </div>
  );
}
