import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "AIzaSyCJBD0mvr-2Ja261IjYT1TBkhxRydc3vUQ";
const genAI = new GoogleGenerativeAI(API_KEY);

function validarPlato(plato) {
  const texto = plato.toLowerCase().trim();
  
  const noComidas = [
    'hola', 'adiós', 'gracias', 'por favor', 'ayuda', 'qué', 'cómo',
    'cuándo', 'dónde', 'por qué', 'quién', 'puedes', 'podrías',
    // Nombres comunes
    'carlos', 'maria', 'juan', 'ana', 'luis', 'laura', 'pedro', 'sofia',
    'david', 'elena', 'miguel', 'isabel', 'jose', 'carmen', 'francisco',
    'antonio', 'javier', 'dolores', 'teresa', 'manuel', 'paula', 'daniel',
    // Palabras aleatorias
    'nada', 'algo', 'todo', 'nadie', 'alguien', 'si', 'no', 'ok', 'vale'
  ];

  const palabrasComida = [
    // Platos
    'pizza', 'pasta', 'ensalada', 'sopa', 'arroz', 'pollo', 'carne', 'pescado',
    'hamburguesa', 'sandwich', 'taco', 'burrito', 'sushi', 'lasaña', 'paella',
    'curry', 'estofado', 'guiso', 'asado', 'parrilla', 'filete', 'costilla',
    'albóndiga', 'empanada', 'arepa', 'tamal', 'ceviche', 'tiradito',
    // Ingredientes
    'tomate', 'cebolla', 'ajo', 'pimiento', 'zanahoria', 'papa', 'patata',
    'lechuga', 'espinaca', 'brócoli', 'coliflor', 'calabacín', 'berenjena',
    'pasta', 'arroz', 'quinoa', 'lentejas', 'garbanzos', 'frijoles', 'maíz',
    'pollo', 'res', 'cerdo', 'pescado', 'camarón', 'salmón', 'atún', 'trucha',
    'huevo', 'leche', 'queso', 'yogur', 'mantequilla', 'crema', 'nata',
    // Postres
    'pastel', 'torta', 'galleta', 'brownie', 'helado', 'flan', 'pay', 'tarta',
    'gelatina', 'chocolate', 'dulce', 'postre', 'budín', 'mousse', 'crepe',
    // Bebidas
    'jugo', 'batido', 'licuado', 'smoothie', 'café', 'té', 'infusión',
    // Tipos de comida
    'desayuno', 'almuerzo', 'cena', 'merienda', 'aperitivo', 'entrada',
    'plato principal', 'acompañamiento', 'guarnición'
  ];

  if (noComidas.includes(texto)) {
    return false;
  }

  const contieneComida = palabrasComida.some(palabra => 
    texto.includes(palabra)
  );

  const esMuyCorto = texto.length < 4;
  const esNombrePersona = texto.split(' ').length <= 2 && 
                          /^[a-záéíóúñ\s]+$/.test(texto) && 
                          !contieneComida;

  return !esMuyCorto && !esNombrePersona && (contieneComida || texto.length > 10);
}

export async function generarReceta(plato) {
  if (!validarPlato(plato)) {
    return `😒 ¿"${plato}"? Eso no es comida. Escribe algo que realmente se pueda cocinar.`;
  }

  const prompt = `
Eres un chef pasivo-agresivo.
Quiero una receta larga y clara para "${plato}".
Condiciones:
- 4 a 5 pasos
- 120 a 180 palabras
- Tono sarcástico, molesto y cómico
- Formato claro y fácil de leer
- Nada de repetición innecesaria.
  `.trim();

  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash"
    });

    const result = await model.generateContent(prompt);
    const texto = result.response.text().trim();

    return texto;

  } catch (error) {
    console.error("Error generando receta:", error);
    return `Bueno… como falló todo, junta lo que tengas y cocínalo. Y la próxima vez escribe un plato de verdad.`;
  }
}