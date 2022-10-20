import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@material-ui/core'
import { Edit } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import  axios from "axios";
import { useDispatch } from 'react-redux';
import { openSnackbar } from 'src/redux/Slices/snackbarSlice';

export default function EditChapter(props) {

    const [text, setText] = useState('');
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch()

    useEffect(() => {
        if (props.data)
            setText(props.data.text)
    }, [props.data])

    const editChapter = () => {
        setLoading(true)
        axios.put(`http://localhost:5000/chapter/${props.data._id}`, { text: text }).then(response => {
            console.log(response.data)
            setLoading(false)
            dispatch(openSnackbar({ msg: "Chapter Edited Successfully!", severity: "success" }))
            props.getChapter();
            props.handleClose();

        }).catch(err => {
            console.log(err.response)
            setLoading(false)
            dispatch(openSnackbar({ msg: "Failed to Edit Chapter!", severity: "error" }))
        })
    }

    return (
        <Dialog open={props.open} fullWidth>
            <DialogTitle style={{ display: 'flex', alignItems: 'center' }}>
                <Edit fontSize='small' style={{ marginRight: '8px' }} /> Edit Chapter Text
            </DialogTitle>
            <DialogContent style={{ paddingTop: 15 }}>
                <TextField
                    fullWidth
                    label="Chapter Text"
                    multiline
                    minRows={15}
                    variant="outlined"
                    onChange={(e) => setText(e.target.value)}
                    value={text}
                />
            </DialogContent>
            <DialogActions>
                {loading ? <CircularProgress color='primary' /> :
                    <>
                        <Button variant='standard' onClick={props.handleClose}>Cancel</Button>
                        <Button variant='contained' onClick={editChapter}>Upload</Button>
                    </>
                }
            </DialogActions>
        </Dialog>
    )
}
