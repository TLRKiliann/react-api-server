# React API with axios - express (front)


React API (front: axios - back: express/json-server)

A simple API to test CRUD with express (back) & axios (front). You need 2 consoles to run app completely. One from root folder (front) & the second from backend folder. 

- my-app

└─ $ npm start

- my-app/backend

└─ $ npm run dev

└─ $ npm run server (server json)

└─ $ npm start

Therefore, axios can communicate with express.

Read README.md for more informations about cmd run in backend folder.

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

---

## GET

- Can be cached
- Data is visible to everyone in the URL

Some notes on GET requests:

    - GET requests can be cached
    - GET requests remain in the browser history
    - GET requests can be bookmarked
    - GET requests should never be used when dealing with sensitive data
    - GET requests have length restrictions
    - GET requests are only used to request data (not modify)

GET is less secure compared to POST because data sent is part of the URL

Never use GET when sending passwords or other sensitive information!  

Be carefull with GET method HTTP ! It's not a secure method to manipulate data. It's better to reuse `notes` (array) from first call with useEffect() hook, to prevent side-effects.

```
(App.js)

  //Search note (best practice)
  const handleSearch = (e) => {
    e.preventDefault();
    const searchNum = notes.filter(note => {
      return note.name === searchName
      ? `${note.name} ${note.phone}`
      : null;
    })
    console.log("searchNum : ", searchNum)
    if (searchNum === "") {
      setNotes([])
    } else {
      setFilterNotes(searchNum);
    }
    setSearchName("")
  };

  //Search note by id without mapping before.
  //It's not a best practices, because we use a GET.
  /*const handleSearch = () => {
    const searchNum = notes.filter(note => {
      return note.name === searchName
        ? `${note.name} ${note.phone}`
        : null;
    });
    const searchId = searchNum.filter(note => note);
    const returnId = searchId[0].id;
    //console.log(returnId)

    noteService
      .getById(returnId)   //noteService > axios.get()
      .then(returnNote => {
        //const truc = Object.keys(data.returnNote)
        if (returnNote) {
          setFilterNotes(searchNum);
        } else {
          return null;
        }
      })
  };*/
```

## About side effects with GET

Ressources :

https://fullstackopen.com/en/part3/node_js_and_express#middleware
https://www.w3schools.com/tags/ref_httpmethods.asp
https://stackoverflow.com/questions/810289/when-exactly-does-a-method-have-side-effects


---

## Side Effects

By side-effects we mean that the state of the database must not change as a result of the request, and the response must only return data that already exists on the server.

In computer science, a function or expression is said to have a side effect if, in addition to producing a value, it also modifies some state or has an observable interaction with calling functions or the outside world.

The HTTP standard also defines the request type HEAD, that ought to be safe. In practice HEAD should work exactly like GET but it does not return anything but the status code and response headers. The response body will not be returned when you make a HEAD request.

Methods can also have the property of "idempotence" in that (aside from error or expiration issues) the side-effects of N > 0 identical requests is the same as for a single request. The methods GET, HEAD, PUT and DELETE share this property.

This means that if a request does not generate side-effects, then the result should be the same regardless of how many times the request is sent.

---

## POST

- Not cached
- Data is not displayed in the URL

POST is a little safer than GET because the parameters are not stored in browser history or in web server logs

---

POST is the only HTTP request type that is neither safe nor idempotent. If we send 5 different HTTP POST requests to /api/notes with a body of {content: "many same", important: true}, the resulting 5 notes on the server will all have the same content.

---

## Recommandations :

Use GET method with useEffect to retrieve data in React. This prevents side-effects.

Non-NOP Setters always satisfy that criteria.

Lodash

`The Lodash library provides a function _.noop(), which returns undefined and does nothing.[10]`

Note that logging data even in the console can be dangerous since it can contain sensitive data and may violate local privacy law (e.g. GDPR in EU) or business-standard. In this exercise, you don't have to worry about privacy issues, but in practice, try not to log any sensitive data.

---

## NOP

Many computer protocols, such as telnet, include a NOP command that a client can issue to request a response from the server without requesting any other actions. Such a command can be used to ensure the connection is still alive or that the server is responsive.

The NOP opcode can be used to form a NOP slide, which allows code to execute when the exact value of the instruction pointer is indeterminate (e.g., when a buffer overflow causes a function's return address on the stack to be overwritten).

---

## Load Balancing Linux Node NGINX

It's recommend you install NGINX Plus on a fresh physical or virtual system.
