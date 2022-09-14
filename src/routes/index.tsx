import { DefaultLayout } from 'layouts/DefaultLayout'
import { Contribute } from 'pages/Contribute'
import { GamePlinkoPage } from 'pages/Games/Plinko'
import { LoginPage } from 'pages/Login'
import { ScoreBoardPage } from 'pages/ScoreBoard'
import { BrowserRouter, Routes as Switch, Route } from 'react-router-dom'

import { NotFound } from './components/NotFound'
import { RequireAuth } from './components/RequireAuth'
export function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route element={<DefaultLayout />}>
          <Route element={<RequireAuth />}>
            <Route path="/plinko" element={<GamePlinkoPage />} />
          </Route>
          <Route path="/" element={<ScoreBoardPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/contribute" element={<Contribute />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}
