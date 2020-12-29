import { Container, AppBar, Typography, Grow, Grid } from "@material-ui/core";
import Form from "./components/forms/Form";
import Posts from "./components/posts/Posts";
import memories from "./images/memories.png";
import useStyles from "./styles";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getPosts } from "./actions/posts";

function App() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [currentId, setCurrentId] = useState(null);

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);
  return (
    <div className="app">
      <Container maxwidth="lg">
        <AppBar className={classes.appBar} postiton="static" color="inherit">
          <Typography className={classes.heading} variant="h2" align="center">
            Blog
          </Typography>
          <img
            className={classes.image}
            src={memories}
            alt="blog"
            height="60"
          />
        </AppBar>
        <Grow in>
          <Container>
            <Grid
              container
              justify="space-between"
              align-items="stretch"
              spacing={3}
              className={classes.mainContainer}
            >
              <Grid item xs={12} sm={7}>
                <Posts setCurrentId={setCurrentId} />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Form currentId={currentId} setCurrentId={setCurrentId} />
              </Grid>
            </Grid>
          </Container>
        </Grow>
      </Container>
    </div>
  );
}

export default App;
