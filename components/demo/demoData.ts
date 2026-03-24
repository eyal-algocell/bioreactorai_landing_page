export interface ChartCurve {
  fn: (t: number) => number
  color: string
  dashed?: boolean
}

export interface ChartConfig {
  statusText: string
  legend: { label: string; color: string; dashed?: boolean }[]
  yLeft: { top: string; bottom: string; color: string }
  yRight: { top: string; bottom: string; color: string }
  timeLabels: [string, string, string]
  curves: ChartCurve[]
  marker?: { t: number; label: string }
}

export interface DemoResponse {
  keywords: string[]
  answer: string
  chart?: ChartConfig
  metrics?: { label: string; value: string; delta?: string }[]
  source: string
}

const scenarios: DemoResponse[] = [
  {
    keywords: ['ph', 'trend', 'normal', 'day 3'],
    answer: 'Your pH is tracking 0.12 units lower than the average of your last 8 batches at this timepoint. This is within normal variation for day 3 of your CHO process. The downward trend is consistent with lactate accumulation during exponential growth phase.',
    chart: {
      statusText: 'Reactor 3 — pH Trend',
      legend: [
        { label: 'Current pH', color: '#14B8A6' },
        { label: 'Avg ± 2σ', color: '#14B8A6', dashed: true },
      ],
      yLeft: { top: '7.4', bottom: '6.6', color: 'rgba(20,184,166,0.5)' },
      yRight: { top: '', bottom: '', color: 'transparent' },
      timeLabels: ['0h', '72h', '144h'],
      curves: [
        { fn: t => 0.85 - 0.25 * t + 0.05 * Math.sin(t * 12), color: '#14B8A6' },
        { fn: t => 0.88 - 0.2 * t, color: '#14B8A6', dashed: true },
        { fn: t => 0.82 - 0.2 * t, color: '#14B8A6', dashed: true },
      ],
      marker: { t: 0.5, label: 'now' },
    },
    source: 'Batches #445-452 | Confidence: High',
  },
  {
    keywords: ['do', 'dissolved', 'oxygen', 'spike', 'spiking'],
    answer: 'DO spike correlates with a glucose feed pause at 47.5h. Your cells reduced oxygen consumption during the nutrient gap. Feed resumed at 48.2h — DO should normalize within 2 hours. This pattern matches 3 similar events in your batch history.',
    chart: {
      statusText: 'Reactor 2 — DO Analysis',
      legend: [
        { label: 'DO %', color: '#60A5FA' },
        { label: 'Feed rate', color: '#FB7185', dashed: true },
      ],
      yLeft: { top: '100%', bottom: '0%', color: 'rgba(96,165,250,0.5)' },
      yRight: { top: '2.0', bottom: '0', color: 'rgba(251,113,133,0.5)' },
      timeLabels: ['0h', '48h', '96h'],
      curves: [
        { fn: t => { const base = 0.4; const spike = 0.45 * Math.exp(-((t - 0.5) ** 2) / 0.002); return Math.min(0.95, base + spike); }, color: '#60A5FA' },
        { fn: t => (t > 0.48 && t < 0.52) ? 0.05 : 0.5, color: '#FB7185', dashed: true },
      ],
      marker: { t: 0.5, label: '48h' },
    },
    source: 'Reactor 2, Batch #467 | Feed log cross-referenced',
  },
  {
    keywords: ['co2', 'golden', 'compare', 'offgas', 'carbon'],
    answer: 'Your CO₂ evolution rate is tracking 12% higher than the golden batch at this stage. This typically indicates higher metabolic activity — consistent with the 8% higher VCD you\'re seeing. O₂ uptake rate confirms this pattern. No corrective action needed.',
    chart: {
      statusText: 'Batch #470 vs Golden Batch #401',
      legend: [
        { label: 'CO₂ current', color: '#34D399' },
        { label: 'CO₂ golden', color: '#34D399', dashed: true },
        { label: 'O₂ uptake', color: '#A78BFA' },
      ],
      yLeft: { top: '8.0%', bottom: '0%', color: 'rgba(52,211,153,0.5)' },
      yRight: { top: '12', bottom: '0', color: 'rgba(167,139,250,0.5)' },
      timeLabels: ['0h', '96h', '192h'],
      curves: [
        { fn: t => 0.75 / (1 + Math.exp(-8 * (t - 0.35))), color: '#34D399' },
        { fn: t => 0.65 / (1 + Math.exp(-8 * (t - 0.35))), color: '#34D399', dashed: true },
        { fn: t => 0.6 / (1 + Math.exp(-7 * (t - 0.4))), color: '#A78BFA' },
      ],
      marker: { t: 0.65, label: 'now' },
    },
    source: 'Golden Batch #401 vs Current #470 | OUR/CER analysis',
  },
  {
    keywords: ['temperature', 'temp', 'excursion', 'viability'],
    answer: 'Temperature reached 37.8°C for 23 minutes (setpoint: 36.5°C). Viability dropped 2.1% in the following 12 hours — within your historical range for similar excursions. No significant titer impact expected based on past data from 6 comparable events.',
    chart: {
      statusText: 'Reactor 1 — Temperature Event',
      legend: [
        { label: 'Temp °C', color: '#FB923C' },
        { label: 'Viability %', color: '#F472B6', dashed: true },
      ],
      yLeft: { top: '38.0', bottom: '35.0', color: 'rgba(251,146,60,0.5)' },
      yRight: { top: '100%', bottom: '80%', color: 'rgba(244,114,182,0.5)' },
      timeLabels: ['0h', '96h', '192h'],
      curves: [
        { fn: t => { const base = 0.5; const spike = 0.35 * Math.exp(-((t - 0.5) ** 2) / 0.0008); return base + spike; }, color: '#FB923C' },
        { fn: t => { if (t < 0.5) return 0.95; const dip = 0.08 * Math.exp(-((t - 0.55) ** 2) / 0.01); return 0.95 - dip + (t > 0.6 ? 0.03 * (t - 0.6) : 0); }, color: '#F472B6', dashed: true },
      ],
      marker: { t: 0.5, label: '96h' },
    },
    source: 'Batch #470, Event log | Historical excursion analysis',
  },
  {
    keywords: ['glucose', 'feed', 'level', 'nutrient', 'feeding'],
    answer: 'Current glucose: 3.2 g/L — within target range (2-5 g/L). At current consumption rate (0.8 g/L/h), you have ~4 hours before hitting the lower threshold. Recommend maintaining current feed rate of 1.2 mL/min. No bolus feed needed.',
    chart: {
      statusText: 'Reactor 3 — Glucose Monitoring',
      legend: [
        { label: 'Glucose g/L', color: '#FBBF24' },
        { label: 'Feed rate', color: '#14B8A6', dashed: true },
      ],
      yLeft: { top: '40', bottom: '0', color: 'rgba(251,191,36,0.5)' },
      yRight: { top: '2.0', bottom: '0', color: 'rgba(20,184,166,0.5)' },
      timeLabels: ['0h', '48h', '96h'],
      curves: [
        { fn: t => Math.max(0.08, 1 - 1 / (1 + Math.exp(-10 * (t - 0.5)))), color: '#FBBF24' },
        { fn: t => 0.3 + 0.2 * t, color: '#14B8A6', dashed: true },
      ],
      marker: { t: 0.7, label: 'now' },
    },
    source: 'Reactor 3, Live data | Feed strategy: exponential',
  },
  {
    keywords: ['biomass', 'growth', 'rate', 'vcd', 'cell', 'density'],
    answer: 'Current VCD: 8.4 ×10⁶ cells/mL. Specific growth rate (μ): 0.032 h⁻¹ — this is 5% above your historical average for day 4. Doubling time: 21.7 hours. You\'re on track to reach peak density of ~15 ×10⁶ cells/mL by day 7-8.',
    chart: {
      statusText: 'Reactor 3 — Growth Kinetics',
      legend: [
        { label: 'VCD ×10⁶', color: '#14B8A6' },
        { label: 'Growth rate μ', color: '#A78BFA', dashed: true },
      ],
      yLeft: { top: '20', bottom: '0', color: 'rgba(20,184,166,0.5)' },
      yRight: { top: '0.05', bottom: '0', color: 'rgba(167,139,250,0.5)' },
      timeLabels: ['Day 0', 'Day 7', 'Day 14'],
      curves: [
        { fn: t => 1 / (1 + Math.exp(-8 * (t - 0.4))), color: '#14B8A6' },
        { fn: t => 0.7 * Math.exp(-3 * (t - 0.3) ** 2), color: '#A78BFA', dashed: true },
      ],
      marker: { t: 0.28, label: 'now' },
    },
    source: 'Batch #470 | Growth model: logistic fit R²=0.98',
  },
  {
    keywords: ['harvest', 'when', 'stop', 'end'],
    answer: 'Based on your current growth trajectory and viability trend, optimal harvest window is Day 11-12 (168-192h from now). Viability is projected to cross 90% threshold around Day 13. Waiting past Day 12 risks a 5-8% titer reduction from increased cell lysis.',
    chart: {
      statusText: 'Reactor 3 — Harvest Projection',
      legend: [
        { label: 'VCD ×10⁶', color: '#14B8A6' },
        { label: 'Viability %', color: '#F472B6', dashed: true },
      ],
      yLeft: { top: '20', bottom: '0', color: 'rgba(20,184,166,0.5)' },
      yRight: { top: '100%', bottom: '70%', color: 'rgba(244,114,182,0.5)' },
      timeLabels: ['Day 0', 'Day 7', 'Day 14'],
      curves: [
        { fn: t => 0.9 / (1 + Math.exp(-7 * (t - 0.4))) + (t > 0.7 ? -0.15 * (t - 0.7) : 0), color: '#14B8A6' },
        { fn: t => { if (t < 0.55) return 0.97; return 0.97 - 0.35 * (t - 0.55) ** 1.5; }, color: '#F472B6', dashed: true },
      ],
      marker: { t: 0.28, label: 'now' },
    },
    source: 'Batch #470 | Harvest model based on 45 historical batches',
  },
  {
    keywords: ['compare', 'last', 'batch', 'previous', 'difference'],
    answer: 'Compared to Batch #469: VCD is 8% higher at this timepoint (+0.6 ×10⁶), glucose consumption is 12% faster, and pH is 0.08 units lower. Overall trajectory is improved — you\'re tracking closer to the golden batch profile than #469 did.',
    chart: {
      statusText: 'Batch #470 vs #469 — VCD Comparison',
      legend: [
        { label: '#470 current', color: '#14B8A6' },
        { label: '#469 previous', color: '#64748B', dashed: true },
      ],
      yLeft: { top: '20', bottom: '0', color: 'rgba(20,184,166,0.5)' },
      yRight: { top: '', bottom: '', color: 'transparent' },
      timeLabels: ['Day 0', 'Day 7', 'Day 14'],
      curves: [
        { fn: t => 0.95 / (1 + Math.exp(-8 * (t - 0.4))), color: '#14B8A6' },
        { fn: t => 0.85 / (1 + Math.exp(-7 * (t - 0.42))), color: '#64748B', dashed: true },
      ],
      marker: { t: 0.28, label: 'now' },
    },
    source: 'Batch #469 vs #470 | Multivariate comparison',
  },
  {
    keywords: ['viability', 'dropping', 'dead', 'dying', 'cell death'],
    answer: 'Viability is at 96.8% — healthy for day 4. Trend shows a 0.3% decline over the last 24h, which is normal during exponential growth. No signs of premature decline. Alert threshold is set at 92%. You\'re well above that.',
    chart: {
      statusText: 'Reactor 3 — Viability Trend',
      legend: [
        { label: 'Viability %', color: '#34D399' },
        { label: 'Alert threshold', color: '#EF4444', dashed: true },
      ],
      yLeft: { top: '100%', bottom: '80%', color: 'rgba(52,211,153,0.5)' },
      yRight: { top: '', bottom: '', color: 'transparent' },
      timeLabels: ['Day 0', 'Day 4', 'Day 8'],
      curves: [
        { fn: t => 0.97 - 0.04 * t + 0.01 * Math.sin(t * 8), color: '#34D399' },
        { fn: () => 0.6, color: '#EF4444', dashed: true },
      ],
      marker: { t: 0.5, label: 'now' },
    },
    source: 'Batch #470 | Viability model: Trypan Blue exclusion',
  },
  {
    keywords: ['summarize', 'summary', 'status', 'overview', 'how'],
    answer: 'Batch #470 (Day 4 of 14) — Reactor 3 is performing well. VCD: 8.4 ×10⁶ (above average), viability: 96.8% (healthy), glucose: 3.2 g/L (adequate), pH: 6.92 (slightly low but normal range). One temperature excursion logged at 96h with minimal impact. Overall: tracking 8% above golden batch on key metrics.',
    metrics: [
      { label: 'VCD', value: '8.4 ×10⁶', delta: '+8% vs avg' },
      { label: 'Viability', value: '96.8%', delta: 'Healthy' },
      { label: 'Glucose', value: '3.2 g/L', delta: 'Adequate' },
      { label: 'pH', value: '6.92', delta: '-0.12 vs avg' },
    ],
    source: 'Batch #470, Day 4 | Multi-parameter summary',
  },
  {
    keywords: ['predict', 'titer', 'yield', 'final', 'projection'],
    answer: 'Based on current growth kinetics and metabolic profile, predicted final titer: 2.8-3.2 g/L (confidence: 78%). This is 15% above your 12-month average of 2.5 g/L. Key drivers: higher VCD trajectory and improved glucose utilization efficiency.',
    chart: {
      statusText: 'Reactor 3 — Titer Projection',
      legend: [
        { label: 'Projected titer', color: '#14B8A6' },
        { label: '12-mo avg', color: '#64748B', dashed: true },
      ],
      yLeft: { top: '4.0', bottom: '0', color: 'rgba(20,184,166,0.5)' },
      yRight: { top: '', bottom: '', color: 'transparent' },
      timeLabels: ['Day 0', 'Day 7', 'Day 14'],
      curves: [
        { fn: t => 0.8 * (1 - Math.exp(-3 * t)), color: '#14B8A6' },
        { fn: t => 0.65 * (1 - Math.exp(-3 * t)), color: '#64748B', dashed: true },
      ],
      marker: { t: 0.28, label: 'now' },
    },
    source: 'Batch #470 | Titer prediction model (Random Forest, n=127 batches)',
  },
  {
    keywords: ['lactate', 'metabolite', 'byproduct', 'ammonia', 'waste'],
    answer: 'Lactate: 1.8 g/L — below concern threshold (3.0 g/L). Accumulation rate has slowed over the last 12h, suggesting a metabolic shift toward lactate consumption. This is a positive sign and consistent with efficient CHO metabolism in mid-exponential phase.',
    chart: {
      statusText: 'Reactor 3 — Metabolite Profile',
      legend: [
        { label: 'Lactate g/L', color: '#F59E0B' },
        { label: 'Glucose g/L', color: '#60A5FA', dashed: true },
      ],
      yLeft: { top: '5.0', bottom: '0', color: 'rgba(245,158,11,0.5)' },
      yRight: { top: '40', bottom: '0', color: 'rgba(96,165,250,0.5)' },
      timeLabels: ['0h', '48h', '96h'],
      curves: [
        { fn: t => 0.5 * t * (1 - 0.3 * t) + 0.02 * Math.sin(t * 15), color: '#F59E0B' },
        { fn: t => Math.max(0.08, 1 - 1 / (1 + Math.exp(-10 * (t - 0.5)))), color: '#60A5FA', dashed: true },
      ],
      marker: { t: 0.7, label: 'now' },
    },
    source: 'Batch #470 | Metabolite model: mass balance',
  },
]

const fallbackResponse: DemoResponse = {
  keywords: [],
  answer: 'That\'s a great question! To answer this with full detail, I\'d need to analyze your specific process data in context. Connect your SCADA/historian system to get personalized insights like this for every question you have.',
  source: 'Connect your data source to unlock full analysis',
}

export function findResponse(query: string): DemoResponse {
  const q = query.toLowerCase()
  let bestMatch: DemoResponse | null = null
  let bestScore = 0

  for (const scenario of scenarios) {
    const score = scenario.keywords.reduce((acc, kw) => acc + (q.includes(kw) ? 1 : 0), 0)
    if (score > bestScore) {
      bestScore = score
      bestMatch = scenario
    }
  }

  return bestScore >= 1 ? bestMatch! : fallbackResponse
}

export const suggestedQuestions = [
  'Is my pH trend normal?',
  'Why is DO spiking?',
  'Compare CO₂ to golden batch',
  'Summarize batch status',
  'When should I harvest?',
  'Predict final titer',
]
