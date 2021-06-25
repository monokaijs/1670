# CMS Project - Manual

*This project was written by [MonokaiJs](https://www.facebook.com/MonokaiJssss), please do not remove this credit line
in any means of use.*

[![main workflow](https://github.com/monokaijs/1670/actions/workflows/main.yml/badge.svg)](https://github.com/monokaijs/1670)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://gitHub.com/monokaijs/1670)
[![Maintainer](https://img.shields.io/badge/maintainer-monokaijs-blue)](https://github.com/monokaijs)
[![Website](https://img.shields.io/website-up-down-green-red/http/shields.io.svg)](https://s1670.herokuapp.com/)
[![CC-0 license](https://img.shields.io/badge/License-CC--0-blue.svg)](https://creativecommons.org/licenses/by-nd/4.0)

Demo: [s1670.herokuapp.com](https://s1670.herokuapp.com/)

### Installation
Please run this script gently and carefully checking the dependencies.
```
yarn
cd client
yarn
cd ..
```
#### Why?
Since this project is written using ReactJs Framework for the Frontend along with Express on
Server-side, these two projects cannot be merged into one (or the merging process is really
complicated) so, I have decided to keep them separated. As the consequence, you have to manually
run `npm i` on all sub-projects.
### What's next?
Please read carefully about the documentation (may include with this project or the official
document of ReactJs, MongoDB, Express, etc...). Please note that this project currently using
a lot of frameworks, tools and features, so it may take you a bunch of time for understanding
the whole thing.

First thing you have to care about is setting for the database. You can do so by adding your
database connection URL in `.env` file which is in the root of the project. Please be sure that
you're using right syntax:
```
DB_CONNECTION_URL=<your-connection-goes-here>
```
Any fails in configuring may lead to fail of starting the server.

### Running the dev server
Please make sure that you have installed `concurrently` globally. You can install it with below
command:
```
npm i -g concurrently
```
Finally, run this command to start your journey:
```
yarn dev
```
