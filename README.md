
# DepartureTimes.click

Web site for seeing when the next few Metlink buses / trains will
be near your fav stop (if you are in Wellington, New Zealand)

<https://DepartureTimes.click/>

This is a simple, client only, React site. It uses <https://vitejs.dev/>

It was created to help me get current with the state of web development. But, it's turned out
to be useful--I look at it whenever I'm planning to take a train.

The key design drivers are speed (few clicks and small network load) and clarity (my vision isn't
great).

If a stop is bookmarked there should be zero clicks to see a very readable "12 minutes til my train".
As importantly, any service alert is right there so I know whether to be sad or not.

![departures listing](public/help-list.webp?raw=true)

## To Do

* lazy load the stops list (it's 50k compressed)
* auto CI deploy scheme
* destinations button bar can be wider than the page
  * some stops have more destinations than fit nicely on a phone screen; need to wrap these or something
* too much whitespace on smaller displays
  * margins should be tighter on smaller width displays
* PWA config
* a more sensible favicon
* bus route number in the departures list view would be nice
* bus/train/ferry indicator in the stop picker would be nice
* bus/train/ferry filter in the stop picker would be nice

## Getting Started

Collect dependent node modules.

```text
npm install
```

Visit <https://opendata.metlink.org.nz/> and register to get your own API key and place it in a
.env.local file. See .env-example for an example.

```text
echo "VITE_API_KEY=$your-api-key-goes-here" > .env.local
```

(*.local files are covered by .gitignore.)

Start a local dev server and visit the web site.

```text
npm run dev
```

## Testing and Coverage

```text
npm run test
```

```text
npm run coverage
```

## Deployment

This performs a build then rsync's it to a static web server.

```text
npm run deploy
```

The (nginx) web server has a configuration which will return index.html for any file request which
doesn't exist. So, requests like "/stop" return the same content as "/".

```nginx
location / {
    try_files $uri $uri.html index.html /index.html =404;
}
```

## It Uses

* React
* Vite for dev and build tooling
  * <https://vitejs.dev/>
* MUI / Material UI components
  * <https://mui.com/material-ui/>
* TanStack Query for api results fetching and caching
  * <https://tanstack.com/query/>

## Contributing

PRs are very welcome.

The coding style mostly adheres to <https://google.github.io/styleguide/tsguide.html>

## Reed is Looking for work

See:

* <https://Kittens.nz/>
* <https://www.linkedin.com/in/reedwade>
