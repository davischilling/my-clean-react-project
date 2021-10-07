import { Input } from '@/presentation/components'
import React from 'react'
import { render, RenderResult, fireEvent } from '@testing-library/react'
import { FormContext } from '@/presentation/contexts'

const makeSut = (): RenderResult => {
  return render(
    <FormContext.Provider value={{ state: { field: '' }, setState: () => {} }} >
      <Input name="field" />
    </FormContext.Provider>
  )
}

describe('Input Component', () => {
  test('should begin with readOnly', () => {
    const { getByTestId } = makeSut()
    const input = getByTestId('field') as HTMLInputElement
    expect(input.readOnly).toBe(true)
  })

  test('should remove readOnly on focus', () => {
    const { getByTestId } = makeSut()
    const input = getByTestId('field') as HTMLInputElement
    fireEvent.focus(input)
    expect(input.readOnly).toBe(false)
  })
})
