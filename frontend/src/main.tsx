import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter as Router } from 'react-router-dom'
import ToasterProvider from './components/ToasterProvider.tsx'
import { AppContextProvider } from './context/AppContext.tsx'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
    },
  },
})


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
     <QueryClientProvider client={queryClient}>
      <Router>
        <AppContextProvider>
          <App />
          <ToasterProvider />
        </AppContextProvider>
      </Router>
     </QueryClientProvider>
  </React.StrictMode>,
)
