import './App.css'
import {Box, Button, Paper, Slider, styled, TextField, Typography} from "@mui/material";
import Grid from '@mui/material/Grid2';
import {useState} from "react";
import axios from "axios";
import PropTypes from "prop-types";


// WARNING: DON'T EVER DO THIS //
const justAKey = "041e3a1b97af495b804102008240809";
// WARNING: DON'T EVER DO THIS //


const Item = styled(Paper)(({theme}) => ({
    backgroundColor: '#333333',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: '#fff',
}));

function ForecastBox({item}) {
    const [time, setTime] = useState(12);

    function handleTimeChange(value) {
        setTime(Number(value));
    }

    // it's not good practice to use indices here
    // but as long as the API doesn't change then indices are perfect

    return (
        <Box>
            <Typography variant="p">
                {item.hour[time].time}<br/>
                <Slider aria-label="Time" defaultValue={12}
                valueLabelDisplay="auto" size="small"
                step={1} marks min={0} max={23}
                onChange={e => handleTimeChange(e.target.value)}/>
                <img src={item.hour[time].condition.icon} alt={item.hour[time].condition.text}/><br/>
                Temperature: {item.hour[time].temp_c}°C<br/>
                Feels like: {item.hour[time].feelslike_c}°C<br/>
                Wind: {item.hour[time].wind_kph}km/h<br/>
            </Typography>
        </Box>
    );
}

ForecastBox.propTypes = {
    item: PropTypes.object.isRequired,
};

function ForecastField({data}) {
    return (<>
        <Typography variant="p">{data.location.name}, {data.location.country}</Typography><br/>
        <Typography variant="p">Data pulled at {data.location.localtime}</Typography>
        <Grid container spacing={{xs: 2, md: 3}} columns={{xs: 4, sm: 8, md: 12}}>
            {
                data.forecast.forecastday.map(item => {
                    return (
                        <Grid key={item.date} size={4}>
                            <Item>
                                <ForecastBox item={item}/>
                            </Item>
                        </Grid>
                    )
                })
            }
        </Grid>
    </>);
}

ForecastField.propTypes = {
    data: PropTypes.object.isRequired,
}


function WeatherApp() {
    const [location, setLocation] = useState("London");
    const [forecastData, setForecastData] = useState("");

    function handleSubmit() {
        axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${justAKey}&q=${location}&days=3&aqi=no&alerts=no`)
            .then(response => {
                setForecastData(response.data);
                console.log(response.data);
            })
        console.log("Location: " + location);
    }

    // this would probably be more optimal when Submit would pull the data from TextField...somehow
    // not have it change every time.
    // Also, that way the initial defaultValue would work
    // (currently, London is set as the default state as well, so that it would work).
    return (<Box sx={{flexGrow: 1}}>
        <Box>
            <TextField
                slotProps={{inputLabel: {style: {color: "#777777"}}, input: {style: {color: "#fff"}}}}
                label="Location" variant="filled"
                defaultValue="London"
                onChange={e => setLocation(e.target.value)}
            />
        </Box>
        <Box>
            <Button onClick={handleSubmit}>Submit</Button>
        </Box>
        <Box sx={{flexGrow: 1}}>
            {Object.keys(forecastData).length !== 0 && <ForecastField data={forecastData}/>}
        </Box>
    </Box>);
}

export default function App() {
    return (<Box sx={{flexGrow: 1}}>
        <Typography variant="h1">Weather Application</Typography>
        <Typography variant="p">Currently, the max width of the boxes depends on the amount of text here. This is
            not ideal.</Typography>
        <WeatherApp/>
    </Box>)
}

