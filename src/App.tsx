import { HashRouter, Routes, Route } from 'react-router-dom'
import { TopPage } from './pages/TopPage'
import { EventPage } from './pages/EventPage'

export const App = () => (
  <HashRouter>
    <Routes>
      <Route path="/" element={<TopPage />} />
      <Route path="/album/:eventId" element={<EventPage />} />
    </Routes>
  </HashRouter>
)
