'use client';

import { useState } from 'react';
import type { Product } from '@/types/product';
import { formatCurrency } from '@/lib/format';
import { updateProduct } from './actions';

export function ProductListClient({ products }: { products: Product[] }) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  async function handleSave(e: React.FormEvent<HTMLFormElement>, id: string) {
    e.preventDefault();
    setLoadingId(id);
    
    const formData = new FormData(e.currentTarget);
    formData.append('id', id);

    await updateProduct(formData);
    
    setEditingId(null);
    setLoadingId(null);
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm text-neutral-600">
        <thead className="bg-neutral-50 text-xs uppercase text-neutral-500 font-bold border-b border-neutral-200">
          <tr>
            <th className="px-6 py-4">Produto</th>
            <th className="px-6 py-4">Categoria</th>
            <th className="px-6 py-4">Estoque</th>
            <th className="px-6 py-4">Preço (R$)</th>
            <th className="px-6 py-4 text-right">Ações</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-100 bg-white">
          {products.map((product) => {
            const isEditing = editingId === product.id;
            const isLoading = loadingId === product.id;

            if (isEditing) {
              return (
                <tr key={product.id} className="bg-amber-50/50">
                  <td colSpan={5} className="px-6 py-4">
                    <form onSubmit={(e) => handleSave(e, product.id)} className="flex items-center gap-4">
                      <div className="flex-1">
                        <label className="text-xs font-bold text-neutral-500">Nome</label>
                        <input name="name" defaultValue={product.name} required className="w-full mt-1 border-neutral-300 rounded-md px-3 py-1.5" />
                      </div>
                      <div className="w-32">
                        <label className="text-xs font-bold text-neutral-500">Categoria</label>
                        <input name="category" defaultValue={product.category} required className="w-full mt-1 border-neutral-300 rounded-md px-3 py-1.5" />
                      </div>
                      <div className="w-24">
                        <label className="text-xs font-bold text-neutral-500">Estoque</label>
                        <input name="stock" type="number" defaultValue={product.stock || 0} required className="w-full mt-1 border-neutral-300 rounded-md px-3 py-1.5" />
                      </div>
                      <div className="w-32">
                        <label className="text-xs font-bold text-neutral-500">Preço</label>
                        <input name="price" type="number" step="0.01" defaultValue={product.price} required className="w-full mt-1 border-neutral-300 rounded-md px-3 py-1.5" />
                      </div>
                      <div className="pt-5 flex gap-2">
                        <button type="button" onClick={() => setEditingId(null)} className="px-4 py-2 text-neutral-500 font-semibold hover:bg-neutral-100 rounded-lg">Cancelar</button>
                        <button type="submit" disabled={isLoading} className="px-4 py-2 bg-clay text-white font-bold rounded-lg shadow-sm">
                          {isLoading ? 'Salvando...' : 'Salvar'}
                        </button>
                      </div>
                    </form>
                  </td>
                </tr>
              );
            }

            return (
              <tr key={product.id} className="hover:bg-neutral-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-neutral-100 border border-neutral-200">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
                    </div>
                    <div>
                      <div className="font-bold text-ink">{product.name}</div>
                      <div className="text-xs text-neutral-400">ID: {product.id}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 font-medium">{product.category}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-bold ${product.stock && product.stock > 0 ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'}`}>
                    {product.stock || 0} unids
                  </span>
                </td>
                <td className="px-6 py-4 font-black text-ink">{formatCurrency(product.price)}</td>
                <td className="px-6 py-4 text-right">
                  <button 
                    onClick={() => setEditingId(product.id)}
                    className="text-clay font-bold hover:underline"
                  >
                    Editar
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
