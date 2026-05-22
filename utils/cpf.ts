/**
 * Remove todos os caracteres não numéricos do CPF
 */
export function cleanCPF(cpf: string): string {
  return cpf.replace(/\D/g, "");
}

/**
 * Valida o CPF através do cálculo de dígitos verificadores
 */
export function isValidCPF(cpf: string): boolean {
  const clean = cleanCPF(cpf);

  if (clean.length !== 11) return false;

  // Rejeita CPFs com todos os números iguais (ex: 111.111.111-11)
  if (/^(\d)\1+$/.test(clean)) return false;

  let sum = 0;
  let remainder;

  // Validação do primeiro dígito
  for (let i = 1; i <= 9; i++) {
    sum += parseInt(clean.substring(i - 1, i)) * (11 - i);
  }
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(clean.substring(9, 10))) return false;

  sum = 0;
  // Validação do segundo dígito
  for (let i = 1; i <= 10; i++) {
    sum += parseInt(clean.substring(i - 1, i)) * (12 - i);
  }
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(clean.substring(10, 11))) return false;

  return true;
}

/**
 * Formata um CPF no padrão 000.000.000-00
 */
export function formatCPF(cpf: string): string {
  const clean = cleanCPF(cpf);
  return clean
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}
