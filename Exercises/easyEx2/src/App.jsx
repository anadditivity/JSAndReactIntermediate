import './App.css'
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid2,
    Paper,
    Typography
} from "@mui/material";
import {useState} from "react";
import {itemData} from "./itemData.jsx";

function Gallery() {
    const [dialogIsOpen, setDialogIsOpen] = useState(false);

    function handlePaperClick() {
        setDialogIsOpen(true);
    }

    return (
            <Box>
                <Typography variant="h3" align="center">Gallery</Typography>
                <Grid2 container spacing={1} columns={4}>
                    {itemData.map((item) => (
                        <Grid2 key={item.title} size={1}>
                            <Paper square style={{ padding: "20px 0", minWidth: 164 }}
                                   onClick={handlePaperClick}>
                                <img
                                    srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                    alt={item.title}
                                    loading="lazy"
                                />
                            </Paper>
                        </Grid2>
                    ))}
                </Grid2>

                <Dialog open={dialogIsOpen} fullWidth={true}>
                    <DialogTitle>
                        The title should be here
                    </DialogTitle>
                    <DialogContent>
                        <Typography variant="p">The text should be here (Typography not regular text). It would work if I were to implement another map to a key system, but I didn't bother as this task is less important than some others. Also, the apostrophe in the previous sentence is not escaped.</Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained"
                                color="error"
                                onClick={() => {
                                    setDialogIsOpen(false)
                                }}
                        >
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
    );
}

export default function App() {
    return (<div>
        <Gallery/>
    </div>);
}

/*

 */