# postcss-rem-to-responsive-pixel

A plugin for [PostCSS](https://github.com/ai/postcss) that generates px or rpx units from rem units.

- Rewrite with `typescript` and well tested.
- Support `Postcss7` and `Postcss8` !
- TransformUnit Support `px` and `rpx` ! (for those miniprogram developers who use my [tailwindcss-miniprogram-preset](https://github.com/sonofmagic/tailwindcss-miniprogram-preset))

## Install

```shell
$ yarn add -D postcss-rem-to-responsive-pixel
```

## Usage

```js
// postcss 8:
require('postcss-rem-to-responsive-pixel')
// postcss 7:
require('postcss-rem-to-responsive-pixel/postcss7')
```

When you use `tailwindcss` to write your website or miniprogram(Chinese Developer knows **LOL**) , the default unit is `rem`, so sometimes we have to transform our unit to `px` or `rpx`.

this plugin use like [postcss-rem-to-pixel](https://www.npmjs.com/package/postcss-rem-to-pixel), all options are **compatible** !

Thanks to the author of `postcss-rem-to-pixel` and `postcss-pxtorem`.

if you use with `tailwindcss` and [`tailwindcss-miniprogram-preset`](https://www.npmjs.com/package/tailwindcss-miniprogram-preset)

you may should close the rem2rpx in this preset:

```js
// tailwind.config.js
const { createPreset } = require('tailwindcss-miniprogram-preset')
module.exports = {
  presets: [
    createPreset({
      rem2rpx: false,
    }),
  ],
}
```

and set below options:

```js
// postcss.config.js
module.exports = {
  plugins: [
    require('autoprefixer'),
    require('tailwindcss'),
    require('postcss-rem-to-responsive-pixel')({
      rootValue: 32,
      propList: ['*'],
      transformUnit: 'rpx',
    }),
  ],
}
```

### Input/Output

_With the default settings, only font related properties are targeted._

```css
// input
h1 {
  margin: 0 0 20px;
  font-size: 2rem;
  line-height: 1.2;
  letter-spacing: 0.0625rem;
}

// output
h1 {
  margin: 0 0 20px;
  font-size: 32px;
  line-height: 1.2;
  letter-spacing: 1px;
}
```

### options

Type: `Object | Null`  
Default:

```js
{
    rootValue: 16,
    unitPrecision: 5,
    propList: ['font', 'font-size', 'line-height', 'letter-spacing'],
    selectorBlackList: [],
    replace: true,
    mediaQuery: false,
    minRemValue: 0 ,
    exclude: undefined,
    transformUnit: 'px'
}
```

- `rootValue` (Number) The root element font size.
- `unitPrecision` (Number) The decimal precision px units are allowed to use, floored (rounding down on half).
- `propList` (Array) The properties that can change from rem to px.
  - Values need to be exact matches.
  - Use wildcard `*` to enable all properties. Example: `['*']`
  - Use `*` at the start or end of a word. (`['*position*']` will match `background-position-y`)
  - Use `!` to not match a property. Example: `['*', '!letter-spacing']`
  - Combine the "not" prefix with the other prefixes. Example: `['*', '!font*']`
- `selectorBlackList` (Array) The selectors to ignore and leave as rem.
  - If value is string, it checks to see if selector contains the string.
    - `['body']` will match `.body-class`
  - If value is regexp, it checks to see if the selector matches the regexp.
    - `[/^body$/]` will match `body` but not `.body`
- `replace` (Boolean) replaces rules containing rems instead of adding fallbacks.
- `mediaQuery` (Boolean) Allow rem to be converted in media queries.
- `minRemValue` (Number) Set the minimum rem value to replace.
- `exclude` (String, Regexp, Function) The file path to ignore and leave as px.
  - If value is string, it checks to see if file path contains the string.
    - `'exclude'` will match `\project\postcss-pxtorem\exclude\path`
  - If value is regexp, it checks to see if file path matches the regexp.
    - `/exclude/i` will match `\project\postcss-pxtorem\exclude\path`
  - If value is function, you can use exclude function to return a true and the file will be ignored.
    - the callback will pass the file path as a parameter, it should returns a Boolean result.
    - `function (file) { return file.indexOf('exclude') !== -1; }`
- `transformUnit` (`px` or `rpx`) The transform output unit.

### Use with postcss.config.js

```js
// postcss.config.js
module.exports = {
  plugins: [
    // for example
    // require('autoprefixer'),
    // require('tailwindcss'),
    require('postcss-rem-to-responsive-pixel')({
      rootValue: 32,
      propList: ['*'],
      transformUnit: 'rpx',
    }),
  ],
}
```

### A message about ignoring properties

Currently, the easiest way to have a single property ignored is to use a capital in the rem unit declaration.

```css
// `rem` is converted to `px`
.convert {
  font-size: 1rem; // converted to 16px
}

// `Rem` or `REM` is ignored by `postcss-rem-to-pixel` but still accepted by browsers
.ignore {
  border: 1rem solid; // ignored
  border-width: 2rem; // ignored
}
```
