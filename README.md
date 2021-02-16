# <img src="https://raw.githubusercontent.com/brambrulant/standort-frontend/development/public/favicon.ico">CAIRN - /kɛːn/ - Man-made pile of stones. Often erected as a sign for future travellers

## Go to the website 
[link](https://cairn.netlify.app/)

## The idea

If there was an app where tourists & locals could:

- ask questions,
- leave recommendations,
- give advice about places to visit in, and surrounding the city:
    - what places to avoid,
    - how to get to these places,
    - what to prepare
- etc.

It would be very useful to help travellers get the best experiences out of their trip in the most convenient way.

## User Stories

1. As a user I am able to log in
    - name
    - email
    - password
    - profile picture
2. As a user I am able to sign up
    - email
    - password
3. As a user, I can create a post as thread or question or recommendation
    - I can add pictures to my post
        - Implementation: cloudinary hosts the images & creates “add image” popup
    - I can add links to my post
        - Implementation:
          add a small text editor to create posts
    - I can add tags to represent the topic/activity I am posting about. App provides you There is a fixed list of tags
      which represent all types of activities

4. As a user when I open the app I join the social space/feed of my current city/location
    - App automatically get your location when you come to the page

## Project status board with user stories and release plan

[Link to GitHub project board](https://github.com/brambrulant/standort-frontend/projects/1)

## Wireframes

[User scenarios in Figma](https://www.figma.com/file/eo9Ja9TiFeVikox5KNDipI/LocationAppie?node-id=0%3A1)

## GitHub links

Frontend repository - current

Backend repository - [link](https://github.com/Mr0cket/standort-backend)

## Stack

### Frontend

<a href="https://www.javascript.com/"><img src="https://img.icons8.com/color/48/000000/javascript.png" alt="JavaScript"></a>
<a href="https://www.w3.org/html/"><img src="https://img.icons8.com/color/48/000000/html-5.png"/></a>
<a href="https://www.w3.org/TR/CSS/#css"><img src="https://img.icons8.com/color/48/000000/css3.png"/></a>
<a href="https://reactjs.org/"><img src="https://img.icons8.com/officel/40/000000/react.png"/></a>
<a href="https://redux.js.org/"><img src="https://img.icons8.com/color/48/000000/redux.png"/></a>
<a href="https://material-ui.com/"><img src="https://img.icons8.com/color/48/000000/material-ui.png"/></a>

### Backend

<a href="https://nodejs.dev/"><img src="https://img.icons8.com/color/48/000000/nodejs.png"/></a>
<a href="https://expressjs.com/"><img src="https://i.ibb.co/QCxVyFH/express-3-1.png"/></a>
<a href="https://www.postgresql.org/"><img style="margin-right:5px"  src="https://img.icons8.com/color/48/000000/postgreesql.png"/></a>
<a href="https://sequelize.org/"><img src="https://i.ibb.co/LQtSfMw/seq-1.png"/></a>

## About us

#### <a href="https://github.com/brambrulant">Bram Schabbink</a>
#### <a href="https://github.com/Mr0cket">Milo Silva</a>
#### <a href="https://github.com/YanaTrifonova">Yana Trifonova</a>

## Run in development mode

Server starts on PORT=3000

start server

```
npm start
```
