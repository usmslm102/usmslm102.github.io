# Browser regression checks

Build and start the static site:

```sh
npm run build
npm run preview -- --host 127.0.0.1
```

With Playwright available, run in another terminal:

```sh
node scripts/smoke-test.cjs
```

The suite checks all ten pages at 1440, 390, and 320 pixels, blog search and empty results, the interactive desk, motion controls, article navigation, clipboard actions, RSS, sitemap, and content without JavaScript. It also fails on browser exceptions and horizontal page overflow.

For an externally installed Playwright or Chrome, set `PLAYWRIGHT_PATH` and `CHROME_PATH`. Set `TEST_URL` to use a different preview URL. Screenshots are written to `/tmp/website-{home,uses,mobile}.png`.
