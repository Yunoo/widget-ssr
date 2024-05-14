import { expect, test } from 'vitest'
import { render } from '@testing-library/react'
import Layout from './layout'

test('Layout render and pass children', async () => {
  const jsx = await Layout({ children: <span>Test</span> })
  const layout = render(jsx, { container: document })
  expect(layout.getByText('Test')).toBeDefined()
})
