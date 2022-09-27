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

(App.js)

GET 

Be carefull with GET method HTTP ! It's not a secure method
to manipulate data. It's better to reuse `notes` (array) from 
first call with useEffect() hook, to prevent side-effects.

```
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