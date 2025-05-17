import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ProxyService {
  constructor(private readonly httpService: HttpService) {}

  async forwardToEvent(path: string, headers: any): Promise<any> {
    const url = `http://localhost:3002${path}`;
    const response = await firstValueFrom(
      this.httpService.get(url, { headers })
    );
    return response.data;
  }
}
