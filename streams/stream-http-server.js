import http from 'http';
import { Transform } from 'stream';

class InverseNemberStream extends Transform {
   _transform(chunk, encoding, callback) {
      const transformd = Number(chunk.toString()) * -1

      console.log(transformd)

      callback(null, Buffer.from(String(transformd)))
   }
}

const server = http.createServer(async (req, res) => {
   const buffer = []

   for await (const chunk of req) {
      buffer.push(chunk)
   }

   const fullStreamContent = Buffer.concat(buffer).toString()

   console.log(fullStreamContent)

   return res.end(fullStreamContent)

   // return req
   //    .pipe(new InverseNemberStream())
   //    .pipe(res)
})

server.listen(3434)