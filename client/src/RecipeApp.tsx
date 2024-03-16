import { ThemeProvider } from '@emotion/react'
import CssBaseLine from '@mui/material/CssBaseline';
import { customTheme } from './theme/customTheme';
import { AppRouter } from './routes/AppRouter';



export const RecipeApp = () => {
  return (
    <ThemeProvider theme={ customTheme }>
        <CssBaseLine />         
        <AppRouter /> 
    </ThemeProvider>
  )
}
