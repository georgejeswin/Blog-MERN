import React from "react";
import Post from "./post/Post";
import useStyles from "./styles";
import { useSelector } from "react-redux";
import { CircularProgress, Grid } from "@material-ui/core";

const Posts = ({ setCurrentId }) => {
  const classes = useStyles();
  const posts = useSelector((state) => state.posts);
  // console.log("posts>>>", posts);

  return (
    <div className={classes.postsContainer}>
      {!posts.length ? (
        <CircularProgress />
      ) : (
        <Grid
          className={classes.mainContainer}
          container
          alignItems="stretch"
          spacing={3}
        >
          {posts.map((post) => (
            <Grid item key={posts._id} item xs={12} sm={6}>
              <Post post={post} setCurrentId={setCurrentId} />
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default Posts;
