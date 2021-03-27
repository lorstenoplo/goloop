import {
  Box,
  CircularProgress,
  DialogContent,
  FormHelperText,
  ListItemIcon,
  TextField,
  Tooltip,
  Zoom,
} from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Slide from "@material-ui/core/Slide";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import { TransitionProps } from "@material-ui/core/transitions";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import ReportIcon from "@material-ui/icons/Report";
import SendRoundedIcon from "@material-ui/icons/SendRounded";
import React, { useState } from "react";
import { useReportMutation } from "../../src/generated/graphql";
import useGetUser from "../../utils/useGetUser";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      position: "relative",
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
    },
    additionalInfo: {
      padding: "10px",
      [theme.breakpoints.down("md")]: {
        display: "none",
      },
    },
  })
);

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Report: React.FC = () => {
  const classes = useStyles();
  const [open, setOpen] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");
  const [{ data, error, fetching }, report] = useReportMutation();
  const [user] = useGetUser();

  if (error) {
    return <p>{error.message}</p>;
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const sendReport = () => {
    if (input.trim()) {
      report({ username: user?.username || "", problem: input });
      data?.report && handleClose();
    }
  };

  return (
    <div>
      <ListItem button onClick={handleClickOpen}>
        <ListItemIcon>
          <ReportIcon />
        </ListItemIcon>
        <ListItemText primary="Report" />
      </ListItem>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        disableEnforceFocus
        scroll="paper"
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Report a Problem
            </Typography>
            <Tooltip
              title={fetching ? "Wait" : "Send your report"}
              TransitionComponent={Zoom}
            >
              <Button
                disabled={fetching}
                autoFocus
                color="inherit"
                onClick={sendReport}
              >
                {fetching ? (
                  <Box mt={1} color="#ffffff">
                    <CircularProgress size="25px" color="inherit" />
                  </Box>
                ) : (
                  <SendRoundedIcon />
                )}
              </Button>
            </Tooltip>
          </Toolbar>
        </AppBar>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="problem"
            label="Problem"
            placeholder="Have a problem, type it here and report it by by clicking on the send button"
            type="text"
            fullWidth
            value={input}
            onChange={(e) => setInput(e.target.value)}
            multiline
          />
          <FormHelperText id="component-error-text">
            {error && <p>{(error as any).message}</p>}
          </FormHelperText>
        </DialogContent>
        <List style={{ flex: 1 }}>
          <ListItem button>
            <ListItemText
              primary="Reach out to our help center if you think there is no problem with the site"
              secondary="Help"
            />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemText primary="Default Procedure" secondary="About" />
          </ListItem>
        </List>
        <Typography className={classes.additionalInfo} variant="body2">
          Go to the Legal Help page to request content changes for legal
          reasons. Some account and system information may be sent to GooLoop.
          We will use the information that you give us to help address technical
          issues and to improve our services, subject to our Privacy Policy and
          Terms of Service.
        </Typography>
      </Dialog>
    </div>
  );
};

export default Report;
