import { Container, Grid, Typography, Paper, Button } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import classes from "./Chapter.module.css";
import { get } from "lodash";
import { Check, Close } from '@material-ui/icons';
import { Link } from 'react-router-dom';

export default function Chapter() {
    const [data, setData] = useState([]);

    useEffect(() => {
        getChapters();
    }, [])

    const getChapters = () => {
        axios.get(`http://localhost:5000/chapter?user=${localStorage.getItem("user")}`).then(res => {
            console.log(res.data)
            setData(res.data.data)
        }).catch(err => {
            console.log(err.response)
        })
    }

    return (
        <Container style={{ padding: 20 }}>
            <Grid container spacing={3}>
                <Grid item xs={12} style={{display:"flex", justifyContent:"space-between"}}>
                    <Typography variant="h4" color="primary" style={{ margin: 10 }}>My Chapters</Typography>
                    <Link to="/app/upload"><Button variant="contained" color="primary">Upload Chapter</Button></Link>
                </Grid>
            </Grid>
            <Grid container spacing={3}>
                {data.map(chapter =>
                    <Grid item xs={12} md={6} lg={4}>
                        <Link to={`/app/chapters/${chapter._id}`}>
                            <Paper className={classes.card} style={{ padding: 20 }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <Typography variant="overline">
                                            Chapter Text
                                        </Typography>
                                        <Typography className={classes.textbox}>
                                            {chapter.text}
                                        </Typography>

                                    </Grid>
                                    <Grid item xs={3}>
                                        <Typography variant="overline">
                                            Qna
                                        </Typography>
                                        <Typography>
                                            {get(chapter, "qna.length", "NA") == 0 ? "NA" : chapter.qna.length}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <Typography variant="overline">
                                            Notes
                                        </Typography>
                                        <Typography>
                                            {chapter && chapter.notes ? <Check /> : <Close />}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="overline">
                                            Recommendations
                                        </Typography>
                                        <Typography>
                                            {get(chapter, "recommendations.length", "NA") == 0 ? "NA" : chapter.recommendations.length}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Link>
                    </Grid>
                )}
            </Grid>

        </Container>
    )
}
