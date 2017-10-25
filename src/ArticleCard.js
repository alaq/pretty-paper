import React from 'react';

const ArticleCard = (props) => {
  const { article } = props;
  return (
    <li key={article.url}>
      {article.domain} - <strong>{article.title}</strong> {article.excerpt} <button onClick={() => props.delete(article.url)}>X</button>
    </li>
  )
}

export default ArticleCard;
