# sketch-webcam

Interactive demos with webcam, tensorflow.js models, three.js and Vue-CLI.  
https://webcam.tplh.net/

This code is released under the MIT license.  
If you want to use some code, you can use these freely by adding license notation.

## Using Models

- [tfjs-models/posenet](https://github.com/tensorflow/tfjs-models/tree/master/posenet)
- [tfjs-models/facemesh](https://github.com/tensorflow/tfjs-models/tree/master/facemesh)
- [tfjs-models/body-pix](https://github.com/tensorflow/tfjs-models/tree/master/body-pix)

## Create SSL key

with OpenSSL

```
openssl req -newkey rsa:2048 -new -nodes -keyout key.pem -out csr.pem ; openssl x509 -req -days 365 -in csr.pem -signkey key.pem -out server.crt
```

## License

Copyright (c) 2020 Yoichi Kobayashi  
Released under the MIT license  
http://opensource.org/licenses/mit-license.php

## Misc

Follow Yoichi Kobayashi: [Web](http://www.tplh.net/), [Twitter](https://twitter.com/ykob0123)
