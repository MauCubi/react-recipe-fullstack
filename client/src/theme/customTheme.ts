import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";
import type {} from '@mui/lab/themeAugmentation';


export const customTheme = createTheme({
    // typography:{
    //     fontFamily: [
    //         'Hedvig Letters Serif','serif'
    //     ].join(','),
    // },
    palette: {
        primary: {
            main:'#008394',
            light:'#008a9d',
            dark:'#00424b'  
        },
        secondary: {
            main:'#543884'
        },
        error: {
            main: red.A400
        }
             
    },
    shape: {
        borderRadius: 10
    }
})