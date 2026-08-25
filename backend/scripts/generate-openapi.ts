import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from '../src/app.module';

async function generate() {
  const app = await NestFactory.create(AppModule, { logger: false });
  const config = new DocumentBuilder()
    .setTitle('ALPACART API')
    .setDescription('API Backend de Alpacart — Marca premium de alpaca peruana')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  // Write JSON
  const fs = require('fs');
  const path = require('path');
  const dir = path.resolve(__dirname, '../docs/openapi');
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'openapi.json'), JSON.stringify(document, null, 2));

  // Try to write YAML using js-yaml if available
  try {
    const yaml = require('js-yaml');
    fs.writeFileSync(path.join(dir, 'openapi.yaml'), yaml.dump(document, { lineWidth: 120 }));
    console.log('OpenAPI spec written to docs/openapi/ (JSON + YAML)');
  } catch {
    console.log('OpenAPI JSON written to docs/openapi/openapi.json (js-yaml not available for YAML)');
  }

  await app.close();
}

generate().catch((err) => {
  console.error('Failed to generate OpenAPI spec:', err.message);
  process.exit(1);
});
