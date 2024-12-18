function getBrightness(hexColor) {
  // Convertir el valor hexadecimal a RGB
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);

  // Calcular el brillo usando la fórmula de luminosidad relativa
  return r * 0.299 + g * 0.587 + b * 0.114;
}

// PARA OBTENER EL COLOR DEL TEXTO
export default function getTextColor(hexColor) {
  const brightness = getBrightness(hexColor);
  // Si el brillo es menor que 128, el color de fondo es oscuro, y el texto debe ser blanco
  return brightness < 128 ? "#FFFFFF" : "#000000";
}

// PARA OBTENER EL COLOR DEL TITULO
function adjustColor(hexColor, amount) {
  // Convertir el color hexadecimal a RGB
  let r = parseInt(hexColor.slice(1, 3), 16);
  let g = parseInt(hexColor.slice(3, 5), 16);
  let b = parseInt(hexColor.slice(5, 7), 16);

  // Ajustar los canales de color
  r = Math.min(255, Math.max(0, r + amount));
  g = Math.min(255, Math.max(0, g + amount));
  b = Math.min(255, Math.max(0, b + amount));

  // Convertir de vuelta a hexadecimal
  return `#${((1 << 24) + (r << 16) + (g << 8) + b)
    .toString(16)
    .slice(1)
    .toUpperCase()}`;
}

export function getTitleColor(hexColor) {
  const textColor = getTextColor(hexColor); // Obtén el color principal del texto
  const isLightText = textColor === "#FFFFFF"; // ¿El texto es claro?

  // Ajustar el color del texto principal para generar el color del título
  const adjustment = isLightText ? -170 : 170; // Oscurecer o aclarar
  return adjustColor(textColor, adjustment);
}
