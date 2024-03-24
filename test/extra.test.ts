import postcss from 'postcss'
import remToPx from '@/index'

const basicCSS = '.rule { font-size: 0.9375rem }'

describe('remToPx', () => {
  it('just placeholder', () => {
    expect(true).toBe(true)
  })

  // it('should not add properties that already exist', function () {
  //   const expected = '.rule { font-size: 1rem; font-size: 16px; }'
  //   const processed = postcss(remToPx()).process(expected).css
  //   expect(processed).toBe(expected)
  // })
  // it('should not work when disabled', function () {
  //   const input =
  //     'h1 { margin: 0 0 20px; font-size: 2rem; line-height: 1.2; letter-spacing: 0.0625rem; }'
  //   const output = input
  //   const processed = postcss(
  //     remToPx({
  //       disabled: true
  //     })
  //   ).process(input).css
  //   expect(processed).toBe(output)
  // })
})

// describe('value parsing', function () {
//   it('should not replace values in double quotes or single quotes', function () {
//     const options = {
//       propList: ['*']
//     }
//     const rules =
//       '.rule { content: \'1rem\'; font-family: "1rem"; font-size: 1rem; }'
//     const expected =
//       '.rule { content: \'1rem\'; font-family: "1rem"; font-size: 16px; }'
//     const processed = postcss(remToPx(options)).process(rules).css

//     expect(processed).toBe(expected)
//   })

//   it('should not replace values in `url()`', function () {
//     const options = {
//       propList: ['*']
//     }
//     const rules = '.rule { background: url(1rem.jpg); font-size: 1rem; }'
//     const expected = '.rule { background: url(1rem.jpg); font-size: 16px; }'
//     const processed = postcss(remToPx(options)).process(rules).css

//     expect(processed).toBe(expected)
//   })
// })
// describe('unitPrecision', function () {
//   it('should replace using a decimal of 2 places', function () {
//     const rules = '.rule { font-size: 0.534375rem }'
//     const expected = '.rule { font-size: 8.55px }'
//     const options = {
//       unitPrecision: 2
//     }
//     const processed = postcss(remToPx(options)).process(rules).css

//     expect(processed).toBe(expected)
//   })
// })

// describe('propList', function () {
//   it('should only replace properties in the prop list', function () {
//     const rules =
//       '.rule { font-size: 1rem; margin: 1rem; margin-left: 0.5rem; padding: 0.5rem; padding-right: 1rem }'
//     const expected =
//       '.rule { font-size: 16px; margin: 16px; margin-left: 0.5rem; padding: 8px; padding-right: 16px }'
//     const options = {
//       propList: ['font', /^margin$/, 'pad']
//     }
//     const processed = postcss(remToPx(options)).process(rules).css

//     expect(processed).toBe(expected)
//   })

//   it('should only replace properties in the prop list with wildcard', function () {
//     const rules =
//       '.rule { font-size: 1rem; margin: 1rem; margin-left: 0.5rem; padding: 0.5rem; padding-right: 1rem }'
//     const expected =
//       '.rule { font-size: 1rem; margin: 16px; margin-left: 0.5rem; padding: 0.5rem; padding-right: 1rem }'
//     const options = {
//       propList: [/^margin$/]
//     }
//     const processed = postcss(remToPx(options)).process(rules).css

//     expect(processed).toBe(expected)
//   })

//   it('should replace all properties when white list is wildcard', function () {
//     const rules = '.rule { margin: 1rem; font-size: 0.9375rem }'
//     const expected = '.rule { margin: 16px; font-size: 15px }'
//     const options = {
//       propList: ['*']
//     }
//     const processed = postcss(remToPx(options)).process(rules).css

//     expect(processed).toBe(expected)
//   })
// })

// describe('selectorBlackList', function () {
//   it('should ignore selectors in the selector black list', function () {
//     const rules = '.rule { font-size: 0.9375rem } .rule2 { font-size: 15rem }'
//     const expected = '.rule { font-size: 15px } .rule2 { font-size: 15rem }'
//     const options = {
//       selectorBlackList: ['.rule2']
//     }
//     const processed = postcss(remToPx(options)).process(rules).css

//     expect(processed).toBe(expected)
//   })

//   it('should ignore every selector with `body$`', function () {
//     const rules =
//       'body { font-size: 1rem; } .class-body$ { font-size: 16rem; } .simple-class { font-size: 1rem; }'
//     const expected =
//       'body { font-size: 16px; } .class-body$ { font-size: 16rem; } .simple-class { font-size: 16px; }'
//     const options = {
//       selectorBlackList: ['body$']
//     }
//     const processed = postcss(remToPx(options)).process(rules).css

//     expect(processed).toBe(expected)
//   })

//   it('should only ignore exactly `body`', function () {
//     const rules =
//       'body { font-size: 16rem; } .class-body { font-size: 1rem; } .simple-class { font-size: 1rem; }'
//     const expected =
//       'body { font-size: 16rem; } .class-body { font-size: 16px; } .simple-class { font-size: 16px; }'
//     const options = {
//       selectorBlackList: [/^body$/]
//     }
//     const processed = postcss(remToPx(options)).process(rules).css

//     expect(processed).toBe(expected)
//   })
// })

// describe('replace', function () {
//   it('should leave fallback pixel unit with root em value', function () {
//     const options = {
//       replace: false
//     }
//     const expected = '.rule { font-size: 0.9375rem; font-size: 15px }'
//     const processed = postcss(remToPx(options)).process(basicCSS).css

//     expect(processed).toBe(expected)
//   })
// })

// describe('mediaQuery', function () {
//   it('should replace rem in media queries', function () {
//     const rules = '@media (min-width: 31.25rem) { .rule { font-size: 1rem } }'
//     const expected = '@media (min-width: 500px) { .rule { font-size: 16px } }'
//     const options = {
//       mediaQuery: true
//     }
//     const processed = postcss(remToPx(options)).process(rules).css

//     expect(processed).toBe(expected)
//   })
// })

// describe('minRemValue', function () {
//   it('should not replace values below minRemValue', function () {
//     const rules =
//       '.rule { border: 0.0625rem solid #000; font-size: 1rem; margin: 0.0625rem 0.625rem; }'
//     const expected =
//       '.rule { border: 0.0625rem solid #000; font-size: 16px; margin: 0.0625rem 10px; }'
//     const options = {
//       propList: ['*'],
//       minRemValue: 0.5
//     }
//     const processed = postcss(remToPx(options)).process(rules).css

//     expect(processed).toBe(expected)
//   })
// })

// describe('pxToRem', function () {
//   it('should convert from px to rem and back using postcss-pxtorem', function () {
//     const input =
//       'h1 { margin: 0 0 20px 8px; font-size: 13px; line-height: 1.2; letter-spacing: 1px; }'
//     const toRems = postcss(pxToRem()).process(input).css
//     const processed = postcss(remToPx()).process(toRems).css

//     expect(processed).toBe(input)
//   })
// })

// describe('filter-prop-list', function () {
//   it('should find "exact" matches from propList', function () {
//     const propList = [
//       'font-size',
//       'margin',
//       '!padding',
//       '*border*',
//       '*',
//       '*y',
//       '!*font*'
//     ]
//     const expected = 'font-size,margin'
//     expect(filterPropList.exact(propList).join(',')).toBe(expected)
//   })

//   it('should find "contain" matches from propList and reduce to string', function () {
//     const propList = [
//       'font-size',
//       '*margin*',
//       '!padding',
//       '*border*',
//       '*',
//       '*y',
//       '!*font*'
//     ]
//     const expected = 'margin,border'
//     expect(filterPropList.contain(propList).join(',')).toBe(expected)
//   })

//   it('should find "start" matches from propList and reduce to string', function () {
//     const propList = [
//       'font-size',
//       '*margin*',
//       '!padding',
//       'border*',
//       '*',
//       '*y',
//       '!*font*'
//     ]
//     const expected = 'border'
//     expect(filterPropList.startWith(propList).join(',')).toBe(expected)
//   })

//   it('should find "end" matches from propList and reduce to string', function () {
//     const propList = [
//       'font-size',
//       '*margin*',
//       '!padding',
//       'border*',
//       '*',
//       '*y',
//       '!*font*'
//     ]
//     const expected = 'y'
//     expect(filterPropList.endWith(propList).join(',')).toBe(expected)
//   })

//   it('should find "not" matches from propList and reduce to string', function () {
//     const propList = [
//       'font-size',
//       '*margin*',
//       '!padding',
//       'border*',
//       '*',
//       '*y',
//       '!*font*'
//     ]
//     const expected = 'padding'
//     expect(filterPropList.notExact(propList).join(',')).toBe(expected)
//   })

//   it('should find "not contain" matches from propList and reduce to string', function () {
//     const propList = [
//       'font-size',
//       '*margin*',
//       '!padding',
//       '!border*',
//       '*',
//       '*y',
//       '!*font*'
//     ]
//     const expected = 'font'
//     expect(filterPropList.notContain(propList).join(',')).toBe(expected)
//   })

//   it('should find "not start" matches from propList and reduce to string', function () {
//     const propList = [
//       'font-size',
//       '*margin*',
//       '!padding',
//       '!border*',
//       '*',
//       '*y',
//       '!*font*'
//     ]
//     const expected = 'border'
//     expect(filterPropList.notStartWith(propList).join(',')).toBe(expected)
//   })

//   it('should find "not end" matches from propList and reduce to string', function () {
//     const propList = [
//       'font-size',
//       '*margin*',
//       '!padding',
//       '!border*',
//       '*',
//       '!*y',
//       '!*font*'
//     ]
//     const expected = 'y'
//     expect(filterPropList.notEndWith(propList).join(',')).toBe(expected)
//   })
// })
