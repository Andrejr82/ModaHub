import { createClient } from "@/utils/supabase/server";
import { DashboardClient } from "./DashboardClient";
import { products } from "@/data/products";

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  // Buscar todos os pedidos
  const { data: orders } = await supabase
    .from("orders")
    .select("*, order_items(*)")
    .order("created_at", { ascending: true }); // Crescente para o gráfico cronológico

  const safeOrders = orders || [];

  // 1. Calcular KPIs
  const totalOrders = safeOrders.length;
  const totalRevenue = safeOrders.reduce((acc, order) => acc + Number(order.total), 0);
  const averageTicket = totalOrders > 0 ? totalRevenue / totalOrders : 0;

  // 2. Agrupar vendas por dia para o Gráfico
  const salesByDate: Record<string, number> = {};
  safeOrders.forEach(order => {
    const date = new Date(order.created_at).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });
    if (!salesByDate[date]) salesByDate[date] = 0;
    salesByDate[date] += Number(order.total);
  });

  const chartData = Object.keys(salesByDate).map(date => ({
    name: date,
    Vendas: salesByDate[date]
  }));

  // 3. Calcular Best-Sellers Reais
  const productSalesCount: Record<string, number> = {};
  safeOrders.forEach(order => {
    order.order_items.forEach((item: any) => {
      if (!productSalesCount[item.product_id]) productSalesCount[item.product_id] = 0;
      productSalesCount[item.product_id] += item.quantity;
    });
  });

  const bestSellers = Object.keys(productSalesCount)
    .map(productId => {
      const p = products.find(prod => prod.id === productId);
      return {
        id: productId,
        name: p?.name || "Produto Desconhecido",
        brand: p?.brand || "",
        image: p?.image || "",
        totalSold: productSalesCount[productId]
      };
    })
    .sort((a, b) => b.totalSold - a.totalSold)
    .slice(0, 5); // Top 5

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black text-ink">Dashboard de Vendas</h1>
        <p className="mt-1 text-sm text-neutral-600">Visão geral do faturamento e performance da loja.</p>
      </div>
      
      <DashboardClient 
        kpis={{ totalOrders, totalRevenue, averageTicket }}
        chartData={chartData}
        bestSellers={bestSellers}
      />
    </div>
  );
}
