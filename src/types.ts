export interface CBAMParameters {
  euEtsPrice: number;       // EUR / ton
  chinaCeaPrice: number;    // CNY / ton
  exchangeRate: number;     // 1 EUR = X CNY (default 7.8)
  freeAllocationYear: number; // Year (2026 - 2034)
  freeAllocationFactor: number; // percentage (e.g., 0.975 for 2026)
  accountingError: number;  // accounting error percentage (e.g., 3.5%)
  applyPunitiveDefault: boolean; // if accounting error > 5%
}

export interface StepDetail {
  id: string;
  label: string;
  subLabel: string;
  desc: string;
  color: string;
  badge: string;
  details: string[];
}

export interface IndustryDetail {
  id: string;
  name: string;
  color: string;
  defaultIntensity: number; // ton CO2 per ton of product
  emissionType: 'direct' | 'both' | 'indirect';
  defaultImpact: string; // e.g. "+150 EUR/ton"
  customDetail: string;
  description: string;
  unit: string;
  mitigationAdvise: string[];
}

export interface EnterpriseResult {
  companyName: string;
  industryId: string; // steel, aluminum, cement, fertilizer, electricity, hydrogen
  decarbonizedProcessName: string;
  recommendedExportVolume: number;
  suggestedIntensity: number;
  techScore: number;
  industryExplanation: string;
  tailoredAdvises: string[];
}
