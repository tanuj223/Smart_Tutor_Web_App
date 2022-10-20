import { Button, CircularProgress, Container, Grid, TextField, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import axios from "axios";
import { useDispatch } from 'react-redux';
import { openSnackbar } from 'src/redux/Slices/snackbarSlice';
import {Link} from "react-router-dom"
export default function Upload() {

    const [text, setText] = useState("");
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch();

    const uploadChapter = () => {
        setLoading(true)
        var data = {
            text: text,
            user: localStorage.getItem("user")
        }

        var config = {
            method: 'post',
            url: 'http://localhost:5000/chapter',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                console.log(response.data);
                setText('')
                setLoading(false)
                dispatch(openSnackbar({ msg: "Chapter Uploaded Successfully!", severity: "success" }))

            })
            .catch(function (error) {
                console.log(error.respones);
                setLoading(false)
                dispatch(openSnackbar({ msg: "Failed to upload chapter!", severity: "error" }))


            });
    }

    return (
        <Container style={{ padding: 20 }}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography
                        variant="h4"
                        color="primary"
                        style={{ marginBottom: 10 }}
                    >
                        Upload Chapter
                    </Typography>
                    <Typography>
                        Copy and Paste your Chapter text below to upload it.
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Chapter Text"
                        multiline
                        minRows={15}
                        fullWidth
                        variant="outlined"
                        onChange={(e) => setText(e.target.value)}
                    />
                </Grid>
            </Grid>
            <Grid container justifyContent={"flex-end"} style={{ paddingTop: '15px' }} spacing={3}>
                <Grid item justifyContent={"flex-end"} >
                    {loading ? <CircularProgress color='primary' /> :
                        <>
                            <Link to="/app/chapters"><Button color="primary" variant='standard'>Cancel</Button></Link>
                            <Button variant='contained' onClick={uploadChapter}>Upload</Button>
                        </>
                    }
                </Grid>
            </Grid>
            <Grid>

            </Grid>
        </Container>
    )
}
