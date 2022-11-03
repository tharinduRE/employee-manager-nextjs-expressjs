import { render, screen } from '@testing-library/react'
import EmployeePage from '../pages/employee/list'
import '@testing-library/jest-dom'

describe('Employee List page', () => {
  it('renders page of list of employees as table', () => {
    render(<EmployeePage />)

    const heading = screen.getByRole('heading', {
      name: /welcome to next\.js!/i,
    })

    expect(heading).toBeInTheDocument()
  })
})