import postcss from 'postcss'
import remToPx from '@/index'

const basicCSS = '.rule { font-size: 0.9375rem }'

describe('remToPx', function () {
  it('should work on the readme example', function () {
    const input =
      'h1 { margin: 0 0 20px; font-size: 2rem; line-height: 1.2; letter-spacing: 0.0625rem; }'
    const output =
      'h1 { margin: 0 0 20px; font-size: 32px; line-height: 1.2; letter-spacing: 1px; }'
    const processed = postcss(remToPx()).process(input).css

    expect(processed).toBe(output)
  })

  it('should replace the rem unit with px', function () {
    const processed = postcss(remToPx()).process(basicCSS).css
    const expected = '.rule { font-size: 15px }'

    expect(processed).toBe(expected)
  })

  it('should ignore non rem properties', function () {
    const expected = '.rule { font-size: 2em }'
    const processed = postcss(remToPx()).process(expected).css

    expect(processed).toBe(expected)
  })
})

describe('rootValue', function () {
  it('should replace using a root value of 10', function () {
    const expected = '.rule { font-size: 9.375px }'
    const options = {
      rootValue: 10
    }
    const processed = postcss(remToPx(options)).process(basicCSS).css

    expect(processed).toBe(expected)
  })
})
