# developer-site.react

This app is a developer-style react website with a simple UI that displays blog entries from a database, and fetches the most recent Github projects of a user to display them. It also has a secured admin panel to facilitate adding/editing blog entries.

##Tech Stack

- PostgreSQL
- Express
- React
- Node.js

Libraries and other key features:
- jsonwebtoken (authentication)
- bcrypt (encryption)
- Github's REST API (fetching user projects)
- dotenv (storing sensitive user data locally)
- axios (make requests to backend server)
- react-router-dom (for routing to the pages)

##Installation and Setup guide

To use the blogging feature of this app, you will need a local PostgreSQL database with a table called 'blog'...

Clone, then go to project folder and run 'npm install'
Then, go to folder called 'client' and run 'npm install' there as well

Before running this as your website, you will want to change some variables in 2 files to suit your needs.

To run the program, simply type 'npm run dev-start' in root of project folder.