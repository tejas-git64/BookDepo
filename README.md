# BookDepo

A bookstore web application

## Steps to run in local machine

- Create a project in firebase and enable authentication via email & password and google(social login) and Firestore database
- Create a collection in firestore named <code>users</code>
- Create an initial document with the following keys <code>fullname</code> and <code>email</code> with type as string for both and save
- Set rules in firestore by navigating to <code>Firestore database>Rules</code><br />
  In the editor below,replace the pre-existing rule and add the following:<br /><code>allow read, write: if request.resource.data.uid == request.auth.uid;</code><br /><code>allow read, write: if resource.data.uid == request.auth.uid;</code>
- Create an account in RapidAPI and subscribe to the HAPI Books API(to get live book data in the application)
- Clone the project into your local machine
- create a <code>.env.local</code> file in your project's root
- create a key variable as <code>VITE_API_KEY=</code> and append your RapidAPI's api key to it
- create another key variable as <code>VITE_API_HOST=</code> and append your RapidAPI's api host to it
- add your firebase's project credentials to the keys stored in <code>root>src>auth>Firebase.ts</code> file
- run <code>npm install</code> in your editor's terminal to install dependencies
- run <code>npm run dev</code> to view it in your browser 🎉<br />

#### Bonus tip: take note of the ip address in the terminal besides the Network option and paste it in any device which you want to view in! (PS: both you local machine and the external device must be connected to the same network)

### Frameworks and tooling used

- React
- TailwindCSS
- Typescript

### APIs and Platforms

- <a href="https://console.firebase.google.com/">Google Firebase</a>
- <a href="https://rapidapi.com/roftcomp-laGmBwlWLm/api/hapi-books">HAPI Books API</a>
