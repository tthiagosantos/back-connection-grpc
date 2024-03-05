import { Observable } from 'rxjs';

export interface TicketInterface {
  bidiHello(
    upstream: Observable<CreateTicketRequest>,
  ): Observable<CreateTicketResponse>;
  lotsOfGreetings(
    upstream: Observable<CreateTicketRequest>,
  ): Observable<CreateTicketResponse>;
}

interface CreateTicketRequest {
  name: string;
  email: string;
  ticket: string;
}
interface CreateTicketResponse {
  name: string;
  email: string;
  ticket: string;
}
