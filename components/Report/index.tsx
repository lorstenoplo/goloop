import React, { useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import { TransitionProps } from "@material-ui/core/transitions";
import {
  ListItemIcon,
  Tooltip,
  Zoom,
  DialogContent,
  TextField,
} from "@material-ui/core";
import ReportIcon from "@material-ui/icons/Report";
import SendRoundedIcon from "@material-ui/icons/SendRounded";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      position: "relative",
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
            <Tooltip title="Send your report" TransitionComponent={Zoom}>
              <Button autoFocus color="inherit" onClick={handleClose}>
                <SendRoundedIcon />
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
        <Typography style={{ padding: "10px" }} variant="body2">
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
