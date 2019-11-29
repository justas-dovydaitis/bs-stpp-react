import React from 'react';

class App extends React.Component {

  render() {
    return (
      <div>
        <div className="container mt-0">
          <div className="row">
            <div className="col-md-12">
              {this.props.children}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;