import { DefaultLayout } from 'layouts/DefaultLayout'
import { GamePlinkoPage } from 'pages/Games/Plinko'
import { BrowserRouter, Routes as Switch, Route } from 'react-router-dom'
export function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<GamePlinkoPage />} />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}
