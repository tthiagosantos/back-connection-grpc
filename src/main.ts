import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { TicketModule } from './ticket/ticket.module';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    TicketModule,
    {
      transport: Transport.GRPC,
      options: {
        package: 'poc',
        protoPath: [join(__dirname, 'ticket', 'proto', 'ticket.proto')],
        url: '0.0.0.0:5000',
      },
    },
  );

  await app.listen();
}

bootstrap();
