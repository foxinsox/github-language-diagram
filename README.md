# Github Language Diagram

## What it is
* This is a little react app, build with next.js. It fetches data from the Github API.

## What it does
1) The user can search for any github user or organization account.
2) Once an account was selected, the app queries the main language information for the accounts first 100 repositories.
3) Finally, the app draws a diagram based on the queried data.

## Prerequisites:
* Node.js with npm installed

## Prepare this to run on your local machine:
* clone this repository, then navigate into it
* run `npm install --save` (only for the first time, this will install all dependencies)

## Run the local server:
* `npm run dev` then open [http://localhost:3000](http://localhost:3000)

## Run tests:
* For reasons of time only some basic tests have been implemented. You can run them with `npm run test`
