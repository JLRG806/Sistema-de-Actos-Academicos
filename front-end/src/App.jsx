import { createSignal } from 'solid-js'
import { Button, Form, Placeholder } from 'solid-bootstrap'
import solidLogo from './assets/solid.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = createSignal(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} class="logo" alt="Vite logo" />
        </a>
        <a href="https://solidjs.com" target="_blank">
          <img src={solidLogo} class="logo solid" alt="Solid logo" />
        </a>
      </div>
      <h1>Vite + Solid</h1>
      <div class="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count()}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p class="read-the-docs">
        Click on the Vite and Solid logos to learn more
      </p>

      <Form>

        <Form.Group class="mb-3" controlId="formBasicEmail">

          <Form.Label>Email address</Form.Label>

          <Form.Control type="email" placeholder="Enter email" />

          <Form.Text class="text-muted">

            We'll never share your email with anyone else.

          </Form.Text>

        </Form.Group>



        <Form.Group class="mb-3" controlId="formBasicPassword">

          <Form.Label>Password</Form.Label>

          <Form.Control type="password" placeholder="Password" />

        </Form.Group>



        <Form.Group class="mb-3" controlId="formBasicCheckbox">

          <Form.Check type="checkbox" label="Check me out" />

        </Form.Group>



        <Button variant="primary" type="submit">Submit</Button>

      </Form>
      <br />

      <p aria-hidden="true">
        <Placeholder xl={6} />
      </p>
      <Placeholder.Button xs={4} aria-hidden="true" />
    </>
  )
}

export default App
