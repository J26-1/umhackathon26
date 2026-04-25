import React from 'react'
import RecommendationCard from '../components/RecommendationCard'
import ComparisonTable from '../components/ComparisonTable'
import OpportunityChart from '../components/OpportunityChart'
import TradeoffPanel from '../components/TradeoffPanel'
import AIChatbox from '../components/AIChatbox'
import OpportunityCostHighlight from '../components/OpportunityCostHighlight'
import InputQualityCard from '../components/InputQualityCard'
import ValidationCard from '../components/ValidationCard'
import WhyNotChatbotCard from '../components/WhyNotChatbotCard'
import DecisionReport from '../components/DecisionReport'
import OptionContextCard from '../components/OptionContextCard'
import InputLimitsCard from '../components/InputLimitsCard'
import MarketSignalCard from '../components/MarketSignalCard'
import SourceSummaryPanel from '../components/SourceSummaryPanel'
import CompanyMonitorPanel from '../components/CompanyMonitorPanel'

export default function ResultsPage({ analysisResult }) {
  console.log('ANALYSIS RESULT:', analysisResult)

  if (!analysisResult) {
    return (
      <div className="container section">
        <div className="card">
          No results yet. Go to Input page and run analysis.
        </div>
      </div>
    )
  }

  return (
    <div className="container section grid">
      <div className="card">
        <div className="pill-row">
          <span className="badge">Ka-ching AI</span>
          <span className="pill">Ilmu GLM-5.1 reasoning enabled</span>
          <span className="pill">3-level input strategy</span>
          <span className="pill">Real-world market intelligence</span>
        </div>
      </div>

      <RecommendationCard
        best={analysisResult.best}
        insight={analysisResult.insight}
      />

      <OpportunityCostHighlight
        metrics={analysisResult.metrics}
        best={analysisResult.best}
      />

      <MarketSignalCard
        marketIntelligence={analysisResult.market_intelligence}
      />

      <SourceSummaryPanel
        marketIntelligence={analysisResult.market_intelligence}
      />

      <CompanyMonitorPanel />

      <OptionContextCard options={analysisResult.metrics} />
      <ComparisonTable metrics={analysisResult.metrics} />
      <OpportunityChart metrics={analysisResult.metrics} />
      <TradeoffPanel insight={analysisResult.insight} />
      <InputQualityCard metrics={analysisResult.metrics} />
      <InputLimitsCard />
      <ValidationCard />
      <WhyNotChatbotCard />
      <DecisionReport analysisResult={analysisResult} />
      <AIChatbox analysisResult={analysisResult} />
    </div>
  )
}