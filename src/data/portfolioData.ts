export type DomainKey = 'mfg' | 'ecom' | 'kyc'

export const profile = {
  name: 'Ketaki Humbre',
  monogram: 'KH',
  location: 'Mumbai, Maharashtra, India',
  email: 'ketaki.humbre@gmail.com',
  linkedin: 'https://www.linkedin.com/in/ketaki-h-0042a51b4/',
  github: 'https://github.com/Ketaki-Humbre',
  resumeUrl: '/Ketaki_Humbre_CV.pdf',
  status: 'Available for Business Analyst & Functional Analyst Roles',
  subtitle: 'Business Analyst · Requirements Engineering, Process Optimization & BI Analytics',
  pitch:
    "Business Analyst with a Master's in Engineering and ISTQB CTFL certification. I translate complex operational problems into clear BRD/FRD specifications, BPMN/UML process flows, SQL analyses, and Power BI KPI dashboards.",
}

export const navLinks = [
  { id: 'case-studies', label: 'Case Studies' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
] as const

export type ImpactMetric =
  | { kind: 'number'; prefix: string; value: number; suffix: string; label: string; source: string }
  | { kind: 'text'; text: string; label: string; source: string }

export const impactMetrics: ImpactMetric[] = [
  { kind: 'number', prefix: '', value: 34, suffix: '%', label: 'Assembly Setup Efficiency Gain', source: 'Portescap India' },
  { kind: 'number', prefix: '~', value: 25, suffix: '%', label: 'Motor Defect Rate Reduction', source: 'Root Cause Analysis' },
  { kind: 'number', prefix: '', value: 5, suffix: '/5', label: 'Technical QA Evaluation Rating', source: 'Outlier' },
  { kind: 'text', text: 'ISTQB', label: 'Certified Tester Foundation Level', source: 'CTFL' },
]

/* ---------------------------------- Case study index ---------------------------------- */

export type CaseStudyId = 'manufacturing' | 'ecommerce' | 'kyc'

export interface CaseStudyMeta {
  id: CaseStudyId
  domain: DomainKey
  domainLabel: string
  timeline: string
  title: string
  summary: string
  scope: string
  tools: string[]
  sections: { id: string; label: string }[]
}

export const caseStudies: CaseStudyMeta[] = [
  {
    id: 'manufacturing',
    domain: 'mfg',
    domainLabel: 'Manufacturing & Supply Chain',
    timeline: 'Mar 2026 – Jul 2026',
    title: 'Smart Manufacturing — Supplier, Inventory & Quality Management System',
    summary:
      'Unified 6 fragmented manufacturing stages into an end-to-end supplier approval, procurement, inventory, and quality control workflow with structured requirements and KPI governance.',
    scope: '6 Stages · 4 Areas · 18 User Stories · 5 KPIs',
    tools: ['BPMN', 'BRD/FRD', 'User Stories', 'Business Rules', 'KPI Design', 'Jira'],
    sections: [
      { id: 'mfg-summary', label: 'Summary' },
      { id: 'mfg-process', label: 'Process Map' },
      { id: 'mfg-stories', label: 'User Stories' },
      { id: 'mfg-kpis', label: 'KPI Matrix' },
    ],
  },
  {
    id: 'ecommerce',
    domain: 'ecom',
    domainLabel: 'E-commerce & Retail',
    timeline: 'Jul 2025 – Oct 2025',
    title: 'E-commerce — Returns, Refunds & Customer Experience Analytics',
    summary:
      'Integrated 7 interconnected datasets (12,500 orders, 1,725 returns) in Excel and SQL to build a 6-KPI Power BI dashboard diagnosing return drivers, refund SLA delays, and pickup failures.',
    scope: '7 Datasets · 12,500 Orders · SQL + Power BI · 6 KPIs',
    tools: ['SQL', 'Power BI', 'Microsoft Excel', 'Data Modeling', 'KPI Analytics'],
    sections: [
      { id: 'ecom-summary', label: 'Summary' },
      { id: 'ecom-explorer', label: 'BI Explorer' },
      { id: 'ecom-kpis', label: 'KPIs' },
      { id: 'ecom-sql', label: 'SQL' },
      { id: 'ecom-recs', label: 'Recommendations' },
    ],
  },
  {
    id: 'kyc',
    domain: 'kyc',
    domainLabel: 'FinTech & Digital Banking',
    timeline: 'Feb 2025 – Jun 2025',
    title: 'Digital Banking — Customer Onboarding & KYC Workflow',
    summary:
      'Engineered a 6-stage digital banking onboarding and KYC specification covering 8 exception scenarios, 4-actor swimlane flows, SLA rules, and 24 UAT validation cases.',
    scope: '6 Stages · 4 Swimlanes · 8 Exceptions · 24 UAT Cases',
    tools: ['UML Diagrams', 'Functional Specs', 'User Stories', 'UAT Scenarios'],
    sections: [
      { id: 'kyc-summary', label: 'Summary' },
      { id: 'kyc-simulator', label: 'Path Simulator' },
      { id: 'kyc-exceptions', label: 'Exceptions' },
      { id: 'kyc-uat', label: 'UAT Matrix' },
    ],
  },
]

/* ------------------------------ Case study 1: Manufacturing ----------------------------- */

export interface MfgStage {
  id: number
  name: string
  area: string
  asIsGap: string
  ruleId: string
  rule: string
  kpi: string
  bottleneck?: string
}

export const manufacturing = {
  executiveSummary:
    'Disconnected handoffs across vendor onboarding, purchasing, warehouse receiving, and quality checks created material delays, recurring stockouts, and undetected supplier defects. I mapped an integrated 6-stage target workflow and authored functional requirements, 12 business rules, 18 Agile user stories, and 5 operational KPIs spanning 4 operational areas: Supplier Management, Procurement, Inventory Control, and Quality Control.',
  stages: [
    {
      id: 1,
      name: 'Supplier Approval',
      area: 'Supplier Management',
      asIsGap: 'Ad-hoc email approvals allowed non-compliant vendors.',
      ruleId: 'BR-01',
      rule: 'Mandatory compliance check before vendor activation.',
      kpi: 'OTIF Target ≥ 95%',
      bottleneck: 'Unverified Vendors',
    },
    {
      id: 2,
      name: 'Purchasing',
      area: 'Procurement',
      asIsGap: 'Manual PO pricing checks took 11.5 days avg cycle time.',
      ruleId: 'BR-02',
      rule: 'Automated >5% unit-price variance routing.',
      kpi: 'PO Cycle Time ≤ 7 Days',
    },
    {
      id: 3,
      name: 'Goods Receipt',
      area: 'Procurement & Receiving',
      asIsGap: 'Paper delivery challans caused quantity mismatches.',
      ruleId: 'BR-05',
      rule: 'Digital 3-way PO vs. receipt quantity verification.',
      kpi: 'OTIF Baseline 81% → 95%',
    },
    {
      id: 4,
      name: 'Quality Inspection',
      area: 'Quality Control',
      asIsGap: '5.4% incoming defect rate slipped onto assembly lines.',
      ruleId: 'BR-04',
      rule: 'Auto-quarantine batches exceeding 2% sample defects.',
      kpi: 'Rejection Rate ≤ 2.0%',
      bottleneck: '42 hr QC Hold Lag',
    },
    {
      id: 5,
      name: 'Inventory Control',
      area: 'Inventory Control',
      asIsGap: 'Quarantined items miscounted as usable stock.',
      ruleId: 'BR-03',
      rule: 'Exclude quarantined stock & auto-trigger reorder alerts.',
      kpi: '0 Critical Stockouts / Mo',
      bottleneck: '6 Stockouts / Mo',
    },
    {
      id: 6,
      name: 'Performance Monitoring',
      area: 'Supplier Management',
      asIsGap: 'No structured vendor scorecard or CAPA tracking.',
      ruleId: 'BR-08',
      rule: 'Monthly weighted vendor scorecard auto-refresh.',
      kpi: 'Hold Resolution ≤ 24 Hrs',
    },
  ] satisfies MfgStage[],
  userStories: [
    {
      id: 'US-01',
      area: 'Supplier Management',
      story:
        'As a Procurement Lead, I want to verify supplier compliance documents before vendor activation so that unapproved suppliers cannot receive purchase orders.',
      rule: 'BR-01: System blocks PO creation unless Vendor Status = Approved.',
      given: 'a vendor has pending quality/tax docs',
      when: 'a buyer selects them on a PO',
      then: 'the system disables submission and displays a compliance block alert.',
    },
    {
      id: 'US-02',
      area: 'Procurement',
      story:
        'As a Buyer, I want purchase orders validated against approved vendor pricing and lead times so that unauthorized rate variances are caught before dispatch.',
      rule: 'BR-02: POs exceeding contract unit price by >5% require manager approval.',
      given: 'a PO line item exceeds baseline price by 6%',
      when: 'submitted',
      then: 'status routes automatically to Pending Manager Approval.',
    },
    {
      id: 'US-03',
      area: 'Inventory Control',
      story:
        'As an Inventory Planner, I want automated low-stock alerts when usable inventory hits the reorder point so that production lines avoid material stockouts.',
      rule: 'BR-03: Quarantined stock is excluded from available inventory count.',
      given: 'Available Stock ≤ Reorder Threshold',
      when: 'daily stock sync runs',
      then: 'an alert and draft purchase requisition trigger automatically.',
    },
    {
      id: 'US-04',
      area: 'Quality Control',
      story:
        'As a QA Inspector, I want failed incoming batches automatically isolated in quarantine with standardized defect codes so that defective materials never enter production.',
      rule: 'BR-04: Any batch with sample defect rate >2% auto-flags as Quarantined.',
      given: 'an inspector logs status = Rejected',
      when: 'saved',
      then: 'inventory transfers to Quarantine bin and logs a supplier defect incident.',
    },
  ],
  kpis: [
    {
      name: 'Supplier Delivery Performance (OTIF %)',
      formula: '(On-Time & In-Full Deliveries / Total Deliveries) × 100',
      baseline: '81%',
      target: '≥ 95%',
      decision: 'Identifies unreliable suppliers for SLA review or backup sourcing.',
    },
    {
      name: 'Material Rejection Rate (%)',
      formula: '(Rejected Units at Incoming QC / Total Inspected Units) × 100',
      baseline: '5.4%',
      target: '≤ 2.0%',
      decision: 'Flags recurring quality failures and triggers supplier corrective action (CAPA).',
    },
    {
      name: 'Stockout Frequency',
      formula: 'Count of Production Stoppages or Zero-Stock Events per Month',
      baseline: '6/mo',
      target: '0 Critical',
      decision: 'Guides safety-stock and reorder-point calibration for high-velocity SKUs.',
    },
    {
      name: 'Purchase Order Cycle Time',
      formula: 'Avg Days from Requisition Approval to Goods Receipt',
      baseline: '11.5d',
      target: '≤ 7 Days',
      decision: 'Exposes procurement approval bottlenecks and vendor lead-time creep.',
    },
    {
      name: 'Quality Hold Resolution Time',
      formula: 'Avg Hours from Batch Quarantine to Final Disposition',
      baseline: '42h',
      target: '≤ 24 Hours',
      decision: 'Prevents usable stock bottlenecks and accelerates vendor replacement claims.',
    },
  ],
}

/* ------------------------------ Case study 2: E-commerce ------------------------------ */

export interface ReturnsCategory {
  id: string
  label: string
  orders: number
  metrics: {
    returnRate: string
    returns: string
    refundTat: string
    pickupFailure: string
    pendingSla: string
    pendingOpen: string
  }
  drivers: { label: string; value: number }[]
  pickupReasons: { label: string; value: number }[]
}

export const ecommerce = {
  executiveSummary:
    'Rising product returns, failed reverse-logistics pickups, and delayed refunds were eroding net margins and driving repeat support escalations. I cleaned and modeled 7 interconnected datasets (orders, order_items, returns, refunds, reverse_pickups, customers, products — covering 12,500 orders and 1,725 returns) in Excel and SQL, then built a Power BI dashboard tracking 6 KPIs to produce prioritized operational recommendations.',
  datasets: ['orders', 'order_items', 'returns', 'refunds', 'reverse_pickups', 'customers', 'products'],
  explorerTitle: 'Returns & Refunds Executive Explorer',
  footnote:
    'Interactive BI model reflecting the 7-dataset Excel/SQL & Power BI capstone analysis (12,500 simulated retail orders).',
  categories: [
    {
      id: 'all',
      label: 'All Categories',
      orders: 12500,
      metrics: {
        returnRate: '13.8%',
        returns: '1,725 returns',
        refundTat: '6.4 days',
        pickupFailure: '11.2%',
        pendingSla: '17.6%',
        pendingOpen: '304 open',
      },
      drivers: [
        { label: 'Size / Fit Mismatch', value: 38 },
        { label: 'Damaged in Transit', value: 24 },
        { label: 'Product Not as Described', value: 21 },
        { label: 'Defective / Missing Part', value: 17 },
      ],
      pickupReasons: [
        { label: 'Unconfirmed Slot / Customer Unavailable', value: 44 },
        { label: 'Incorrect Address', value: 26 },
        { label: 'Courier Capacity Delay', value: 18 },
        { label: 'Item Not Ready / Unpacked', value: 12 },
      ],
    },
    {
      id: 'apparel',
      label: 'Apparel',
      orders: 4800,
      metrics: {
        returnRate: '20.5%',
        returns: '984 returns',
        refundTat: '5.6 days',
        pickupFailure: '9.4%',
        pendingSla: '11.8%',
        pendingOpen: '116 open',
      },
      drivers: [
        { label: 'Size / Fit Mismatch', value: 58 },
        { label: 'Product Not as Described', value: 22 },
        { label: 'Damaged in Transit', value: 11 },
        { label: 'Defective / Missing Part', value: 9 },
      ],
      pickupReasons: [
        { label: 'Unconfirmed Slot / Customer Unavailable', value: 48 },
        { label: 'Incorrect Address', value: 22 },
        { label: 'Item Not Ready / Unpacked', value: 17 },
        { label: 'Courier Capacity Delay', value: 13 },
      ],
    },
    {
      id: 'electronics',
      label: 'Electronics',
      orders: 3600,
      metrics: {
        returnRate: '9.1%',
        returns: '328 returns',
        refundTat: '8.4 days',
        pickupFailure: '14.6%',
        pendingSla: '28.5%',
        pendingOpen: '93 open',
      },
      drivers: [
        { label: 'Defective / Missing Part', value: 42 },
        { label: 'Damaged in Transit', value: 29 },
        { label: 'Product Not as Described', value: 19 },
        { label: 'Spec / Compatibility Issue', value: 10 },
      ],
      pickupReasons: [
        { label: 'Item Not Ready / Missing Accessories', value: 36 },
        { label: 'Unconfirmed Slot / Customer Unavailable', value: 31 },
        { label: 'Courier Capacity Delay', value: 21 },
        { label: 'Incorrect Address', value: 12 },
      ],
    },
    {
      id: 'home',
      label: 'Home & Kitchen',
      orders: 4100,
      metrics: {
        returnRate: '10.1%',
        returns: '413 returns',
        refundTat: '6.1 days',
        pickupFailure: '11.8%',
        pendingSla: '16.2%',
        pendingOpen: '67 open',
      },
      drivers: [
        { label: 'Damaged in Transit', value: 41 },
        { label: 'Product Not as Described', value: 27 },
        { label: 'Size / Dimension Mismatch', value: 19 },
        { label: 'Defective / Missing Part', value: 13 },
      ],
      pickupReasons: [
        { label: 'Unconfirmed Slot / Customer Unavailable', value: 41 },
        { label: 'Incorrect Address', value: 29 },
        { label: 'Courier Capacity Delay', value: 19 },
        { label: 'Item Not Ready / Unpacked', value: 11 },
      ],
    },
  ] satisfies ReturnsCategory[],
  kpis: [
    { name: 'Return Rate', value: '13.8% overall', context: 'Peaking at 20.5% in Apparel' },
    { name: 'Avg Refund Turnaround Time', value: '6.4 days', context: 'Slowest in Electronics at 8.4 days' },
    { name: 'Reverse Pickup Failure Rate', value: '11.2%', context: 'Across all pickup attempts (44% due to unconfirmed slots)' },
    { name: 'Pending Refunds >7d SLA', value: '17.6%', context: 'Of active refunds (304 orders breaching target SLA)' },
    { name: 'Category Return Concentration', value: '57% Apparel', context: 'Of total return volume (984 of 1,725)' },
    { name: 'Repeat Returner Share', value: '8.4% → 23%', context: '8.4% of active buyers generated 23% of total return volume' },
  ],
  sqlQueries: [
    {
      id: 'category-return-rate',
      label: 'Category Return Rate',
      code: `-- Calculate return rate and total returned units by product category
SELECT
    p.category,
    COUNT(DISTINCT oi.order_item_id) AS total_items_sold,
    COUNT(DISTINCT r.return_id) AS total_returns,
    ROUND(
        COUNT(DISTINCT r.return_id) * 100.0
        / NULLIF(COUNT(DISTINCT oi.order_item_id), 0),
        2
    ) AS return_rate_pct
FROM order_items oi
JOIN products p ON oi.product_id = p.product_id
LEFT JOIN returns r ON oi.order_item_id = r.order_item_id
GROUP BY p.category
ORDER BY return_rate_pct DESC;`,
    },
    {
      id: 'refund-sla',
      label: 'Refund SLA Breaches',
      code: `-- Track average refund turnaround time (TAT) and >7-day SLA breaches
SELECT
    r.return_reason,
    COUNT(rf.refund_id) AS total_refunds,
    ROUND(AVG(DATEDIFF(rf.refund_completed_date, r.return_initiated_date)), 1) AS avg_refund_days,
    SUM(CASE
        WHEN DATEDIFF(rf.refund_completed_date, r.return_initiated_date) > 7 THEN 1
        ELSE 0
    END) AS sla_breach_count,
    SUM(CASE WHEN rf.refund_status = 'Pending' THEN 1 ELSE 0 END) AS pending_refunds
FROM returns r
JOIN refunds rf ON r.return_id = rf.return_id
GROUP BY r.return_reason
ORDER BY avg_refund_days DESC;`,
    },
    {
      id: 'pickup-failure',
      label: 'Pickup Failure Analysis',
      code: `-- Identify reverse pickup failure rates by courier partner and failure reason
SELECT
    rp.courier_partner,
    rp.failure_reason,
    COUNT(rp.pickup_id) AS total_attempts,
    SUM(CASE WHEN rp.pickup_status = 'Failed' THEN 1 ELSE 0 END) AS failed_pickups,
    ROUND(
        SUM(CASE WHEN rp.pickup_status = 'Failed' THEN 1 ELSE 0 END) * 100.0
        / NULLIF(COUNT(rp.pickup_id), 0),
        2
    ) AS pickup_failure_pct
FROM reverse_pickups rp
GROUP BY rp.courier_partner, rp.failure_reason
ORDER BY pickup_failure_pct DESC;`,
    },
  ],
  recommendations: [
    {
      priority: 'P1 High',
      finding: '44% of failed pickups stem from customer unavailability',
      rootCause: 'Unconfirmed reverse pickup windows causing wasted courier dispatches',
      action: 'Send automated SMS/WhatsApp slot confirmation 12 hours prior to pickup',
      impact: 'Targeted 30–35% reduction in failed pickup attempts and reverse-logistics cost.',
    },
    {
      priority: 'P1 High',
      finding: '28.5% Electronics & 17.6% overall refunds breach the 7-day SLA',
      rootCause: 'Manual warehouse QA gate blocking low-risk refund settlements',
      action: 'Auto-release refunds at doorstep courier scan for verified low-value SKUs',
      impact: 'Cuts avg refund TAT from 6.4d toward < 3.5d and lowers support ticket volume.',
    },
    {
      priority: 'P2 Medium',
      finding: 'Apparel drives 57% of returns, with 58% citing Size/Fit Mismatch',
      rootCause: 'Inconsistent brand size charts and limited fit guidance on product pages',
      action: 'Standardize interactive fit guides and route return-reason flags to catalog teams',
      impact: 'Targets 15–20% reduction in avoidable fit-related Apparel returns.',
    },
  ],
}

/* ------------------------------ Case study 3: Digital Banking KYC ------------------------------ */

export const kycLanes = ['Customer', 'Onboarding App', 'eKYC / OCR API', 'Compliance Queue'] as const

export interface KycStage {
  id: number
  short: string
  name: string
  lane: number
}

export interface KycScenario {
  id: string
  pill: string
  detectionStage: number
  tone: 'ok' | 'warn' | 'alert'
  branch?: { lane: number; label: string }
  endLabel?: string
  detection: string
  systemAction: string
  customerMessage: string
}

export const kyc = {
  executiveSummary:
    'Digital account opening funnels suffer high abandonment when verification edge cases result in dead-end errors, while weak validation controls create regulatory compliance exposure. I designed a 6-stage onboarding specification spanning 4 system swimlanes, 8 structured exception paths, strict timeout/retry SLAs (<5 min target happy path, 30s API timeout, 24–48 hr manual review SLA), and 24 UAT test cases.',
  slaRules: ['< 5 min happy path target', '30s API timeout', '24–48 hr manual review SLA'],
  stages: [
    { id: 1, short: 'Registration', name: 'Stage 1 · Registration', lane: 0 },
    { id: 2, short: 'Doc Upload', name: 'Stage 2 · Doc Upload', lane: 0 },
    { id: 3, short: 'Doc Validation', name: 'Stage 3 · Doc Validation', lane: 2 },
    { id: 4, short: 'ID Verification', name: 'Stage 4 · ID Verification', lane: 2 },
    { id: 5, short: 'App Review', name: 'Stage 5 · App Review', lane: 1 },
    { id: 6, short: 'Activation', name: 'Stage 6 · Activation', lane: 1 },
  ] satisfies KycStage[],
  scenarios: [
    {
      id: 'happy',
      pill: 'Happy Path (All 6 Stages)',
      detectionStage: 6,
      tone: 'ok',
      endLabel: 'Account Activated (< 5 min target)',
      detection: 'Stages 1–6 · < 5 min end-to-end target',
      systemAction: 'Unique PAN/mobile, readable ID, liveness and eKYC pass; account auto-activates and an account ID is generated.',
      customerMessage: 'Welcome aboard — your account is active. Your account details have been sent via SMS/email.',
    },
    {
      id: 'EX-01',
      pill: 'EX-01 Blurry Doc',
      detectionStage: 3,
      tone: 'warn',
      branch: { lane: 0, label: 'Re-upload prompt' },
      detection: 'Stage 3: Doc Validation · OCR image-quality check',
      systemAction: 'Pause onboarding; set status = Action Required; preserve entered form data.',
      customerMessage:
        'We could not read your document clearly. Retake the photo in good lighting with all four corners visible — your details are saved.',
    },
    {
      id: 'EX-02',
      pill: 'EX-02 Duplicate PAN',
      detectionStage: 1,
      tone: 'warn',
      branch: { lane: 1, label: 'Resume / Login' },
      detection: 'Stage 1: Registration · PAN / mobile uniqueness check',
      systemAction: 'Block new record creation; link to existing customer/draft ID.',
      customerMessage: 'An account or saved application already exists for these details. Resume your application or log in.',
    },
    {
      id: 'EX-03',
      pill: 'EX-03 eKYC Fail',
      detectionStage: 4,
      tone: 'alert',
      branch: { lane: 3, label: 'Manual review 24–48h' },
      detection: 'Stage 4: ID Verification · 1 retry, then 24–48 hr manual review SLA',
      systemAction: 'Log failure code; allow 1 retry before routing to manual compliance review.',
      customerMessage: 'Under Manual Review — 24–48 hrs. Your reference ID has been sent to you for tracking.',
    },
    {
      id: 'EX-04',
      pill: 'EX-04 Expired ID',
      detectionStage: 3,
      tone: 'warn',
      branch: { lane: 0, label: 'Alternate ID upload' },
      detection: 'Stage 3: Doc Validation · OCR expiry-date check',
      systemAction: 'Reject document via OCR expiry-date check; block progression to eKYC.',
      customerMessage: 'This document has expired. Please upload an alternate valid government ID to continue.',
    },
    {
      id: 'EX-07',
      pill: 'EX-07 API Timeout',
      detectionStage: 4,
      tone: 'warn',
      branch: { lane: 1, label: 'Background retry ×3' },
      detection: 'Stage 4: ID Verification · 30s Gateway Timeout Threshold',
      systemAction: 'Auto-save session state; enqueue asynchronous background retry (max 3 attempts).',
      customerMessage:
        "Your progress is saved. Verification is running in the background — we'll notify you via SMS/email once complete.",
    },
    {
      id: 'EX-08',
      pill: 'EX-08 Compliance Flag',
      detectionStage: 5,
      tone: 'alert',
      branch: { lane: 3, label: 'Senior Compliance Officer' },
      detection: 'Stage 5: App Review · Watchlist screening match',
      systemAction: 'Freeze automated activation; escalate case to Senior Compliance Officer.',
      customerMessage: 'Additional Review Required. We will update you on your application status shortly.',
    },
  ] satisfies KycScenario[],
  exceptions: [
    {
      id: 'EX-01',
      scenario: 'Missing or Unreadable Documents',
      stage: 'Stage 3: Doc Validation',
      action: 'Pause onboarding; set status = Action Required; preserve entered form data',
      recovery: 'Prompt targeted re-upload with lighting/framing guidance without restarting flow.',
    },
    {
      id: 'EX-02',
      scenario: 'Duplicate Application (Existing PAN/Mobile)',
      stage: 'Stage 1: Registration',
      action: 'Block new record creation; link to existing customer/draft ID',
      recovery: 'Notify user an account/draft exists and offer "Resume Application" or Login redirect.',
    },
    {
      id: 'EX-03',
      scenario: 'Identity Verification (eKYC) Failure',
      stage: 'Stage 4: ID Verification',
      action: 'Log failure code; allow 1 retry before routing to manual compliance review',
      recovery: 'Show clear status ("Under Manual Review — 24–48 hrs") with ticket reference ID.',
    },
    {
      id: 'EX-04',
      scenario: 'Expired Government ID Document',
      stage: 'Stage 3: Doc Validation',
      action: 'Reject document via OCR expiry-date check; block progression to eKYC',
      recovery: 'Inform user document is expired and prompt upload of an alternate valid ID.',
    },
    {
      id: 'EX-05',
      scenario: 'Name / DOB Mismatch Across Documents',
      stage: 'Stage 3: Doc Validation',
      action: 'Flag discrepancy score > threshold; route to Stage 5 Compliance Queue',
      recovery: 'Request supporting name-change/secondary proof or confirm manual review timeline.',
    },
    {
      id: 'EX-06',
      scenario: 'Selfie / Liveness Check Failure',
      stage: 'Stage 4: ID Verification',
      action: 'Reject biometric capture; increment attempt counter (max 3 retries)',
      recovery: 'Display live capture tips; after 3 failures, offer assisted Video-KYC fallback slot.',
    },
    {
      id: 'EX-07',
      scenario: 'External KYC Gateway Timeout',
      stage: 'Stage 4: ID Verification',
      action: 'Auto-save state; enqueue asynchronous background retry (3 attempts)',
      recovery: 'Display non-destructive progress screen and send SMS/email once verification clears.',
    },
    {
      id: 'EX-08',
      scenario: 'High-Risk / Compliance Watchlist Flag',
      stage: 'Stage 5: App Review',
      action: 'Freeze automated activation; escalate case to Senior Compliance Officer',
      recovery: 'Show generic "Additional Review Required" status (no compliance tip-off language).',
    },
  ],
  uat: [
    {
      id: 'UAT-01',
      linked: 'Happy Path (Stages 1–6)',
      steps: 'Submit unique mobile/PAN, valid readable ID, pass liveness & eKYC API',
      expected: 'Account activates automatically (<5 min SLA); welcome confirmation & account ID generated.',
    },
    {
      id: 'UAT-02',
      linked: 'EX-01 Missing/Blurry Doc',
      steps: 'Upload blurred ID image during Stage 2',
      expected: 'OCR flags low quality, blocks Stage 4, preserves draft data, prompts re-upload.',
    },
    {
      id: 'UAT-03',
      linked: 'EX-02 Duplicate PAN',
      steps: 'Register using a PAN already tied to an active customer record',
      expected: 'System blocks duplicate account creation and displays Resume/Login modal.',
    },
    {
      id: 'UAT-04',
      linked: 'EX-03 eKYC Failure',
      steps: 'Trigger mocked eKYC mismatch response twice in Stage 4',
      expected: 'Second failure transitions application to Manual Compliance Queue (24–48 hr SLA) with reference ID.',
    },
    {
      id: 'UAT-05',
      linked: 'EX-07 API Timeout',
      steps: 'Simulate 30s timeout from third-party KYC endpoint',
      expected: 'Session state persists safely; background retry queues (3 attempts) without losing user uploads.',
    },
  ],
}

/* ---------------------------------- Experience ---------------------------------- */

export const experience = [
  {
    role: 'LLM Evaluation Specialist',
    company: 'Outlier',
    location: 'Remote, Canada',
    period: 'July 2024 – December 2024',
    tags: ['Technical QA', 'Requirements Validation', 'Python', 'Java', 'SQL'],
    bullets: [
      'Evaluated AI-generated responses across Python, Java, and SQL against task-specific requirements, assessing technical accuracy, logical reasoning, and code quality.',
      'Identified factual inaccuracies, logical inconsistencies, coding errors, and hallucinations against predefined quality criteria.',
      'Applied structured evaluation guidelines to maintain consistent assessment outcomes, earning consistent 5/5 feedback for technical contributions and evaluation quality.',
    ],
  },
  {
    role: 'Graduate Engineer Trainee',
    company: 'Portescap India Private Limited',
    location: 'Mumbai, India',
    period: 'February 2022 – November 2022',
    tags: ['Process Improvement', 'Root Cause Analysis', 'Stakeholder Collaboration'],
    bullets: [
      'Analyzed operational workflows across 4 motor assembly lines in collaboration with shop-floor staff and management to simplify tasks and boost productivity.',
      'Improved assembly setup efficiency by 34% by creating clearly labeled circuit diagrams that made wiring processes easier to understand and follow.',
      'Reduced motor defect rates by ~25% by investigating wiring issues, isolating heating unit placement as the root cause, and eliminating hidden damage.',
    ],
  },
]

/* ---------------------------------- Skills ---------------------------------- */

export const skills = [
  {
    category: 'Business Analysis',
    icon: 'clipboard',
    tone: 'indigo',
    items: [
      'Requirements Analysis',
      'Functional Requirements',
      'Business Rules',
      'User Stories',
      'Process Workflow Analysis',
      'Gap Analysis',
      'Root Cause Analysis',
      'KPI Definition',
    ],
  },
  {
    category: 'Data & Visualization',
    icon: 'chart',
    tone: 'teal',
    items: ['Microsoft Excel', 'SQL', 'Power BI', 'Tableau', 'KPI Analysis', 'Dashboard Development'],
  },
  {
    category: 'Documentation & Modeling',
    icon: 'workflow',
    tone: 'amber',
    items: ['BRD', 'FRD', 'BPMN', 'Functional Specifications', 'UML Diagrams', 'Workflow Documentation', 'UAT Scenarios'],
  },
  {
    category: 'Tools & Platforms',
    icon: 'wrench',
    tone: 'sky',
    items: ['Jira', 'Zephyr Scale', 'Postman', 'JMeter', 'TestLink', 'Trello'],
  },
  {
    category: 'Technical & Code',
    icon: 'code',
    tone: 'emerald',
    items: ['Python', 'Java', 'JavaScript', 'JSON', 'API Fundamentals', 'Git', 'GitHub'],
  },
  {
    category: 'Soft Skills',
    icon: 'users',
    tone: 'violet',
    items: [
      'Stakeholder Communication',
      'Analytical Thinking',
      'Problem-Solving',
      'Cross-functional Collaboration',
      'Technical Documentation',
      'Presentation',
    ],
  },
] as const

/* ---------------------------------- Education ---------------------------------- */

export const education = {
  degrees: [
    {
      degree: "Master's in Mechanical Engineering",
      school: 'University of Windsor',
      location: 'Windsor, ON, Canada',
      period: 'Jan 2023 – Apr 2024',
    },
    {
      degree: 'Bachelor of Technology in Production Engineering',
      school: 'VJTI',
      location: 'Mumbai, India',
      period: 'Aug 2017 – May 2021',
    },
  ],
  coursework: [
    'Business Analytics',
    'Statistics',
    'Computer Programming & Problem Solving',
    'Advanced Business Communication',
  ],
  certifications: [
    { name: 'ISTQB Certified Tester – Foundation Level (CTFL)', issuer: 'ISTQB' },
    { name: 'Software Development Methodologies (SME) Job Simulation', issuer: 'Forage · Walmart Global Tech' },
    { name: 'Excel Skills for Business Essentials', issuer: 'Coursera' },
    { name: 'Python Programming: Learn Python from Scratch to AI and ML', issuer: 'Udemy' },
  ],
  leadership: [
    { title: 'Achieved Next Gen CTO badge and certificate', level: 'Graduate' },
    { title: 'Volunteered at 2nd Annual Alumni and Student Pow Wow', level: 'Graduate' },
    { title: 'Event Head of Cultural Festival', level: 'Undergraduate' },
  ],
}

export const contact = {
  heading: "Let's Connect",
  subtext: 'Based in Mumbai, India · Open to Business Analyst, Functional Analyst, and BI Analyst opportunities.',
}
