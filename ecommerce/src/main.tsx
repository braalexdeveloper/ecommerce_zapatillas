import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.tsx'
import { Provider } from 'react-redux'
import { store } from './store/index.ts'
import { UserProvider } from './context/UserContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UserProvider>
    <Provider store={store}>
    <App />
    </Provider>
    </UserProvider>
  </StrictMode>,
)
