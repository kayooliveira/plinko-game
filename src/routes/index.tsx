import { GamePlinkoPage } from 'pages/Games/Plinko'
import { BrowserRouter, Routes as Switch, Route } from 'react-router-dom'
export function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" element={<GamePlinkoPage />} />
      </Switch>
    </BrowserRouter>
  )
}
