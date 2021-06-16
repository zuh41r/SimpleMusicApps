/* eslint-disable eqeqeq */
import "date-fns";
import React, { useEffect } from "react";
import { Grid, TextField, withStyles, Button } from "@material-ui/core";
import useForm from "./useForm";
import { connect } from "react-redux";
import * as actions from "../actions/artists";
import { useToasts } from "react-toast-notifications";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import NumberFormat from 'react-number-format';

const styles = theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            minWidth: 230,
        }
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 230,
    },
    smMargin: {
        margin: theme.spacing(1)
    }
})

const initialFieldValues = {
    artistName: '',
    imageURL: '',
    albumName: '',
    sampleURL: '',
    releaseDate: new Date().toISOString(),
    price:''
}

const ArtistsForm = ({ classes, ...props }) => {
    const { addToast } = useToasts()

    const {setEditVisibility} = props

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('artistName' in fieldValues)
            temp.artistName = fieldValues.artistName ? "" : "This field is required."
        if ('releaseDate' in fieldValues)
            temp.releaseDate = fieldValues.releaseDate ? "" : "This field is required."
        if ('albumName' in fieldValues)
            temp.albumName = fieldValues.albumName ? "" : "This field is required."
        if ('price' in fieldValues)
            temp.price = fieldValues.price ? "" : "This field is required."
        setErrors({
            ...temp
        })

        if (fieldValues == values)
            return Object.values(temp).every(x => x == "")
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFieldValues, validate, props.setCurrentId)

    const handleSubmit = e => {
        e.preventDefault()
        if (validate()) {
            values.price = parseFloat(values.price);
            const onSuccess = () => {
                setEditVisibility(false)
                props.onRefresh()
                resetForm()
                addToast("Submitted successfully", {
                    appearance: 'success',
                    placement: 'top-center'
                })
            }
            if (props.currentId == 0)
                props.createArtists(values, onSuccess)
            else
                props.updateArtists(props.currentId, values, onSuccess)
        }
    }

    useEffect(() => {
        if (props.currentId != 0) {
            setValues({
                ...props.artistsList.find(x => x.artistID == props.currentId)
            })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.currentId])

    const [selectedDate, setSelectedDate] = React.useState(new Date(values.releaseDate));

    const handleDateChange = (date) => {
        setSelectedDate(date);
        values.releaseDate = date.toISOString();
    };   

    const handlePriceChange = (values) => {
        handleInputChange({
            target: {
                name: 'price',
                value: values.value,
            },
        })
    };    

    return (
        <form autoComplete="off" noValidate className={classes.root} onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={12}>
                    <TextField
                        name="artistName"
                        variant="outlined"
                        label="Artist Name"
                        value={values.artistName}
                        onChange={handleInputChange}
                        {...(errors.artistName && { error: true, helperText: errors.artistName })}
                    />
                    <TextField
                        name="albumName"
                        variant="outlined"
                        label="Album Name"
                        value={values.albumName}
                        onChange={handleInputChange}
                        {...(errors.albumName && { error: true, helperText: errors.albumName })}
                    />
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <DatePicker
                            variant="outlined"
                            label="Release Date"
                            format="MM/dd/yyyy"
                            value={selectedDate}
                            onChange={handleDateChange}
                            {...(errors.releaseDate && { error: true, helperText: errors.releaseDate })}
                        />
                    </MuiPickersUtilsProvider>
                    <NumberFormat
                        name="price"
                        customInput={TextField}
                        onValueChange={handlePriceChange}
                        label="Price"
                        value={values.price}
                        variant="outlined"
                        isNumericString={true}
                        thousandSeparator={true}
                        {...(errors.price && { error: true, helperText: errors.price })}
                    />
                    <TextField
                        name="imageURL"
                        variant="outlined"
                        label="Image URL"
                        value={values.imageURL}
                        onChange={handleInputChange}
                    />
                    <TextField
                        name="sampleURL"
                        variant="outlined"
                        label="Music URL"
                        value={values.sampleURL}
                        onChange={handleInputChange}
                    />
                    <div>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            className={classes.smMargin}
                        >
                            Submit
                        </Button>
                        <Button
                            variant="contained"
                            className={classes.smMargin}
                            onClick={resetForm}
                        >
                            Reset
                        </Button>
                    </div>
                </Grid>
            </Grid>
        </form>
    );

}

const mapStateToProps = state => ({
    artistsList: state.artists.list
})

const mapActionToProps = {
    createArtists: actions.create,
    updateArtists: actions.update
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(ArtistsForm));