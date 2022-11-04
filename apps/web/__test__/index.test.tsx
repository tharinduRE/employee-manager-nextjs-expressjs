import { render, screen } from '@testing-library/react'
import EmployeeAddPage from '../pages/employee/add'
import '@testing-library/jest-dom'

describe('Employee Add page', () => {

  it('renders page of list of employees as table', () => {
    render(<EmployeeAddPage />)

    const heading = screen.getByRole('heading', {
      name: /welcome to next\.js!/i,
    })

    expect(heading).toBeInTheDocument()
  })
})