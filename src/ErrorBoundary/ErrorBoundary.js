import React, {Component} from 'react'

export default class ErrorBoundary extends Component {
    state = {
        hasError: false
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
      }

    render() {
        if (this.state.hasError) {      
          return (
            <h2>Sorry an error has occurred and we could not display this component.</h2>
          );
        }
        return this.props.children;
      } 
}