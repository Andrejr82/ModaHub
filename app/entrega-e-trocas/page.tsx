import { DestinationPage } from "@/components/DestinationPage";

export default function ShippingReturnsPage() {
  return (
    <DestinationPage
      eyebrow="Entrega e trocas"
      title="Frete, prazos e primeira troca em uma área direta"
      description="O cliente encontra as políticas comerciais principais sem percorrer blocos longos da página inicial."
      highlights={[
        "Frete grátis acima de R$299 para pedidos elegíveis.",
        "Prazo simulado por CEP no carrinho para apoiar a decisão.",
        "Primeira troca grátis como sinal de confiança.",
        "Seleção limitada e estoque visível para reduzir dúvida na compra.",
      ]}
      ctaHref="/catalogo?discount=1"
      ctaLabel="Ver peças com oferta"
    />
  );
}
