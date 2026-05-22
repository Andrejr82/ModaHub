"use client";

import { useState } from "react";
import { formatCurrency } from "@/lib/format";
import { updateOrderStatus } from "./actions";

export function OrderListClient({ initialOrders }: { initialOrders: any[] }) {
  const [orders, setOrders] = useState(initialOrders);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  async function handleStatusChange(orderId: string, newStatus: string) {
    setUpdatingId(orderId);
    try {
      await updateOrderStatus(orderId, newStatus);
      // Atualiza estado local para refletir rápido
      setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    } catch (err) {
      alert("Erro ao atualizar status.");
    } finally {
      setUpdatingId(null);
    }
  }

  const statusColors: Record<string, string> = {
    pending: "bg-amber-100 text-amber-800",
    paid: "bg-emerald-100 text-emerald-800",
    shipped: "bg-blue-100 text-blue-800",
    delivered: "bg-neutral-200 text-neutral-800",
    cancelled: "bg-red-100 text-red-800",
  };

  const statusLabels: Record<string, string> = {
    pending: "Pendente",
    paid: "Pago",
    shipped: "Enviado",
    delivered: "Entregue",
    cancelled: "Cancelado",
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm text-neutral-600">
        <thead className="bg-neutral-50 text-xs font-bold uppercase text-neutral-500">
          <tr>
            <th className="px-6 py-4">ID / Data</th>
            <th className="px-6 py-4">Cliente</th>
            <th className="px-6 py-4">Itens</th>
            <th className="px-6 py-4">Total</th>
            <th className="px-6 py-4">Status</th>
            <th className="px-6 py-4 text-right">Ação</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-100">
          {orders.map((order) => (
            <tr key={order.id} className="hover:bg-neutral-50">
              <td className="px-6 py-4">
                <span className="font-bold text-ink">{order.id.split('-')[0].toUpperCase()}</span>
                <br />
                <span className="text-xs text-neutral-400">{new Date(order.created_at).toLocaleDateString('pt-BR')}</span>
              </td>
              <td className="px-6 py-4">
                <span className="font-semibold text-ink">{order.profiles?.full_name}</span>
                <br />
                <span className="text-xs text-neutral-500">{order.addresses?.city} - {order.addresses?.state}</span>
              </td>
              <td className="px-6 py-4 font-medium text-ink">
                {order.order_items?.length} peça(s)
              </td>
              <td className="px-6 py-4 font-black text-clay">
                {formatCurrency(order.total)}
              </td>
              <td className="px-6 py-4">
                <span className={`rounded-full px-2.5 py-1 text-xs font-bold uppercase tracking-wider ${statusColors[order.status]}`}>
                  {statusLabels[order.status]}
                </span>
              </td>
              <td className="px-6 py-4 text-right">
                <select 
                  className="rounded-lg border border-neutral-300 bg-white px-3 py-1.5 text-xs font-bold text-ink outline-none transition focus:border-clay disabled:opacity-50"
                  value={order.status}
                  disabled={updatingId === order.id}
                  onChange={(e) => handleStatusChange(order.id, e.target.value)}
                >
                  <option value="pending">Pendente</option>
                  <option value="paid">Pago</option>
                  <option value="shipped">Enviado</option>
                  <option value="delivered">Entregue</option>
                  <option value="cancelled">Cancelado</option>
                </select>
              </td>
            </tr>
          ))}
          {orders.length === 0 && (
            <tr>
              <td colSpan={6} className="px-6 py-8 text-center text-neutral-500">
                Nenhum pedido encontrado.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
