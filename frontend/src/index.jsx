/* eslint no-console: ["error", { allow: ["warn", "error"] }] */

import React from 'react';
import ReactDOM from 'react-dom';

const baseURL = process.env.ENDPOINT;

const getNameFromApi = async () => {
  try {
    const uri = `${baseURL}/name`;
    const response = await fetch(uri);
    return response.json();
  } catch (error) {
    console.error(error);
  }
  return {};
};

class Worksample extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
    };
  }

  async componentWillMount() {
    const response = await getNameFromApi();
    console.log(response);
    const name = (response && response.name) ? response.name : 'unnamed one';
    this.setState({ name: name });
  }

  render() {
    const { name } = this.state;
    return (
      <div className="container">
        <h2>Hello {name}!</h2>
      </div>
    );
  }
}

ReactDOM.render(
  <Worksample />,
  document.getElementById('app')
);
