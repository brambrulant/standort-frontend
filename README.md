# <img style="height: 40px; margin-right:20px" src="https://www.flaticon.com/svg/vstatic/svg/927/927693.svg?token=exp=1611917826~hmac=6386c51ae7827eadfef1b4472d4ee085">STANDORT


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

1. As a user I am able to log in:
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

<a href="https://nodejs.dev/"><img style="margin-right:10px" src="https://img.icons8.com/color/48/000000/nodejs.png"/></a>
<a href="https://expressjs.com/"><img style="width: 90px; padding-bottom: 10px; margin-right:5px" src="https://camo.githubusercontent.com/0566752248b4b31b2c4bdc583404e41066bd0b6726f310b73e1140deefcc31ac/68747470733a2f2f692e636c6f756475702e636f6d2f7a6659366c4c376546612d3330303078333030302e706e67"/></a>
<a href="https://www.postgresql.org/"><img style="margin-right:5px"  src="https://img.icons8.com/color/48/000000/postgreesql.png"/></a>
<a href="https://sequelize.org/"><img style="height: 40px; padding-bottom: 10px" src="https://pbs.twimg.com/media/CVQKQjrUsAAGcZi.png"/></a>

## About us

<div style="display: flex; flex-direction: column">
    <a href="https://github.com/brambrulant">Bram Schabbink</a>
    <a href="https://github.com/Mr0cket">Milo Silva</a>
    <a href="https://github.com/YanaTrifonova">Yana Trifonova</a>
</div>

## Run in development mode

Server starts on PORT=3000

start server

```
npm start
```
