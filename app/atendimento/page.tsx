import { DestinationPage } from "@/components/DestinationPage";

export default function SupportPage() {
  return (
    <DestinationPage
      eyebrow="Atendimento"
      title="Ajuda rápida para medida, frete e montagem de look"
      description="Uma área específica de suporte para o cliente encontrar os pontos essenciais antes de voltar para a compra."
      highlights={[
        "WhatsApp fictício para dúvidas rápidas sobre produto e tamanho.",
        "Apoio para combinar peças e montar look completo.",
        "Resumo comercial objetivo: troca, frete, parcelamento e estoque.",
        "Direcionamento direto para catálogo ou sale conforme a intenção do cliente.",
      ]}
      ctaHref="/catalogo?sort=best-sellers"
      ctaLabel="Abrir mais vendidos"
    />
  );
}
