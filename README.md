# aoc2018

First, set up the session cookie file which will be used for fetching input. In the browser, copy the value of the session cookie for the site, which should be a long hex string, and save it in a file called `session.cookie`.

To run tests for all days:

```
npm test
```

To run tests for a specific day:

```
npm test -- -g 04
```

OR

```
npm test test/04.spec.js
```

To run the solution for a particular day:

```
bin/aoc 4
```

OR

```
npm start 4
```

To debug:

```
DEBUG=aoc bin/aoc 4
```
