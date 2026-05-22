"use client";

import { formatCurrency } from "@/lib/format";
import Image from "next/image";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface DashboardClientProps {
  kpis: {
    totalOrders: number;
    totalRevenue: number;
    averageTicket: number;
  };
  chartData: any[];
  bestSellers: any[];
}

export function DashboardClient({ kpis, chartData, bestSellers }: DashboardClientProps) {
  // Se não houver dados no gráfico, criamos um mock visual bonito
  const displayChartData = chartData.length > 0 ? chartData : [
    { name: "Hoje", Vendas: 0 }
  ];

  return (
    <div className="space-y-8">
      {/* 1. KPIs */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-neutral-100 bg-white p-6 shadow-sm">
          <p className="text-sm font-bold uppercase tracking-widest text-neutral-500">Faturamento Total</p>
          <p className="mt-2 text-3xl font-black text-clay">{formatCurrency(kpis.totalRevenue)}</p>
        </div>
        <div className="rounded-2xl border border-neutral-100 bg-white p-6 shadow-sm">
          <p className="text-sm font-bold uppercase tracking-widest text-neutral-500">Pedidos Recebidos</p>
          <p className="mt-2 text-3xl font-black text-ink">{kpis.totalOrders}</p>
        </div>
        <div className="rounded-2xl border border-neutral-100 bg-white p-6 shadow-sm">
          <p className="text-sm font-bold uppercase tracking-widest text-neutral-500">Ticket Médio</p>
          <p className="mt-2 text-3xl font-black text-ink">{formatCurrency(kpis.averageTicket)}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* 2. Gráfico */}
        <div className="rounded-2xl border border-neutral-100 bg-white p-6 shadow-sm lg:col-span-2">
          <h2 className="mb-6 text-lg font-black text-ink">Receita por Dia</h2>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={displayChartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorVendas" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6F4B3A" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6F4B3A" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="#a3a3a3" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis 
                  stroke="#a3a3a3" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                  tickFormatter={(value) => `R$ ${value}`}
                />
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f5f5f5" />
                <Tooltip 
                  formatter={(value: any) => [formatCurrency(Number(value) || 0), "Faturamento"]}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Area type="monotone" dataKey="Vendas" stroke="#6F4B3A" strokeWidth={3} fillOpacity={1} fill="url(#colorVendas)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 3. Best Sellers */}
        <div className="rounded-2xl border border-neutral-100 bg-white p-6 shadow-sm">
          <h2 className="mb-6 text-lg font-black text-ink">Top Produtos</h2>
          {bestSellers.length === 0 ? (
            <p className="text-sm text-neutral-500">Nenhuma venda registrada ainda.</p>
          ) : (
            <div className="flex flex-col gap-4">
              {bestSellers.map((product, index) => (
                <div key={product.id} className="flex items-center gap-4 border-b border-neutral-50 pb-4 last:border-0 last:pb-0">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sand text-xs font-bold text-clay">
                    {index + 1}
                  </div>
                  <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-neutral-100 bg-neutral-50">
                    {product.image && !product.image.startsWith("gradient://") && (
                      <Image src={product.image} alt={product.name} fill className="object-cover" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold text-ink">{product.name}</p>
                    <p className="truncate text-xs text-neutral-500">{product.brand}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-black text-ink">{product.totalSold}</p>
                    <p className="text-[10px] uppercase text-neutral-400">unids</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
