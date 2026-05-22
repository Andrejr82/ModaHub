import { DestinationPage } from "@/components/DestinationPage";

export default function SizeGuidePage() {
  return (
    <DestinationPage
      eyebrow="Guia de medidas"
      title="Escolha o caimento certo antes de comprar"
      description="Uma área específica para orientar oversized, relaxed, cargo e bases mais ajustadas sem exigir que o cliente encontre isso no meio da home."
      highlights={[
        "Oversized: caimento amplo para visual street mais solto.",
        "Relaxed: mais espaço em quadril e perna sem exagero.",
        "Cargo: confira cintura e comprimento antes de fechar o pedido.",
        "Primeira troca grátis para reduzir risco na escolha do tamanho.",
      ]}
      ctaHref="/catalogo"
      ctaLabel="Ir para o catálogo"
    />
  );
}
