import React from 'react'
import ReactDOM from 'react-dom/client'

import './styles.css'
import { RecipeApp } from './RecipeApp.tsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store/store.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  
    <Provider store={ store }>
      <BrowserRouter>
        <RecipeApp />
      </BrowserRouter>
    </Provider>
  ,
)
