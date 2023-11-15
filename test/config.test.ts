import { getConfig } from '@/shared'
describe('config', () => {
  it('getConfig default', () => {
    expect(getConfig()).toMatchSnapshot()
  })

  it('getConfig with wild prop', () => {
    expect(
      getConfig({
        propList: ['*']
      })
    ).toMatchSnapshot()
  })
})
