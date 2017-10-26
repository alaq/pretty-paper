import React, { Component } from 'react';
import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc'; // sortable
import axios from 'axios';
import logo from './logo.svg';
import './App.css';
import FaNewspaper from 'react-icons/lib/fa/newspaper-o';
import FaPdf from 'react-icons/lib/fa/file-pdf-o';
import FaClose from 'react-icons/lib/fa/times-circle';


const SortableItem = SortableElement((props) => {
  return (
  <li className="card">
    <div className="thumb-div">
      <img src={props.article.lead_image_url} />
    </div>
    <div className="text-div">
      <strong>{props.article.title}</strong>
      <small>{props.article.domain} · by {props.article.author}</small>
      <p>{props.article.excerpt}</p>
      <small>Today · 7 minutes</small>
    </div>
    <div className="close-div">
      <FaClose className="close-icon" onClick={() => props.deleteFunc(props.article.url)} />
    </div>

  </li>
  )
}
);

const SortableList = SortableContainer((props) => {
  const { deleteFunc } = props;
  const { items } = props;
  return (
    <ul className="article-list">
      {items.map((article, index) => (
        <SortableItem key={`article-${index}`} index={index} article={article} deleteFunc={deleteFunc}/>
      ))}
    </ul>
  );
});

class App extends Component {

  constructor() {
    super();
    this.state = {
      urls: '',
      articles: [],
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.export = this.export.bind(this);
  }

  // SORTABLE
  onSortEnd = ({oldIndex, newIndex}) => {
    this.setState({
      articles: arrayMove(this.state.articles, oldIndex, newIndex),
    });
  };

  handleChange(evt) {
    this.setState({ urls: evt.target.value });
  }

  addToArticleList(url) {
    url = 'https://mercury.postlight.com/parser?url=' + url;
    axios({
      url: url,
      headers: {
        'x-api-key': 'c5XlmpwcTjfLN7MiUi5eVmNzHfQU2bRMFVpgHsLJ',
        'Content-Type': 'application/json'
      }
    }).then(response => {
      this.setState({ articles: this.state.articles.concat(response.data) })
    })
      .catch(console.error);
  }

  handleSubmit(evt) {
    evt.preventDefault();
    this.setState({
      urls: evt.target.urls.value
    })
    let urls = evt.target.urls.value;

    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);
    urls = urls.match(regex);
    urls.forEach(url => this.addToArticleList(url));

    this.setState({urls: ''});
  }

  handleDelete(url) {
    console.log('delete try', url);
    const articles = this.state.articles.filter(article => article.url !== url);
    this.setState({ articles: articles });
  }

  export() {
    this.state.articles.forEach(article => console.dir(article));
  }

  render() {
    const { articles } = this.state;
    console.log(articles);
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Pretty Paper</h1>
          Print your reading list.
          <form onSubmit={this.handleSubmit}>
            <textarea
              value={this.state.urls}
              onChange={this.handleChange}
              type="text"
              name="urls"
              placeholder="Add your articles here, separated by spaces, commas, or semicolons... or even URLs in text."
            />
            <div>
              {/* <input className="mainButton" type="submit" value="Fetch!" /> */}
              <button className="mainButton blue" type="submit"><FaNewspaper /> Add the <strong>Articles</strong></button>
              <button className="mainButton green" onClick={this.export}><FaPdf /> Generate <strong>PDF</strong></button>
            </div>
          </form>
        </header>
        <SortableList items={this.state.articles} onSortEnd={this.onSortEnd} deleteFunc={this.handleDelete} />
      </div>
    );
  }
}

export default App;
