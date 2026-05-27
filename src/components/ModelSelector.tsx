import { FREE_ALLOCATION_SHEDULE } from '../data/cbamData';
import { CBAMParameters } from '../types';
import { Sliders, Calendar, Euro, ShieldAlert, BadgeCent } from 'lucide-react';

interface ModelSelectorProps {
  parameters: CBAMParameters;
  onChange: (updates: Partial<CBAMParameters>) => void;
}

export default function ModelSelector({ parameters, onChange }: ModelSelectorProps) {
  const currentSchedule = FREE_ALLOCATION_SHEDULE.find(s => s.year === parameters.freeAllocationYear) 
    || FREE_ALLOCATION_SHEDULE[0];

  const handleYearChange = (year: number) => {
    const selected = FREE_ALLOCATION_SHEDULE.find(s => s.year === year);
    if (selected) {
      onChange({
        freeAllocationYear: year,
        freeAllocationFactor: selected.factor
      });
    }
  };

  const isDivergentWarning = parameters.accountingError > 5.0;

  return (
    <div className="bg-slate-900 border border-slate-800 text-slate-100 rounded-2xl p-6 shadow-2xl flex flex-col gap-6" id="cbam-model-selector">
      <div className="flex items-center gap-2.5 border-b border-slate-800 pb-4">
        <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg">
          <Sliders className="w-5 h-5" />
        </div>
        <div>
          <h2 className="font-sans font-semibold text-lg text-slate-200">全局传导参数设定</h2>
          <p className="font-sans text-xs text-slate-400">设定中欧双边碳成本与合规偏差指标</p>
        </div>
      </div>

      {/* EU Carbon Price */}
      <div className="space-y-2">
        <div className="flex justify-between items-center text-sm">
          <label className="text-slate-300 font-medium flex items-center gap-1.5">
            <Euro className="w-4 h-4 text-sky-400" />
            欧盟碳价 (EU ETS Price)
          </label>
          <span className="font-mono text-sky-400 font-semibold text-base">
            €{parameters.euEtsPrice.toFixed(2)} <span className="text-xs text-slate-500">/吨</span>
          </span>
        </div>
        <input
          type="range"
          min="40"
          max="150"
          step="1"
          value={parameters.euEtsPrice}
          onChange={(e) => onChange({ euEtsPrice: parseFloat(e.target.value) })}
          className="w-full accent-sky-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-slate-500 font-mono">
          <span>低位 €40</span>
          <span>当前均值 ~€80</span>
          <span>高位 €150</span>
        </div>
      </div>

      {/* China CEA Price */}
      <div className="space-y-2">
        <div className="flex justify-between items-center text-sm">
          <label className="text-slate-300 font-medium flex items-center gap-1.5">
            <BadgeCent className="w-4 h-4 text-emerald-400" />
            中国碳价 (CEA Price)
          </label>
          <span className="font-mono text-emerald-400 font-semibold text-base">
            ¥{parameters.chinaCeaPrice.toFixed(0)}{' '}
            <span className="text-xs text-slate-400">
              (≈ €{(parameters.chinaCeaPrice / parameters.exchangeRate).toFixed(2)})
            </span>
          </span>
        </div>
        <input
          type="range"
          min="40"
          max="220"
          step="1.5"
          value={parameters.chinaCeaPrice}
          onChange={(e) => onChange({ chinaCeaPrice: parseFloat(e.target.value) })}
          className="w-full accent-emerald-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-slate-500 font-mono">
          <span>现款均价 ¥40</span>
          <span>预估2026合规 ¥120</span>
          <span>远期预测 ¥220</span>
        </div>
      </div>

      {/* Exchange Rate */}
      <div className="pt-2 border-t border-slate-800/50 space-y-1 bg-slate-950/40 p-3 rounded-lg">
        <div className="flex justify-between text-xs text-slate-400">
          <span>汇率折算 (EUR/CNY)</span>
          <span className="font-mono text-slate-200">1 EUR = {parameters.exchangeRate} CNY</span>
        </div>
        <div className="flex justify-between text-xs text-slate-400">
          <span>欧盟当前免费配额储备</span>
          <span className="font-mono text-amber-400 font-medium">
            {(parameters.freeAllocationFactor * 100).toFixed(1)}%
          </span>
        </div>
      </div>

      {/* Implementation Timeline */}
      <div className="space-y-2">
        <div className="flex justify-between items-center text-sm">
          <label className="text-slate-300 font-medium flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-amber-400" />
            CBAM 征收爬坡年度
          </label>
          <span className="font-sans font-semibold text-amber-400 text-sm">
            {currentSchedule.year} 年
          </span>
        </div>
        <input
          type="range"
          min="2026"
          max="2034"
          step="1"
          value={parameters.freeAllocationYear}
          onChange={(e) => handleYearChange(parseInt(e.target.value))}
          className="w-full accent-amber-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
        />
        <div className="grid grid-cols-5 text-[9px] text-slate-500 font-mono text-center">
          <span>2026</span>
          <span>2028</span>
          <span>2030</span>
          <span>2032</span>
          <span>2034</span>
        </div>
        <p className="text-[11px] text-slate-400 leading-normal bg-amber-500/5 border border-amber-500/10 p-2.5 rounded-lg">
          <strong className="text-amber-400">爬坡机制：</strong>
          欧方免费配额因子降至 <span className="text-slate-100 font-mono">{(parameters.freeAllocationFactor * 100).toFixed(1)}%</span>。
          实际应缴CBAM比例上升至 <span className="text-slate-100 font-semibold font-mono">{((1 - parameters.freeAllocationFactor)*100).toFixed(1)}%</span>。
        </p>
      </div>

      {/* Accounting Error Rate */}
      <div className="space-y-2 pt-2 border-t border-slate-800/50">
        <div className="flex justify-between items-center text-sm">
          <label className="text-slate-300 font-medium flex items-center gap-1.5">
            <ShieldAlert className="w-4 h-4 text-rose-400" />
            产品级数据核算误差值
          </label>
          <span className={`font-mono font-semibold text-sm ${isDivergentWarning ? 'text-rose-400' : 'text-slate-300'}`}>
            {parameters.accountingError.toFixed(1)}%
          </span>
        </div>
        <input
          type="range"
          min="0.5"
          max="10.0"
          step="0.1"
          value={parameters.accountingError}
          onChange={(e) => {
            const val = parseFloat(e.target.value);
            onChange({
              accountingError: val,
              applyPunitiveDefault: val > 5.0
            });
          }}
          className={`w-full h-1.5 bg-slate-800 rounded-lg cursor-pointer ${isDivergentWarning ? 'accent-rose-500' : 'accent-sky-500'}`}
        />
        <div className="flex justify-between text-[10px] text-slate-500 font-mono">
          <span>精细核算 0.5%</span>
          <span className="text-slate-400 font-medium">合规红线 5.0%</span>
          <span>严重偏离 10.0%</span>
        </div>

        {isDivergentWarning && (
          <div className="bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs p-3 rounded-lg leading-relaxed animate-pulse">
            <div className="font-semibold flex items-center gap-1 mb-0.5">
              <span>⚠️ 警告：核算误差已触碰 5% 欧盟红线</span>
            </div>
            欧盟官方核查审计将判定数据违规，强制推行<strong>【惩罚性缺省高碳值】</strong>核定，碳强度将增加 <strong>20%</strong> 计算！
          </div>
        )}
      </div>
    </div>
  );
}
