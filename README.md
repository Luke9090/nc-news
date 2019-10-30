# Background

This is a portfolio piece created by Luke Horne during the frontend block of the [Northcoders](http://northcoders.com) bootcamp. I created the API that supports it during the preceding backend block.

You can find all the code for both portions of the project on [my GitHub](https://github.com/Luke9090):

Frontend: [github.com/luke9090/nc-news](https://github.com/Luke9090/nc-news)
Backend: [github.com/luke9090/be-nc-news-luke](https://github.com/Luke9090/be-nc-news-luke)

The brief I was working to is in the [/docs](https://github.com/Luke9090/nc-news/tree/master/docs) folder of the GitHub repository.

# See it in action

## Hosted version

The easiest way to view the project is to visit the hosted versions. The frontend is hosted on Netlify, fetching its data from the BackEnd which is hosted on Heroku.

Hosted frontend: [nc-news-luke.netlify.com/](https://nc-news-luke.netlify.com/)
Hosted backend: [nc-news-luke.herokuapp.com/api](https://nc-news-luke.herokuapp.com/api)

## Running your own local version

To run the project locally from your terminal... clone the repository to your computer, `cd` into the created directory, install the node package dependencies and use npm to run the `start` script. Your default browser should automatically open the locally hosted version of the project.

```git clone https://github.com/Luke9090/nc-news.git
cd nc-news/
npm install
npm run start
```

The above instructions assume that you already have NodeJS installed. If you do not, the NodeJS website is probably a good place to start: [nodejs.org](https://nodejs.org/en/)

The locally hosted version is still fetching the data from the Heroku hosted backend. If you would like to run the backend locally as well, you will need to follow the instructions in the README on the [backend's Github page](https://github.com/Luke9090/be-nc-news-luke)

To make the locally hosted frontend fetch its data from the locally hosted backend, you will need to change the baseURL property in `api.js` to point to `localhost:$port/api`.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
