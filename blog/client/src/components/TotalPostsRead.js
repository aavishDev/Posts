import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  placement: {
    position: "fixed",
    bottom: 0,
    right: 0,
    marginRight: 30,
    marginBottom: 30,
  },
});

export default function TotalPostsRead({ total = 0, read = 0}) {
  const classes = useStyles();
  return (
    <div className={classes.placement}>
      <b>Total: {read} of {total}</b>
    </div>
  );
}
