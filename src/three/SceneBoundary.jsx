import { Component } from 'react'

/**
 * If WebGL is unavailable or the 3D scene throws for any reason, this
 * quietly removes the canvas rather than taking the whole page down —
 * the rest of the portfolio (content, CV, contact) must always work.
 */
export default class SceneBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error) {
    // eslint-disable-next-line no-console
    console.warn('3D scene disabled after an error:', error)
  }

  render() {
    if (this.state.hasError) return null
    return this.props.children
  }
}
