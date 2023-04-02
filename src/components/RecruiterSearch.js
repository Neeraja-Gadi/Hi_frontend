import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Box, Button } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

const useStyles = makeStyles((theme) => ({

    root: {
       
        flexGrow: 1,
        background: theme.palette.info.main,
        border: 0,
        borderRadius: 5,
        // boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: "white",
        // padding: theme.spacing(5),
        marginBottom: "30px",
        // padding: '30px 30px',
    },
    container: {
        // padding: theme.spacing(6),
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
        // backgroundColor: theme.palette.info.main,
        // color: theme.palette.info.light

    },

}));

function RecruiterSearch() {
    const [query, setQuery] = useState('');
    const [seekers, setSeekers] = useState([]);
    const [filter, setFilter] = React.useState('');
    const [searchStatus, setSearchStatus] = React.useState(false)

    const handleChange = (event) => {
        setFilter(event.target.value);
    };

    const searchRes = function () {

        fetch(`http://localhost:8000/allusers?${filter}=${query}`)
            .then(response => response.json()
                .then(data => {
                    setSeekers(data.data)
                    console.log(data)
                    if (data.data) setSearchStatus(true)
                    else alert("No Results")
                })
                .catch(err => console.log(err)));
        console.log(seekers);
    }

    const HandleSearch = async (event) => {
        searchRes()
        event.preventDefault();

    }
    const classes = useStyles();

    return (
        <div className="Search">
            <form onSubmit={HandleSearch}>
                <Typography textAlign="center" variant="h6" gutterBottom>
                    Search ...
                </Typography>
                <FormControl >
                    <InputLabel id="demo-simple-select-label">Filter</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={filter}
                        label="Filter"
                        onChange={handleChange}
                    >
                        <MenuItem value={"educationLevel"}>Education Level</MenuItem>
                        <MenuItem value={"experience"}>Experience</MenuItem>
                        <MenuItem value={"primarySkills"}>PrimarySkills</MenuItem>
                        {/* <MenuItem value={"location"}>Location</MenuItem> */}
                        {/* <MenuItem value={"educationLevel"}>Education</MenuItem> */}

                    </Select>
                </FormControl>
                <TextField id="outlined-basic"
                    variant="outlined"
                    value={query} onChange={(e) => setQuery(e.target.value)} />
                {/* <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} /> */}
                <button type="submit">Search</button>
                {
                    searchStatus ?

                        <Container maxWidth="xs" >
                            <CssBaseline>
                                <Grid container spacing={1}>
                                    <Grid item xs={12}>
                                        <Typography textAlign="center" variant="h4" gutterBottom>
                                            JobSeekers Matched
                                        </Typography>
                                    </Grid>
                                    {seekers.map((seeker, index) => (
                                        <Grid item xs={8} sm={8} key={index} className={classes.root}>
                                            <Typography variant="subtitle1" textAlign="center" gutterBottom >
                                                Name :{seeker.firstName}{seeker.lastName}
                                            </Typography>
                                            <Typography variant="subtitle1" textAlign="center" gutterBottom >
                                                Email :{seeker.email}
                                            </Typography>
                                            <Typography variant="subtitle1" textAlign="center" gutterBottom >
                                                EducationLevel :{seeker.educationLevel}
                                            </Typography>
                                            <Typography variant="subtitle1" gutterBottom >
                                                Experience  :{seeker.experience}
                                            </Typography>
                                            <Typography variant="subtitle1" gutterBottom >
                                                PrimarySkills: {seeker.primarySkills}
                                            </Typography>
                                        </Grid>
                                    ))}
                                </Grid>
                            </CssBaseline>
                        </Container> : null

                }

            </form>

        </div>
    );
}

export default RecruiterSearch;