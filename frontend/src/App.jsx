import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import ProfilePage from './pages/ProfilePage'
import PricingPage from './pages/PricingPage'
import SetupPage from './pages/SetupPage'
import InputPage from './pages/InputPage'
import ResultsPage from './pages/ResultsPage'
import SimulationPage from './pages/SimulationPage'
import HistoryPage from './pages/HistoryPage'

export default function App() {
  const [context, setContext] = useState({
    company_field: 'general',
    goal: 'maximize_profit',
    time_horizon: 'weekly',
    business_profile: undefined,
    input_mode: 'basic',
  })

  const [options, setOptions] = useState([])
  const [analysisResult, setAnalysisResult] = useState(null)

  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/pricing" element={<PricingPage />} />

        <Route
          path="/setup"
          element={<SetupPage context={context} setContext={setContext} />}
        />

        <Route
          path="/input"
          element={
            <InputPage
              context={context}
              options={options}
              setOptions={setOptions}
              setAnalysisResult={setAnalysisResult}
            />
          }
        />

        <Route
          path="/results"
          element={<ResultsPage analysisResult={analysisResult} />}
        />

        <Route
          path="/simulation"
          element={
            <SimulationPage
              context={context}
              options={options}
              analysisResult={analysisResult}
            />
          }
        />

        <Route path="/history" element={<HistoryPage />} />
      </Routes>
    </>
  )
}