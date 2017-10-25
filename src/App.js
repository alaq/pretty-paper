import React, { Component } from 'react';
import ArticleCard from './ArticleCard';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor () {
    super();
    this.state = {
      urls: '',
      articles: []
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleChange (evt) {
    this.setState({url: evt.target.value});
  }

  addToArticleList (url) {
    url = 'https://mercury.postlight.com/parser?url=' + url;
    console.log('lets get the article', url);
    axios({
      url: url,
      headers: {
        'x-api-key': 'c5XlmpwcTjfLN7MiUi5eVmNzHfQU2bRMFVpgHsLJ',
        'Content-Type': 'application/json'
      }
    }).then(response => {
      this.setState({articles: this.state.articles.concat(response.data)})})
    .catch(console.error);
  }

  handleSubmit (evt) {
    evt.preventDefault();
    this.setState({
      urls: evt.target.urls.value
    })
    const urls = evt.target.urls.value;
    urls.split(' ').forEach(url => this.addToArticleList(url));
  }

  handleDelete (url) {
    console.log('lets delete')
    const articles = this.state.articles.filter(article => article.url !== url);
    this.setState({articles: articles});
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
            name="urls"
            placeholder="Add your articles here, separated by spaces, commas, or semicolons..."
             />
          <input type="submit" value="Fetch!" />
        </form>
        <ul>
          { articles && articles.map(article => <ArticleCard key={article.url} article={article} delete={this.handleDelete} /> )}
        </ul>
      </div>
    );
  }
}

export default App;
