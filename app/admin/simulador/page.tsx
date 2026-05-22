"use client";

import { useState } from "react";
import { formatCurrency } from "@/lib/format";

export default function AdminSimulatorPage() {
  const [costEur, setCostEur] = useState<number>(20); // Preço unitário na fábrica
  const [quantity, setQuantity] = useState<number>(500); // Quantidade do Lote (para diluir o frete)
  const [eurRate, setEurRate] = useState<number>(5.50); // Cotação do Euro
  const [weightKg, setWeightKg] = useState<number>(0.5); // Peso unitário
  const [marginPct, setMarginPct] = useState<number>(50); // Margem de lucro desejada

  // Regras Fictícias (Mas realistas) de Frete Itália -> Brasil
  const freightRules = {
    seaLcl: { name: "Marítimo Fracionado (LCL)", rate: 1.50, min: 150, time: "30-50 dias", taxProfile: "formal" },
    seaFcl: { name: "Marítimo Container (FCL 20')", rate: 0, min: 2000, time: "30-50 dias", taxProfile: "formal" }, // Fixo em 2000 EUR
    air: { name: "Aéreo", rate: 6.50, min: 50, time: "7-10 dias", taxProfile: "formal" },
    courier: { name: "Remessa Expressa (Courier)", rate: 15.00, min: 30, time: "4-7 dias", taxProfile: "rts" }
  };

  function calculateModality(key: keyof typeof freightRules) {
    const rule = freightRules[key];
    
    // Totais do Lote
    const totalWeight = weightKg * quantity;
    const totalCostEur = costEur * quantity;

    // 1. Frete Total em EUR e conversão para BRL
    const freightEur = Math.max(rule.rate * totalWeight, rule.min);
    const productBrl = totalCostEur * eurRate;
    const freightBrl = freightEur * eurRate;
    
    // 2. Valor Aduaneiro (Base de Cálculo dos Impostos)
    const customsValue = productBrl + freightBrl;

    // 3. Impostos (Simulação)
    let taxes = 0;
    if (rule.taxProfile === "formal") {
      // Importação Formal (Roupas)
      const ii = customsValue * 0.35; // Imposto de Importação (35%)
      const ipi = (customsValue + ii) * 0.05; // IPI (5%)
      const pisCofins = customsValue * 0.1175; // PIS/COFINS (11.75%)
      const icmsBase = (customsValue + ii + ipi + pisCofins) / (1 - 0.18); // ICMS 18% "por dentro"
      const icms = icmsBase * 0.18;
      taxes = ii + ipi + pisCofins + icms;
    } else {
      // RTS - Regime de Tributação Simplificada (Courier)
      const ii = customsValue * 0.60; // Imposto Fixo (60%)
      const icmsBase = (customsValue + ii) / (1 - 0.17); // ICMS 17%
      const icms = icmsBase * 0.17;
      taxes = ii + icms;
    }

    // 4. Landed Cost (Custo Total da Mercadoria no Brasil)
    const landedCostTotal = customsValue + taxes;

    // 5. Rateios Unitários (A Visão do Gestor)
    const unitLandedCost = landedCostTotal / quantity;
    const unitFreightBrl = freightBrl / quantity;
    const unitTaxes = taxes / quantity;

    // 6. Precificação e ROI Unitário
    const unitSuggestedPrice = unitLandedCost / (1 - (marginPct / 100));
    const unitNetProfit = unitSuggestedPrice - unitLandedCost;
    const roi = (unitNetProfit / unitLandedCost) * 100;

    return {
      name: rule.name,
      time: rule.time,
      unitFreightBrl,
      unitTaxes,
      unitLandedCost,
      unitSuggestedPrice,
      unitNetProfit,
      roi
    };
  }

  const results = {
    seaLcl: calculateModality("seaLcl"),
    seaFcl: calculateModality("seaFcl"),
    air: calculateModality("air"),
    courier: calculateModality("courier"),
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black text-ink">Simulador de Importação (Itália)</h1>
        <p className="mt-1 text-sm text-neutral-600">Simule o Landed Cost e a formação de preço de venda (Markup) da sua coleção.</p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Entradas */}
        <div className="space-y-6 rounded-2xl border border-neutral-100 bg-white p-6 shadow-sm lg:col-span-3 h-fit">
          <h2 className="font-black text-ink">Variáveis de Custo</h2>
          
          <div>
            <label className="text-sm font-bold text-neutral-600">Custo Unitário na Fábrica (EUR)</label>
            <input type="number" step="0.01" value={costEur} onChange={e => setCostEur(Number(e.target.value))} className="mt-2 w-full rounded-xl border border-neutral-200 px-4 py-3 outline-none focus:border-clay" />
          </div>
          <div>
            <label className="text-sm font-bold text-neutral-600">Quantidade do Lote (Unids)</label>
            <input type="number" step="1" value={quantity} onChange={e => setQuantity(Number(e.target.value))} className="mt-2 w-full rounded-xl border border-neutral-200 px-4 py-3 outline-none focus:border-clay" />
            <p className="mt-1 text-xs text-neutral-500">Para diluir o frete base</p>
          </div>
          <div>
            <label className="text-sm font-bold text-neutral-600">Peso Unitário Estimado (Kg)</label>
            <input type="number" step="0.1" value={weightKg} onChange={e => setWeightKg(Number(e.target.value))} className="mt-2 w-full rounded-xl border border-neutral-200 px-4 py-3 outline-none focus:border-clay" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="text-sm font-bold text-neutral-600">Cotação EUR (R$)</label>
              <input type="number" step="0.01" value={eurRate} onChange={e => setEurRate(Number(e.target.value))} className="mt-2 w-full rounded-xl border border-neutral-200 px-4 py-3 outline-none focus:border-clay" />
            </div>
          </div>
          <div className="pt-4 border-t border-neutral-100">
            <label className="text-sm font-bold text-neutral-600">Margem de Lucro Desejada (%)</label>
            <input type="number" value={marginPct} onChange={e => setMarginPct(Number(e.target.value))} className="mt-2 w-full rounded-xl border border-neutral-200 px-4 py-3 font-black text-clay outline-none focus:border-clay" />
          </div>
        </div>

        {/* Saídas */}
        <div className="lg:col-span-9 space-y-6">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {[results.seaLcl, results.seaFcl, results.air, results.courier].map((res) => (
              <div key={res.name} className="flex flex-col justify-between rounded-2xl border border-neutral-100 bg-white p-6 shadow-sm">
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-widest text-clay">{res.name}</h3>
                  <p className="mt-1 text-xs text-neutral-500">Transit Time: {res.time}</p>
                  
                  <div className="mt-6 space-y-3 border-t border-neutral-100 pt-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-neutral-500">Frete Unitário</span>
                      <span className="font-semibold text-ink">{formatCurrency(res.unitFreightBrl)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-500">Impostos Unitário</span>
                      <span className="font-semibold text-red-600">{formatCurrency(res.unitTaxes)}</span>
                    </div>
                    <div className="flex justify-between border-t border-neutral-100 pt-3">
                      <span className="font-bold text-ink">Custo da Peça</span>
                      <span className="font-black text-ink">{formatCurrency(res.unitLandedCost)}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 rounded-xl bg-neutral-50 p-4 border border-neutral-100">
                  <p className="text-xs font-bold uppercase text-neutral-500">Venda Por Peça</p>
                  <p className="mt-1 text-2xl font-black text-emerald-700">{formatCurrency(res.unitSuggestedPrice)}</p>
                  <div className="mt-3 flex justify-between text-xs font-semibold">
                    <span className="text-neutral-600">Lucro: {formatCurrency(res.unitNetProfit)}</span>
                    <span className="text-emerald-700">ROI: {res.roi.toFixed(0)}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6 text-sm text-amber-900">
            <h4 className="font-bold">Insight de Negócio</h4>
            <p className="mt-2">
              Se o Peso for muito baixo (ex: 0.5kg), o <strong>Marítimo e o Aéreo</strong> sofrem com a "Taxa Mínima" de frete, 
              fazendo com que a peça fique absurdamente cara. Nesses casos de amostra, o <strong>Courier</strong> é ideal.
              <br/><br/>
              No entanto, se você aumentar o peso para <strong>100kg (uma coleção inteira)</strong>, o Marítimo se tornará disparado a opção mais lucrativa, elevando drasticamente o ROI. Teste mudar o peso para 100kg!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
