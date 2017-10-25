import React from 'react';

const ArticleCard = (props) => {
  const { article } = props;
  return (
    <li key={article.url}>
      {article.domain} - <strong>{article.title}</strong> {article.excerpt} <button>X</button>
      {article.content}
    </li>
  )
}

export default ArticleCard;
