import { Request, Response } from 'express';
import axios from 'axios';

export async function proxyToEventService(req: Request, res: Response) {
  const user = req.user as any;  // 👈 여기서 any로 강제 캐스팅
  try {
    const targetUrl = `http://event-service:3001${req.originalUrl}`;
    const response = await axios({
      method: req.method,
      url: targetUrl,
      headers: {
        ...req.headers,
        'x-user-id': user?.sub,
        'x-user-role': user?.role,
      },
      data: req.body,
    });
    res.status(response.status).send(response.data);
  } catch (err) {
    res.status(err.response?.status || 500).send(err.response?.data || 'Proxy error');
  }
}
