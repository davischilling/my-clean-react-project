import { Input } from '@/presentation/components'
import React from 'react'
import { render } from '@testing-library/react'
import { FormContext } from '@/presentation/contexts'

describe('Input Component', () => {
  test('should begin with readOnly', () => {
    const { getByTestId } = render(
      <FormContext.Provider value={{ state: { field: '' }, setState: () => {} }} >
        <Input name="field" />
      </FormContext.Provider>
    )
    const input = getByTestId('field') as HTMLInputElement
    expect(input.readOnly).toBe(true)
  })
})
