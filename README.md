Music Routes-- likely the world's first noisy express.js middleware

tl;dr:
```js
//const app = require('express')();
const musicalroutes = require("musicalroutes");
app.use("/tunes", musicalroutes());
```
(See companion blog post here: https://medium.com/@valgaze/musical-middleware-for-expressjs-2ebc2cf0d4cd#.js4ittoyf)

------

## Demo function to ensure all is working smoothly (you should hear a song):

    ```sh
    const tunes = require("musicalroutes");
    tunes.demo();
    ```


## Optional Parameters:

1. **Source**: Custom audio source (absolute path or youtube URL)

    ```js
    app.use("/tunes", musicalport({"source":"https://www.youtube.com/watch?v=3GwjfUFyY6M"});
    ```

2. **Predicate**: Optional function that resolves to true/false that determines if audio source plays (callback takes the full req/res object)

    ```js
    app.use("/products/:id", musicalport({
        "source": "https://www.youtube.com/watch?v=3GwjfUFyY6M",
        predicate: (req, res) => {
            if (req.params.id == 7) {
                return true;
            } else {
                return false
            }
        }
    }), function(req, res, next) {
        res.send("You picked " + req.params.id);
    });
    ```
