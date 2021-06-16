import React from "react";
import { Dialog, DialogTitle, DialogContent, withStyles, Typography, IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

const styles = theme => ({
    dialogWrapper: {
        padding: theme.spacing(1),
        position: 'absolute',
    },
    dialogTitle: {
        margin: 0,
        padding: theme.spacing(1),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
      },
})

const Popup = ({classes,...props }) => {
    const { title, children, openPopup, setOpenPopup } = props;    

    return (
        <Dialog open={openPopup} maxWidth="md" classes={{ paper: classes.dialogWrapper }}>
            <DialogTitle className={classes.dialogTitle}>
                <div style={{ display: 'flex' }}>
                    <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
                        {title}
                    </Typography>
                    <IconButton className={classes.closeButton}
                        onClick={() => { setOpenPopup(false) }}>
                        <CloseIcon />
                    </IconButton>
                </div>
            </DialogTitle>
            <DialogContent dividers>
                {children}
            </DialogContent>
        </Dialog>
    )
}

export default withStyles(styles)(Popup) 