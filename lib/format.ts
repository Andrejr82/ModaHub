export const FREE_SHIPPING_THRESHOLD = 299;

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);
}

export function calculateDiscountPercentage(price: number, oldPrice?: number): number {
  if (!oldPrice || oldPrice <= price) return 0;
  return Math.round(((oldPrice - price) / oldPrice) * 100);
}

export function calculateInstallmentValue(price: number, installments: number): number {
  if (installments <= 1) return price;
  return price / installments;
}

export function getStockLabel(stock: number): string {
  if (stock <= 0) return "Esgotado";
  if (stock <= 5) return stock === 1 ? "Última unidade" : "Últimas unidades";
  return `${stock} em estoque`;
}

export function getFreeShippingProgress(subtotal: number, threshold = FREE_SHIPPING_THRESHOLD) {
  const remaining = Math.max(threshold - subtotal, 0);
  const percentage = Math.min((subtotal / threshold) * 100, 100);
  return {
    remaining,
    percentage,
    hasFreeShipping: remaining === 0,
    message: remaining === 0 ? "Você ganhou frete grátis" : `Faltam ${formatCurrency(remaining)} para você ganhar frete grátis`,
  };
}
