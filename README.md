# Quasar App (quasar)

Run after cloning:
1. npm install
2. npm install @supabase/supabase-js
3. quasar dev --history (or quasar build --history)

Build after cloning:
(npx) quasar build --history
cd /dist/spa
(npx) quasar serve --history

A Quasar Project

## Install the dependencies
```bash
yarn
# or
npm install
```
```
// will need Open Street Maps in the future 
```

```
Supabase
npm install @supabase/supabase-js
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
quasar dev
```


### Lint the files
```bash
yarn lint
# or
npm run lint
```


### Format the files
```bash
yarn format
# or
npm run format
```



### Build the app for production
```bash
(npx) quasar build (--history)
```

### Customize the configuration
See [Configuring quasar.config.js](https://v2.quasar.dev/quasar-cli-vite/quasar-config-js).





### Creation Steps:
1. create quasar app
2. create supabase database
3. connect those 2
4. upload the app to private github project
5. create netlify app
6. change the supabase eauthentication url to supabase app for magic links
7. 