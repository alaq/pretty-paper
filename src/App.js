import React, { Component } from 'react';
import ArticleCard from './ArticleCard';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor () {
    super();
    this.state = {
      url: '',
      articles: []
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleChange (evt) {
    this.setState({url: evt.target.value});
  }

  handleSubmit (evt) {
    evt.preventDefault();
    this.setState({
      url: evt.target.url.value
    })
    const url = 'https://mercury.postlight.com/parser?url=' + this.state.url;
    axios({
      url: url,
      headers: {
        'x-api-key': 'c5XlmpwcTjfLN7MiUi5eVmNzHfQU2bRMFVpgHsLJ',
        'Content-Type': 'application/json'
      }
    }).then(response => this.setState({articles: this.state.articles.concat(response.data)}))
  }

  handleDelete (evt) {
    evt.preventDefault();

  }

  render() {
    const { articles } = this.state;
    console.log(articles)
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Pretty Paper</h1>
          <p className="App-intro">
            Print your reading list.
          </p>
        </header>
        <form onSubmit={this.handleSubmit}>
          <textarea
            value={this.state.url}
            onChange={this.handleChange}
            type="text"
            name="url"
            placeholder="Add your articles here, separated by spaces, commas, or semicolons..."
             />
          <input type="submit" value="Fetch!" />
        </form>
        <ul>
          { articles && articles.map(article => <ArticleCard key={article.url} article={article} /> )}
        </ul>
      </div>
    );
  }
}

export default App;
