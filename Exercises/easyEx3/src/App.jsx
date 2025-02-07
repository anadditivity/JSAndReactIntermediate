import './App.css'
import {Box, Button, TextField, Typography} from "@mui/material";
import axios from "axios";
import {useState} from "react";

function AuthorMusicianApp() {
    // TODO: implement a default state (& API calls?) with useEffect
    // TODO: i believe that spaces are currently not handled correctly in the queries.
    // TODO: or rather, "Linkin Park" (artist) demonstrates the issue fairly well.

    const [inputField, setInputField] = useState("");
    const [outputData, setOutputData] = useState([]);

    function handleAuthorButtonClick() {
        // if this isn't set to [], then previous results will show up after a new search
        // could be done cleaner with some sort of await()
        setOutputData([]);
        let authorData;
        // should return objects instead so that keys would never repeat (Simon Tolkien & Simon Tolkien)
        axios.get(`https://openlibrary.org/search/authors.json?q=${inputField}`, {
            params: {
                "type": "/type/author", "limit": 10
            }
        })
            .then((response) => {
                authorData = response.data.docs
                    .slice(0, 10).map(item => (item.name));
                console.log(authorData);
                setOutputData(authorData);
            });
    }

    function handleMusicianButtonClick() {
        setOutputData([]);
        let musicianData;
        axios.get(`https://musicbrainz.org/ws/2/artist?query=${inputField}&limit=10&offset=3`)
            .then((response) => {
                musicianData = response.data.artists.map(item => item.name);
                console.log(musicianData);
                setOutputData(musicianData);
            })
    }

    return (<Box>
        <Box>
            <Typography variant="p">And by AUTHOR we mean book authors, not the original authors of a song or
                something like that.</Typography>
        </Box>
        <Box>
            <TextField id="filled-basic"
                       slotProps={{inputLabel: {style: {color: "#777777"}}, input: {style: {color: "#fff"}}}}
                       label="Query" variant="filled" onChange={e => setInputField(e.target.value)}/>
        </Box>
        <Box>
            <Button onClick={handleAuthorButtonClick}>Author</Button>
            <Button onClick={handleMusicianButtonClick}>Musician</Button>
        </Box>
        {outputData.length !== 0 && <Box>
            <Box><Typography variant="h4">Result</Typography></Box>{outputData.map(item => {
            return (<Box key={item}>
                    <Typography variant="p">{item}</Typography>
                </Box>)
        })}
        </Box>}
    </Box>);
}

export default function App() {
    return (<>
        <Typography variant="h2">Author & Musician app</Typography>
        <AuthorMusicianApp/>
    </>)
}
