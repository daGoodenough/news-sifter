import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import _ from 'lodash';

const Article = (props) => {
  const stories = useSelector((state) => state.articles);
  const thisURL = window.location.href;
  const id = parseInt(thisURL.substring(thisURL.lastIndexOf('/') + 1));
  const thisArticle = _.find(stories, (element) => element.id === id);
  console.log(thisArticle);

  return (
    <div>
      <h5 className="back-button">
        <Link to="/">Back</Link>
      </h5>
      <div className="article-box">
        <h2>{thisArticle.title}</h2>
        <div className="title-and-author">
          <h6>{thisArticle.author} | </h6> <h6> {thisArticle.source}</h6>
        </div>
        <article
          dangerouslySetInnerHTML={{ __html: thisArticle.htmlContent }}
        />
      </div>
    </div>
  );
};

export default Article;
