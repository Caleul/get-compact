import { compressParams } from './compress';
import { decompressParams } from './decompress';
import { Request, Response, NextFunction } from 'express';

export function getCompactMiddleware() {
  return (req: Request, res: Response, next: NextFunction) => {
    // Se o método for POST, retorne erro
    if (req.method === 'POST') {
      return res.status(405).send('POST method is not allowed for search. Use GET.');
    }

    // Descomprimir parâmetros se existirem
    if (req.query.compressed) {
      try {
        req.query = decompressParams<Record<string, any>>(req.query.compressed as string);
      } catch (error) {
        return res.status(400).send('Failed to decompress query parameters.');
      }
    }

    // Compactar os parâmetros da requisição na resposta
    res.on('finish', () => {
      if (Object.keys(req.query).length > 0) {
        const compressed = compressParams(req.query);
        res.set('X-Compressed-Params', compressed);
      }
    });

    next();
  };
}
