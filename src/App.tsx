import ROUTES from './utils/router'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { Global } from './utils/global'
import { theme } from './utils/theme'

import { ExampleView } from './views/ExampleView'
import { CameraView } from './views/CameraView'

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Global/>
      <Router>
        {/* Routes here */}
        <Switch>
          <Route path={ROUTES.App.home} component={CameraView} exact/>
        </Switch>
      </Router>
    </ThemeProvider>
  )
}

export default App