/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/artists";
import { Grid, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, withStyles, ButtonGroup, Button, Avatar } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from '@material-ui/icons/Add';
import PlayIcon from '@material-ui/icons/PlayArrow';
import { useToasts } from "react-toast-notifications";
import dateFormat from "dateformat";
import MusicPlayer from "./MusicPlayer";
import Popup from "../controls/Popup";
import ArtistsForm from "./ArtistsForm";

const styles = theme => ({
    root: {
        "& .MuiTableCell-head": {
            fontSize: "1.25rem"
        }
    },
    paper: {
        margin: theme.spacing(2),
        padding: theme.spacing(2)
    },
    large: {
        width: theme.spacing(12),
        height: theme.spacing(12),
        float: "left",
        margin:  theme.spacing(0, 1, 0, 0)
    }
})

const artistsGrid = ({ classes, ...props }) => {
    const [currentId, setCurrentId] = useState(0)
    const [playerVisibility, setPlayerVisibility] = useState(false)
    const [editVisibility, setEditVisibility] = useState(false)  
    const [titleForm, setTitleForm] = useState("")  

    useEffect(() => {        
        onRefresh()
    }, [])//componentDidMount
    
    const onPlayMusic = id => {
        setCurrentId(id)
        setPlayerVisibility(true)
    }
    //toast msg.
    const { addToast } = useToasts()

    const onRefresh = () =>{
        props.fetchAllArtists()
    }

    const onEdit = id => {
        if(id > 0)
            setTitleForm("Edit Data")
        else
            setTitleForm("Add Data")
        
        setCurrentId(id)
        setEditVisibility(true)
    }
    
    const onDelete = id => {
        const onSuccess = () => {
            props.onRefresh()
            addToast("Deleted successfully", { appearance: 'info' })
        }
        if (window.confirm('Are you sure to delete this record?'))
            props.deleteArtists(id,onSuccess)
    }    

    return (
        <Paper className={classes.paper} elevation={3}>
            <Grid container>
                <Popup
                    title="Music Player"
                    openPopup={playerVisibility}
                    setOpenPopup={setPlayerVisibility}>
                    <MusicPlayer {...({ currentId, setCurrentId })}></MusicPlayer>
                </Popup>
                <Popup
                    title={titleForm}
                    openPopup={editVisibility}
                    setOpenPopup={setEditVisibility}>
                    <ArtistsForm onRefresh={onRefresh} {...({ currentId, setCurrentId, setEditVisibility })}></ArtistsForm>
                </Popup>               
                <ButtonGroup variant="text">
                    <Button variant="outlined" onClick={() => { onEdit(0) }} >
                        <AddIcon color="primary"/>
                    </Button>                                                   
                </ButtonGroup>               
                <Grid item xs={12}>
                    <TableContainer>
                        <Table>
                            <TableHead className={classes.root}>
                                <TableRow>
                                    <TableCell>Num</TableCell>
                                    <TableCell>Album Name</TableCell>
                                    <TableCell>Artist Name</TableCell>
                                    <TableCell>Date Release</TableCell>
                                    <TableCell>Sample Audio</TableCell>
                                    <TableCell>Price</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    props.artistsList.map((record, index) => {
                                        return (<TableRow key={index} hover>
                                            <TableCell>{index+1}</TableCell>
                                            <TableCell>
                                                <div>
                                                    <Avatar alt={record.artistName} src={record.imageURL} 
                                                            variant="square" className={classes.large} />
                                                    <p>{record.albumName}</p>
                                                </div>                                                
                                            </TableCell>
                                            <TableCell>{record.artistName}</TableCell>
                                            <TableCell>{dateFormat(record.releaseDate,"dd mmm yyyy")}</TableCell>
                                            <TableCell>
                                                <Button variant="outlined" onClick={() =>onPlayMusic(record.artistID)} >
                                                    <PlayIcon color="action"/>
                                                </Button>
                                            </TableCell>
                                            <TableCell>{record.price}</TableCell>
                                            <TableCell>
                                                <ButtonGroup variant="text">
                                                    <Button variant="outlined" onClick={() => { onEdit(record.artistID) }} >
                                                        <EditIcon color="primary"/>
                                                    </Button>
                                                    <Button variant="outlined" onClick={() => onDelete(record.artistID)} >
                                                        <DeleteIcon color="secondary" />
                                                    </Button>
                                                </ButtonGroup>
                                            </TableCell>
                                        </TableRow>)
                                    })
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>                
            </Grid>            
        </Paper>
    );
}

const mapStateToProps = state => ({
    artistsList: state.artists.list
})

const mapActionToProps = {
    fetchAllArtists: actions.fetchAll,
    deleteArtists: actions.Delete
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(artistsGrid));