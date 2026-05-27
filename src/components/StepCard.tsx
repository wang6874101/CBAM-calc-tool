import { useState } from 'react';
import { STEPS_DATA } from '../data/cbamData';
import { StepDetail, CBAMParameters } from '../types';
import { CheckCircle2, ChevronDown, ChevronUp, AlertCircle, Info } from 'lucide-react';

interface StepCardProps {
  parameters: CBAMParameters;
  onSelectStep?: (stepId: string) => void;
  activeStepId?: string;
}

export default function StepCard({ parameters, onSelectStep, activeStepId }: StepCardProps) {
  const [localActiveId, setLocalActiveId] = useState<string>("step1");

  const effectiveActiveId = activeStepId || localActiveId;
  const handleSelect = (id: string) => {
    setLocalActiveId(id);
    if (onSelectStep) {
      onSelectStep(id);
    }
  };

  // Dynamically personalize numbers on some cards based on state parameters!
  const getDynamicStepValue = (step: StepDetail) => {
    if (step.id === 'step1') {
      return `${parameters.accountingError.toFixed(1)}%`;
    }
    if (step.id === 'step2') {
      const availableDeduction = parameters.chinaCeaPrice / parameters.exchangeRate;
      const deductionCap = parameters.euEtsPrice;
      const actualDeduct = Math.min(availableDeduction, deductionCap);
      return `€${actualDeduct.toFixed(2)}`;
    }
    if (step.id === 'step3') {
      const ratio = parameters.euEtsPrice / (parameters.chinaCeaPrice / parameters.exchangeRate);
      return `${ratio.toFixed(1)}倍`;
    }
    if (step.id === 'step4') {
      return `${(parameters.freeAllocationFactor * 100).toFixed(1)}%`;
    }
    return step.label;
  };

  const getDynamicStepSubLabel = (step: StepDetail) => {
    if (step.id === 'step1') {
      return parameters.accountingError > 5.0 ? '超出5.0%合规红线' : '当前核算误差率';
    }
    if (step.id === 'step2') {
      return `中国碳价等价折抵值`;
    }
    if (step.id === 'step3') {
      return '中欧即时碳价差幅';
    }
    if (step.id === 'step4') {
      return `${parameters.freeAllocationYear}年免费配额阻阻`;
    }
    return step.subLabel;
  };

  return (
    <div className="space-y-6" id="cbam-steps-section">
      <div className="flex flex-col gap-1.5">
        <h3 className="text-slate-200 font-sans font-semibold text-lg flex items-center gap-2">
          <span>CBAM 碳价合规「四步走」核心控制指标</span>
          <span className="text-[10px] px-2 py-0.5 bg-sky-500/10 text-sky-400 border border-sky-500/15 rounded-full font-normal">点击卡片切换详情</span>
        </h3>
        <p className="text-slate-400 text-xs leading-relaxed">基于欧盟碳边境过渡规则，决定您产品对欧出口成本的核心考量支柱</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {STEPS_DATA.map((step) => {
          const isActive = effectiveActiveId === step.id;
          const dynamicValue = getDynamicStepValue(step);
          const dynamicSubLabel = getDynamicStepSubLabel(step);

          // Customize card border and styling states based on variables
          let cardBorderClass = "border-slate-800 hover:border-slate-700 bg-slate-900/60";
          let valueColorClass = "text-slate-100";
          
          if (isActive) {
            if (step.id === 'step1' && parameters.accountingError > 5.0) {
              cardBorderClass = "border-rose-500 bg-rose-950/20 shadow-lg shadow-rose-950/20";
              valueColorClass = "text-rose-400";
            } else if (step.id === 'step4') {
              cardBorderClass = "border-emerald-500 bg-emerald-950/20 shadow-lg shadow-emerald-950/15";
              valueColorClass = "text-emerald-400";
            } else if (step.id === 'step2') {
              cardBorderClass = "border-amber-500 bg-amber-950/20 shadow-lg shadow-amber-950/15";
              valueColorClass = "text-amber-400";
            } else {
              cardBorderClass = "border-sky-500 bg-sky-950/20 shadow-lg shadow-sky-950/15";
              valueColorClass = "text-sky-400";
            }
          } else {
            // Passive alerts
            if (step.id === 'step1' && parameters.accountingError > 5.0) {
              cardBorderClass = "border-rose-900/40 bg-slate-900/40 hover:border-rose-500/60";
            }
          }

          return (
            <div
              key={step.id}
              onClick={() => handleSelect(step.id)}
              className={`p-5 rounded-xl border cursor-pointer transition-all duration-300 relative group overflow-hidden ${cardBorderClass}`}
              id={`step-card-${step.id}`}
            >
              <div className="flex justify-between items-start mb-2.5">
                <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700/50 group-hover:text-slate-300">
                  {step.badge}
                </span>
                {step.id === 'step1' && parameters.accountingError > 5.0 ? (
                  <AlertCircle className="w-4 h-4 text-rose-400 animate-pulse" />
                ) : (
                  <CheckCircle2 className={`w-4 h-4 transition-colors ${isActive ? 'text-emerald-400' : 'text-slate-600 group-hover:text-slate-400'}`} />
                )}
              </div>

              {/* Huge Label */}
              <div className="mb-1 flex items-baseline gap-1.5 flex-wrap">
                <span className={`font-sans tracking-tight font-extrabold text-2xl lg:text-3.5xl transition-colors ${valueColorClass}`}>
                  {dynamicValue}
                </span>
                {step.id === 'step2' && (
                  <span className="text-[10px] text-slate-500 line-through">
                    €{(parameters.chinaCeaPrice / parameters.exchangeRate).toFixed(0)}起
                  </span>
                )}
              </div>

              {/* Sub-label */}
              <h4 className="font-sans font-medium text-xs text-slate-300 group-hover:text-slate-200 transition-colors">
                {dynamicSubLabel}
              </h4>

              {/* Subtle hover reveal indicator */}
              <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-500 group-hover:text-slate-400">
                <span>查看合规建议</span>
                {isActive ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </div>

              {/* Dynamic decorative backdrop glow */}
              <div 
                className="absolute -right-6 -bottom-6 w-16 h-16 rounded-full blur-2xl opacity-10 transition-opacity group-hover:opacity-20 pointer-events-none"
                style={{ backgroundColor: step.color }}
              />
            </div>
          );
        })}
      </div>

      {/* Expanded information panel for the selected step */}
      {(() => {
        const activeStep = STEPS_DATA.find(s => s.id === effectiveActiveId);
        if (!activeStep) return null;

        return (
          <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-5 md:p-6 transition-all animate-fadeIn" id="step-expanded-details">
            <div className="flex items-start gap-4 flex-col sm:flex-row">
              <div 
                className="p-3.5 rounded-xl border flex-shrink-0"
                style={{ 
                  backgroundColor: `${activeStep.color}15`, 
                  borderColor: `${activeStep.color}30`,
                  color: activeStep.color
                }}
              >
                <Info className="w-6 h-6" />
              </div>
              <div className="flex-1 space-y-3.5">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-2.5">
                  <div>
                    <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-widest block mb-0.5">
                      {activeStep.badge}支柱
                    </span>
                    <h4 className="font-sans font-bold text-slate-200 text-base">
                      {activeStep.subLabel} — 条款细则分析
                    </h4>
                  </div>
                  <span className="text-xs px-2.5 py-1 rounded bg-slate-800 text-slate-300 font-mono">
                    最新对应草案第 {activeStep.id === 'step1' ? '4(2)' : activeStep.id === 'step2' ? '9' : activeStep.id === 'step3' ? '21' : '31'} 条
                  </span>
                </div>

                <p className="text-slate-300 text-sm leading-relaxed font-sans font-light">
                  {activeStep.desc}
                </p>

                {/* Audit points checklist */}
                <div className="space-y-2.5">
                  <h5 className="text-slate-400 font-sans font-semibold text-xs tracking-wider uppercase">
                    应对合规清单 & 企业避税要点:
                  </h5>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {activeStep.details.map((detail, idx) => (
                      <div key={idx} className="bg-slate-950/40 border border-slate-800/30 p-3.5 rounded-lg flex items-start gap-2.5 text-xs text-slate-300 leading-relaxed font-light">
                        <span className="w-4.5 h-4.5 bg-sky-500/10 text-sky-400 rounded-full flex items-center justify-center font-mono font-medium text-[10px] mt-0.5 flex-shrink-0">
                          {idx + 1}
                        </span>
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
