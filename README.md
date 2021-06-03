# Crypto Order Book
![Image of the tool](https://i.ibb.co/Y7jmjFD/screenshot.png)
This is a tool to visualize the order book of a couple of crypto currencies: Bitcoin and Ether. 

This tool implements the following component tree:
* <b>App component</b>: the main entry point. It handles connections with the crypto web socket.
* <b>Header component</b>: Displays the active currency and exposes the group selector.
* <b>Order book component</b>: Shows the price, value and total relation of each order on the book.
* <b>Bottom component</b>: Exposes a couple of buttons for toggling the curreny and stopping the socket feed.

To manage the state of the application, the tool is using Redux. The app store can be found under the `src/store/main.ts` folder. There are a couple of elements to review here:
* <b>store</b> - This is the application store that manages the state.
* <b>appSlice</b> - Exposes the reducers that allow each component of the app to update the state. This is based on the single source of truth principle.

The data on the application is not passed via the component tree. Instead, each component is using Redux's `useSelector` hook to get values from the state.

This is the initial version. There are missing functionalities to be added:
* Add grouping functionality
* Add "kill feed" functionality
* Adapt UI to mobile devices
* Include unit testing
* Performance improvement + building
* Tool hosting
* Extend the documentation


## Steps to run the project locally

Install project dependencies

### `yarn install`

Run the project using:

### `yarn start`

Run the tests:

### `yarn test`

Build the project:

### `yarn build`


