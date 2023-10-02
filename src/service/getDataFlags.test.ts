import {describe, expect, test} from 'vitest'
import { getDataFlags } from './getDataFlags'

describe('Get data flags', () => { 
  test('Shoul be a return flags', () => {

    const getMockDataReport = () => {
      return getDataFlags.map(flag => flag)
    }

    expect(getMockDataReport()).toEqual(getDataFlags)
    
  })
})