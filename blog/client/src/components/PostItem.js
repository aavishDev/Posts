import { useMutation } from "@apollo/client";
import { Button, Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DELETE_POST } from "../queries";
import { READ_POST } from "../reducers/postsSlice";
import moment from "moment";
import AutorenewIcon from "@mui/icons-material/Autorenew";

const selectPost = (state, postId) => state.posts.byId[postId];
const selectUser = (state, userId) => state.users.byId[userId];

const usePostItemStyles = makeStyles({
  placeRetryIcon: {
    position: "relative",
    top: 7.4,
  },
  errorText: {
    color: "red",
  },
});

export default function PostItem({ postId }) {
  const [markRead, { loading }] = useMutation(DELETE_POST);
  const [retryMarkAsRead, setRetryMarkAsRead] = useState(false);
  const dispatch = useDispatch();
  const classes = usePostItemStyles();

  const post = useSelector((state) => selectPost(state, postId));
  const postAuthor = useSelector((state) => selectUser(state, post.userId));

  const timeToRead = moment.duration(post.body.length, "seconds").humanize();
  const isPostMarkedAsRead = post.read;

  const handleMarkReadClick = () => {
    if (retryMarkAsRead) {
      setRetryMarkAsRead(false);
    }
    markRead({
      variables: {
        postId: post.id,
      },
      update(cache, result) {
        if (result && result.data && result.data.deletePost) {
          dispatch({ type: READ_POST, payload: postId });
        } else if (result && result.data && !result.data.deletePost) {
          setRetryMarkAsRead(true);
        }
      },
    });
  };

  return (
    <Grid
      container
      spacing={2}
      style={{ color: isPostMarkedAsRead ? "grey" : "black" }}
    >
      <Grid item xs={12}>
        <Typography variant="h5">{post.title}</Typography>
        <em>Time to read: {timeToRead}</em>
      </Grid>
      <Grid item xs={12}>
        <Typography>{post.body}</Typography>
      </Grid>
      <Grid item xs={6}>
        <b>
          Author:
          {postAuthor
            ? ` ${postAuthor.name} (${postAuthor.company.name})`
            : "-"}
        </b>
        <div>Created at: {post.createdAt}</div>
      </Grid>
      {!isPostMarkedAsRead ? (
        <Grid item xs={6}>
          <Button
            variant="text"
            disabled={loading}
            onClick={handleMarkReadClick}
          >
            Mark as read
          </Button>
          {retryMarkAsRead ? (
            <span className={classes.errorText}>
              Retry Again <AutorenewIcon className={classes.placeRetryIcon} />
            </span>
          ) : null}
        </Grid>
      ) : null}
    </Grid>
  );
}
