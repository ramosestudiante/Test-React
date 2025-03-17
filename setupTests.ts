import '@testing-library/jest-dom'; // Asegúrate de que esta línea esté presente

// Importar TextEncoder y TextDecoder de 'util'
import { TextEncoder, TextDecoder } from 'util';

// Asignación global con aserción de tipo para evitar conflictos de tipos
global.TextEncoder = TextEncoder as unknown as typeof globalThis.TextEncoder;
global.TextDecoder = TextDecoder as unknown as typeof globalThis.TextDecoder;
