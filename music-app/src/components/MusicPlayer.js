/* eslint-disable eqeqeq */
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { withStyles, Avatar} from "@material-ui/core";
import useForm from "./useForm";

const styles = theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            minWidth: 230,
        }
    },
    large: {
        width: theme.spacing(40),
        height: theme.spacing(40),        
    },
    imgAlbum:{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginBottom: theme.spacing(2),
    }
})

const initialFieldValues = {
    artistName: '',
    imageURL: '',
    albumName: '',
    sampleURL: '',    
}

const MusicPlayer = ({classes,...props }) => {

    const {
        values,
        setValues,
    } = useForm(initialFieldValues, null, props.setCurrentId)

    useEffect(() => {
        if (props.currentId != 0) {
            setValues({
                ...props.artistsList.find(x => x.artistID == props.currentId)
            })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.currentId])

    return (
        <div>
            <p>Artist Name: {values.artistName}</p>
            <p>Album Name: {values.albumName}</p>
            <div className={classes.imgAlbum}>
                <Avatar alt={values.artistName} src={values.imageURL} variant="square" className={classes.large} />
            </div>            
            <audio controls autoPlay style={{ width: '100%' }}>
                <source src={values.sampleURL}></source>
            </audio>
        </div>
    )
}

const mapStateToProps = state => ({
    artistsList: state.artists.list
})

export default connect(mapStateToProps)(withStyles(styles)(MusicPlayer));