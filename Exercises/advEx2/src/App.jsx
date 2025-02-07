import './App.css'
import {Box, FormControl, MenuItem, Select, Typography} from "@mui/material";
import {useState} from "react";
import axios from "axios";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend, Colors,
} from 'chart.js';
import {Line} from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Colors
);


// DON'T DO THIS
const apiKey = "k00kG_egoRWNX_fAdW8cnm6swUx44Ypq";
// DON'T DO THIS

// eslint-disable-next-line react/prop-types
function FinancialChart({companySymbol, companyData}) {
    const chartData = {
        datasets: [{
            label: "Closing Price (USD)", data: companyData, borderWidth: 1,
        }]
    }
    return (<Box>
        <Line
            data={chartData}
            options={{
                plugins: {
                    title: {
                        display: true, text: companySymbol + " Closing Price (USD)"
                    }, legend: {
                        display: true
                    }
                }
            }}
        />
    </Box>);
}


function FinancialChartApp() {
    // API call should be handled here, as the Select is here & results need to be displayed in the Child
    const [companySymbol, setCompanySymbol] = useState("");
    const [companyData, setCompanyData] = useState(null);

    const currentDate = new Date();
    const date30DaysAgo = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 30);
    const formattedCurrentDate = String(currentDate.getFullYear()) + "-" + String(currentDate.getMonth() + 1).padStart(2, '0') + "-" + String(currentDate.getDate()).padStart(2, '0');
    const formattedDate30DaysAgo = String(date30DaysAgo.getFullYear()) + "-" + String(date30DaysAgo.getMonth() + 1).padStart(2, '0') + "-" + String(date30DaysAgo.getDate()).padStart(2, '0');

    console.log("Current date: " + formattedCurrentDate);
    console.log("Date 30 days ago: " + formattedDate30DaysAgo);

    async function handleChange(event) {
        const value = event.target.value;
        setCompanySymbol(value);

        const requestUrl = `https://api.polygon.io/v2/aggs/ticker/${value}/range/1/day/${formattedDate30DaysAgo}/${formattedCurrentDate}?adjusted=true&sort=asc&apiKey=${apiKey}`;
        if (value) {
            axios.get(requestUrl)
                .then(response => {
                    const formattedResult = response.data.results.map(item => ({x: (new Date(item.t)).toLocaleDateString('et-EE'), y: item.c}))
                    setCompanyData(formattedResult);
                    console.log(formattedResult);
                })
        } else {
            console.log("No company selected")
        }
    }

    return (<Box>
        <FormControl variant="standard" sx={{m: 2, minWidth: 300}}>
            <Select
                labelId="companyLabel"
                id="company"
                displayEmpty
                onChange={handleChange}
                sx={{
                    minWidth: 250, color: "#bbb",
                }}
                variant="outlined"
                defaultValue="">
                <MenuItem value=""><em>None</em></MenuItem>
                <MenuItem value="T">AT&T</MenuItem>
                <MenuItem value="CL">Colgate-Palmolive</MenuItem>
                <MenuItem value="DLB">Dolby Laboratories</MenuItem>
                <MenuItem value="PG">Procter & Gamble</MenuItem>
            </Select>
        </FormControl>
        {companyData && <FinancialChart companySymbol={companySymbol} companyData={companyData}/>}
    </Box>);
}

export default function App() {
    return (<Box>
        <Typography variant="h1">Financial Chart App</Typography>
        <FinancialChartApp/>
    </Box>)
}