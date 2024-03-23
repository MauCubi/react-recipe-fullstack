import ReactDOM from 'react-dom/client'

import './styles.css'
import { RecipeApp } from './RecipeApp.tsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store/store.ts'
import { ScrollTop } from './components/ScrollTop.tsx'




ReactDOM.createRoot(document.getElementById('root')!).render(
  
    <Provider store={ store }>
      <BrowserRouter>   
        <ScrollTop />
        <RecipeApp />        
      </BrowserRouter>
    </Provider>
  ,
)
