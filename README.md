# get-compact

**get-compact** is a middleware package designed to enforce the use of the `GET` method for search requests while compressing query parameters, making URL-based queries more efficient and compact.

## 📦 Installation

Install the package via npm:

```bash
npm install get-compact
```

## 🚀 How to Use

**get-compact** is designed to be easy to integrate with any API or middleware. It ensures that search requests use the `GET` method and compresses query parameters if necessary.

### Basic Example

```typescript
import { getCompact } from 'get-compact';
import express from 'express';

const app = express();

// Middleware to enforce GET method and compress query parameters
app.use(getCompact);

app.get('/search', (req, res) => {
  const queryParams = req.query;
  res.json({ message: 'Search using GET with compressed query parameters!', queryParams });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

### How It Works
- The `getCompact` middleware compresses the query parameters when necessary and ensures that the `GET` method is used for search requests.
- If someone tries to perform a search with `POST`, the request will be blocked.

## ⚙️ API

### `getCompact(options?: Options)`

A middleware function that enforces the use of `GET` for search requests and compresses the query parameters.

#### Parameters:
- `options` (optional): An object to customize the middleware's behavior.
  - `compressionMethod`: The compression method to use (e.g., `'gzip'`, `'deflate'`). Default is `'gzip'`.
  - `maxLength`: Maximum allowed URL length after compression. If exceeded, an error is returned (default: `2000` characters).

#### Example:

```typescript
app.use(getCompact({ compressionMethod: 'deflate', maxLength: 1500 }));
```

## ❌ Error Handling for `POST`

If someone attempts to make a search request using `POST`, the package will return a `405 Method Not Allowed` error.

```typescript
app.post('/search', (req, res) => {
  res.status(405).send('POST method is not allowed for search requests. Use GET.');
});
```

## 🛠️ Additional Configurations

### Handling Large URLs
**get-compact** includes logic to prevent excessively long URLs. By default, if the compressed URL exceeds 2000 characters, the middleware will return a `413 Payload Too Large` error.

### Supported Compression Methods
Currently, the following compression methods are supported:
- `gzip`
- `deflate`

The package can be extended to support other compression methods as needed.

## 📝 License

This project is licensed under the [MIT License](LICENSE).
