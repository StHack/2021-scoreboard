import { ProvideAuth } from 'hooks/useAuthentication'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { MantineProvider } from '@mantine/core'
import { themeMantine } from './styles/theme-mantine'

const root = createRoot(document.getElementById('root')!)
root.render(
  <StrictMode>
    <AppWrapper />
  </StrictMode>,
)

function AppWrapper () {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS theme={themeMantine}>
      <ProvideAuth>
        <App />
      </ProvideAuth>
    </MantineProvider>
  )
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
