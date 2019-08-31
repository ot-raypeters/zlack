# Zlack - A ~simple~ strange chat app

This application requires the [node](https://nodejs.org/en/) version `10.16 LTS` to run.
Newer node versions are untested but may still work.

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
- [create-react-app](https://github.com/facebook/create-react-app)
- [@tensorflow-models/toxicity](https://github.com/tensorflow/tfjs-models/tree/master/toxicity)

## Additional considerations

### Should this app support Android, iOS, and Web experiences?

**DECISION**

This microapp is built with [React](https://reactjs.org/) to unlock development velocity for me.

**TRADE OFF**

Short term, mobile devices can use the progressive web app with their preferred browser.

Long term, newer technologies like [flutter](https://flutter.dev/) and [ReactNative](https://facebook.github.io/react-native/) should be considered to make it easier for smaller teams to maintain cross-platform experiences now and in the future.

Additional research is necessary before further consideration.
