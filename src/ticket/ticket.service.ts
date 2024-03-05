import { Injectable } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { Observable, interval, Subject } from 'rxjs';
import { map, take } from 'rxjs/operators';
import * as fs from 'fs';

@Injectable()
export class TicketService {
  create(createTicketDto: CreateTicketDto) {
    console.table({
      ...createTicketDto,
      status: 'PENDING',
    });
    return {
      ...createTicketDto,
      status: 'PENDING',
    };
  }

  bidiHello(object: any): Observable<CreateTicketDto> {
    const responses: CreateTicketDto[] = [
      {
        name: 'John',
        email: 'john@example.com',
        ticket: 'Issue #123',
      },
      {
        name: 'Jane',
        email: 'jane@example.com',
        ticket: 'Issue #456',
      },
      { name: 'Doe', email: 'doe@example.com', ticket: 'Issue #789' },
    ];

    responses.push(object);

    return interval(2000).pipe(
      take(responses.length),
      map((index) => responses[index]),
    );
  }

  async uploadFile(
    file: Buffer,
    filename: string,
  ): Promise<{ message: string }> {
    return new Promise((resolve, reject) => {
      fs.writeFile(filename, file, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve({ message: 'Arquivo enviado com sucesso!' });
        }
      });
    });
  }
}
