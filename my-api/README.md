# React API with server-json & server-express


React API (front: axios - back: express/json-server)

A simple API to test CRUD with express (back) & axios (front). You need 2 consoles to run app completely. One for front & the second for backend. Therefore, axios can communicate with express.

(Read README.md for more informations about cmd run in backend folder).

## Install

...git clone https://...

└─ $ npm install

└─ $ npm install axios

Run CMD

└─ $ npm start

If there are some vulnerabilities fund with nth-check after axios installation, don't be worry. Just change your package.json as follow :

```
  "devDependencies": {
    "react-scripts": "5.0.1",   //place react-scripts here!
 ```

Now, you can run :

└─ $ npm audit --production

└─ $ npm audit --omit=dev

If everything is ok, you will see this message :

    found 0 vulnerabilities
