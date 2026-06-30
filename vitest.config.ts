import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./test-setup.ts'],
include: [
  'src/app/pages/registro/registro.spec.ts',
  'src/app/pages/modificar-perfil/modificar-perfil.spec.ts']
  },
});
