# Zlack - A ~simple~ strange chat app

## Build and run

This application requires the [node](https://nodejs.org/en/) version `10.16 LTS` to run. Newer node versions are untested but may still work.

- Local build environment: `npm run dev`
- Production environment: `npm run start`
- Run tests: `npm run test`

## Feature roadmap

### Simple chat app

- [ ] User can login and view a list of channels
- [ ] User can join a channel and see list of users in the channel
- [ ] User can send a message to the channel
- [ ] User can see when other users are typing
- [ ] User can reply to a message

### Fancy chat app

- [ ] User can see channel activity stats
- [ ] Developers should be able to create bot integrations quickly and easily
- [ ] Users should be serenaded by quotes from the Zen of Python

### Super fancy chat app

- [ ] Users can see suppressed messages
- [ ] Browser client can detect and suppress toxic messages
- [ ] Depressed bots and Angry bots should blurt toxic messages sometimes (lol)

### Future

- [ ] User should be able to add and remove channels
- [ ] User should be able to react to messages
- [ ] Build and deploy with electron
- [ ] Fully support offline mode
- [ ] Optimize lighthouse score

## Production-ready checklist

### General readiness

- [ ] Are readmes and runbooks up-to-date?
- [ ] Are pull requests passing tests before getting merged into master?
- [ ] Are e2e tests verifying critical user flows protecting deployments to production?
- [ ] Is it quick and easy to deploy new microapp versions to production?
- [ ] Is it quick and simple to rollback to the last known stable version?
- [ ] Are clients resilient to brief (<5 minute) platform outages?

### Microservice monitoring

- [ ] Do "warnings" get logged when something unexpected happens?
- [ ] Are "warnings" alerts captured and easy to review asynch?
- [ ] Do "critical" alerts fire when users are impacted?
- [ ] Are "critical" alert clearly actionable?
- [ ] Are the right people alerted when users are "critically" impacted?

### Platform monitoring

- [ ] Is it quick and easy to verify the health of the platform?
- [ ] Does the platform self-heal when something unexpected happens?

## Design principles

- Speed
- Simplicity
- Maintainability
- Showcase modern tech
- Have some fun :)

## Technology

- [Zen of Python](https://www.python.org/dev/peps/pep-0020/#id3)
- [@tensorflow-models/toxicity](https://github.com/tensorflow/tfjs-models/tree/master/toxicity)

## Additional considerations

### Should this app support Android, iOS, and Web experiences?

*DECISION* This microapp is built with [React](https://reactjs.org/) to unlock development velocity for me.

*TRADE OFF* Short term, mobile devices can use the progressive web app with their preferred browser.

Long term, newer technologies like [flutter](https://flutter.dev/) and [ReactNative](https://facebook.github.io/react-native/) should be considered to make it easier for smaller teams to maintain cross-platform experiences now and in the future.

Additional research is necessary before further consideration.

---

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
