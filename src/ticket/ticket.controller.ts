import { Controller } from '@nestjs/common';
import { GrpcMethod, GrpcStreamMethod, Payload } from '@nestjs/microservices';
import { TicketService } from './ticket.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { Observable, Subject } from 'rxjs';

@Controller()
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @GrpcMethod('TicketService')
  async createTicket(@Payload() createTicketDto: CreateTicketDto) {
    return this.ticketService.create(createTicketDto);
  }

  @GrpcStreamMethod('TicketService')
  async bidiHello(messages: Observable<any>) {
    const subject = new Subject();

    const onNext = (message) => {
      console.log(message);
      subject.complete();
    };
    const onComplete = () => subject.complete();
    messages.subscribe({
      next: onNext,
      complete: onComplete,
    });

    const object = subject.asObservable();
    console.log(object);
    return this.ticketService.bidiHello(object);
  }

  @GrpcStreamMethod('TicketService')
  async uploadFile(files: Observable<any>) {
    console.log(`Entrando aqui dentro `);
    const subject = new Subject();

    const onNext = async (fileChunk) => {
      const buffer = fileChunk.chunkData;
      const filename = fileChunk.filename; // Acessando a propriedade filename corretamente
      const response = await this.ticketService.uploadFile(buffer, filename);
      subject.next(response);
    };

    const onComplete = () => subject.complete();

    files.subscribe({
      next: onNext,
      complete: onComplete,
    });

    return subject.asObservable();
  }
}
