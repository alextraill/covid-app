# Covid App

To get this project up and running locally after you clone run the following commands in the project directory: 

### `yarn`

This will install all the dependencies needed to run this project. 

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

## API 

The documentation for the API I used for this project can be found here: https://covid-api.com/api/

I have a couple of comments about issues I found with this API
- Some of the information takes a long time to load due to how the API is set up. There is no way to set up a request using a range of dates so I had to get each individual date in a separate request. - To make this run a little quicker I set the requests up to run asynchronously (but the "All Time" filter still takes quite a bit of time to load) 
- The other things I realized about the API after working with it for this project is that the information has not been set up using the 50 states, at first I thought that the "province" included all the states but it looks like it also has other regions mixed in there and that the API failed ocassionally.
- These are issues that in a normal project would be solved on the back end. I was unable to find a better api to work with and I didn't spend time setting up my own API as I wanted to concentrate on the front end as the goal was to illustate my front end knowledge. 
