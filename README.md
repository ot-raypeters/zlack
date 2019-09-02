# Zlack - A ~simple~ strange chat app

This application requires the [node](https://nodejs.org/en/) version `10.16 LTS` to run.

Newer node versions are untested but may still work.

## Quick start

Steps to run the client and server:

1. Install dependencies with `yarn`
2. Start backend with `yarn server`
3. Start frontend with `yarn start`
4. Visit [localhost:3000](http://localhost:3000)

## Available Scripts

In the project directory, you can run:

### `yarn server`

Runs the backend for the app.<br>
The server will restart if you make edits.

### `yarn start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Feature roadmap

### Simple chat app

- [x] User can login and view a list of channels
- [x] User can join a channel and see list of users in the channel
- [x] User can send a message to the channel

### Fancy chat app

- [x] User can reply to a message
- [x] User can see when other users are typing
- [x] Developers should be able to create bot integrations quickly and easily
- [x] Users should be serenaded by quotes from the Zen of Python

### Super fancy chat app

- [ ] Users can see suppressed messages
- [ ] Browser client can detect and suppress toxic messages
- [ ] Mischievious bots should blurt out toxic messages (lol)
- [ ] Users can read and unread messages

### Future

- [ ] Add e2e smoke tests with cypress for "critical" user flows
- [ ] User should be able to add and remove channels
- [ ] Responsive experience for mobile devices
- [ ] User should be able to react to messages
- [ ] Build and deploy with electron
- [ ] Fully support offline mode
- [ ] Optimize lighthouse score
- [x] Github security alerts
- [ ] Keyboard shortcuts
- [ ] Emoji support

## Production-ready checklist

### Service-level Objectives

- [ ] Devices should sync critical data within 2 seconds
- [ ] Microapp should be interactive within 1 second

### Developer experience readiness

- [ ] Is it easy to build and test locally?
- [ ] Is it easy to enable and disable feature toggles?
- [ ] Is it easy to configure local development environment to proxy to qa and production environments?
- [ ] Are pull requests passing tests before merged into master?
- [ ] Do e2e tests for critical user flows protect deployments to production?
- [ ] Is it fast create and deploy new microapp versions to production?
- [ ] Is it simple to rollback to the last known stable version?

### Microapp readiness

- [ ] Are service-level objectives measured and enforced?
- [ ] Are translations completed and versioned with the app?
- [ ] Are clients resilient to brief (<5 minute) platform outages?
- [ ] Is PII data handled securely and responsibly?

### Microservice monitoring

- [ ] Are readmes and runbooks up-to-date?
- [ ] Do "warnings" get logged when something unexpected happens?
- [ ] Are "warnings" alerts captured and easy to review asynch?
- [ ] Do "critical" alerts fire when users are impacted?
- [ ] Are the right people alerted when users are "critically" impacted?
- [ ] Are "critical" alerts clearly actionable?
- [ ] Are important user metrics captured easy to understand at a glance?

### Platform monitoring

- [ ] Is it simple to see the overall health of the platform?
- [ ] Is it easy to determine the root cause of an incident?
- [ ] Is it easy to describe user impact during an incident?
- [ ] Does the platform self-heal when something unexpected happens?
- [ ] Does the platform honor GDPR requirements?

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
- The core ideas behind [Distributed Object Protocol](https://distributedobjectprotocol.org)
- [Cypress](https://www.cypress.io/)

## Additional considerations

### Should this app support multiple languages?

**DECISION**

This microapp will use hard-coded english strings to unlock development velocity.

**TRADE OFF**

Translations can easily be retrofitted later.

### Should this app support Android, iOS, and Web experiences?

**DECISION**

This microapp is built with [React](https://reactjs.org/) to unlock development velocity.

**TRADE OFF**

Short term, mobile users can still open the app in their mobile browser. A responsive version of the app will be displayed to improve the user experience.

Long term, newer technologies like [flutter](https://flutter.dev/) and [ReactNative](https://facebook.github.io/react-native/) should be considered to make it easier for smaller teams to maintain cross-platform experiences now and in the future.

Additional research is necessary before further consideration.

## Dev notes

- It may be nice to define the redux store once, and share code between client and server. This would simplify the system and make it easier to reason about.

- Consider using the same event names across the frontend and backend.
