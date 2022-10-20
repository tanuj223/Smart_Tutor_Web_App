import React, { useEffect, useState } from 'react';
import { Button, Container, Grid, Typography, Paper, Accordion, AccordionSummary, AccordionDetails, CircularProgress } from '@material-ui/core';
import axios from 'axios';
import { get } from "lodash";
import classes from "./ChapterDetails.module.css";
import { useParams } from 'react-router';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Edit } from '@material-ui/icons';
import EditChapter from './EditChapterModal/EditChapter';

export default function ChapterDetails(props) {

    const [data, setData] = useState({});
    const [openEditChapter, setOpenEditChapter] = useState(false);
    const [loading, setLoading] = useState(false)
    const [loading2, setLoading2] = useState(false)
    const [loading3, setLoading3] = useState(false)


    const params = useParams();

    useEffect(() => {
        getChapterById(params.id);
    }, [params])

    const generateNotes = () => {
        setLoading(true);

        var config = {
            method: 'get',
            url: `http://localhost:5000/chapter/notes/${params.id}`,
            headers: {}
        };

        axios(config)
            .then(function (response) {
                console.log(response.data);
                setLoading(false)
                getChapterById(params.id)
            })
            .catch(function (error) {
                console.log(error.response);
                setLoading(false)
            });
    }

    const generateQNA = () => {
        setLoading3(true);

        var config = {
            method: 'get',
            url: `http://localhost:5000/chapter/qna/${params.id}`,
            headers: {}
        };

        axios(config)
            .then(function (response) {
                console.log(response.data);
                setLoading3(false)
                getChapterById(params.id)
            })
            .catch(function (error) {
                console.log(error.response);
                setLoading3(false)
            });
    }

    const generateRecommend = () => {
        setLoading2(true);
        var config = {
            method: 'get',
            url: `http://localhost:5000/chapter/recommend/${params.id}`,
            headers: {}
        };

        axios(config)
            .then(function (response) {
                console.log(response.data);
                setLoading2(false)
                getChapterById(params.id)

            })
            .catch(function (error) {
                console.log(error.response);
                setLoading2(false)
            });
    }

    const getChapterById = (id) => {
        axios.get(`http://localhost:5000/chapter/${id}`).then(res => {
            console.log(res.data)
            setData(res.data.chapter)
        }).catch(err => {
            console.log(err.response)
        })
    }

    return (
        <Container style={{ padding: 20 }}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography variant="h4" color="primary" style={{ margin: 10 }}><span>My Chapters</span> / Chapter</Typography>
                </Grid>
            </Grid>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper style={{ padding: 20 }}>
                        <Typography variant="overline" className={classes.flexDiv}>Chapter Text
                            <Edit onClick={() => setOpenEditChapter(true)} color='primary' style={{ cursor: 'pointer' }} /> </Typography>
                        <Typography>
                            {data.text}
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={3}>
                    {loading ? <CircularProgress color='primary' /> : <Paper style={{ padding: 20 }}>
                        <Typography variant="overline" className={classes.flexButton}>
                            Notes
                            <Button onClick={generateNotes} variant='outlined' size='small'>Generate</Button></Typography>
                        <Typography>
                            {data.notes}
                        </Typography>
                    </Paper>}
                </Grid>
                <Grid item xs={4}>
                    {loading2 ? <CircularProgress color='primary' /> : <Paper style={{ padding: 20 }}>
                        <Typography variant="overline">Recommendations <Button onClick={generateRecommend} variant='outlined' size='small'>Generate</Button></Typography>

                        <Typography>
                            {data.recommendations?.join(" ")}
                        </Typography>
                    </Paper>}
                </Grid>
                <Grid item xs={4}>
                    {loading3 ? <CircularProgress color='primary' /> : <Paper style={{ padding: 20 }}>
                        <Typography variant="overline">Question and Answers <Button variant='outlined' onClick={generateQNA} size='small'>Generate</Button></Typography>
                        <Typography>
                            {data.qna?.map(qn => {
                                return (
                                    <Accordion style={{ marginBottom: 10 }}>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                        >
                                            <Typography>{qn.question}</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Typography>
                                                {qn.answer}
                                            </Typography>
                                        </AccordionDetails>
                                    </Accordion>
                                )
                            })}
                        </Typography>
                    </Paper>}
                </Grid>

            </Grid>

            <EditChapter
                data={data}
                open={openEditChapter}
                handleClose={() => setOpenEditChapter(false)}
                getChapter={() => getChapterById(params.id)}
            />
        </Container>
    )
}
