
[![Greenkeeper badge](https://badges.greenkeeper.io/shekohex/dead-simple-feedback-app.svg)](https://greenkeeper.io/)
# A Dead Simple Feedback App

just a simple node-expressjs application with MongoDB as Database Engine for storing feedbacks

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

Node JS and GIT installed 

### Installing

1 - frist of all you need to clone this repo

```
git clone https://github.com/shekohex/dead-simple-feedback-app.git
cd /dead-simple-feedback-app
npm install
```

2 - then you need to copy and rename .env-example file to .env and open it
edit your database server and save the file

3 - after editing the .env file , open app.js and go to line 44

```javascript
//deactivate this route after finish your setup
app.get('/setup', (req, res) => {
   let settings = new database.websiteSettings({
       settings: {
           title: 'Give Me a Feedback', //website title
           adminName: 'shekohex', // we will use this to login to dashboard
           passPhrase: 'password' // i think you know what is that :'D
       },
       userData: {
           username: 'shadygkhalifa', //this just a username , you can use your twitter username
           name: 'Shady Khalifa', // hmmmm ?
           profilePic: 'https://pbs.twimg.com/profile_images/915263274110906369/Z_kfjrLb_400x400.jpg', // 400x400 
           headerPic: 'https://pbs.twimg.com/profile_banners/2943447525/1482352613/1500x500',
           facebook: 'https://facebook.com/hex.inc',
           twitter: 'https://twitter.com/shadygkhalifa',
           github: 'https://github.com/shekohex'
       },
       senderData: {
           name: 'Someone', // this will apper when someone send a message
           username: 'someone',
           profilePic: 'images/unknown.jpg'
       }
   })
    settings.save()
    res.send(settings)
})

```
4- at the end open your terminal or cmd and type
```
npm start
```
then open your browser and go to 
```
localhost:3000/setup
```
you should get the resualt back as the settings you added above

5 - To login to Dashboard go to
```
localhost:3000/manager/login
```
and use your username and password that used while setting up

## Why Pure Javascript?

i made this app as an example for any one who wana start NodeJS to get a good view about it,
keeing things simple and readable is good for newbie

## Built With

* [ExpressJS](https://expressjs.com) - Fast, unopinionated, minimalist web framework for Node.js
* [Mongoose](http://mongoosejs.com/) - elegant mongodb object modeling for node.js
* [Bulma](http://bulma.io/) - A modern CSS framework based on Flexbox

## Contributing

you are welcome with this project for contributing, just contact me 

## Authors

* **Shady Khalifa** - *Initial work*

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details


