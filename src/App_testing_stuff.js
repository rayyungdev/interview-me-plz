import "./static/style.css";
import { Helmet } from "react-helmet";

export default function App() {
  return (
    <div className="App">
      hello
      <div class="reddit_widget" data-subreddit="dota2"></div>
      <Helmet>
        <link href="https://giologist.github.io/article-react-reddit-widget/index.css" rel="stylesheet" />
        <script async src="https://giologist.github.io/article-react-reddit-widget/index.js"></script>
      </Helmet>
      <h1>Test</h1>
      <div
        data-symbol="GME"
        className="nicoraynaud-finance-widget"
        style={{
          width: "250px",
          margin: "auto",
          marginTop: "20px",
          outline: "10px"
        }}
      ></div>
    </div>
  );
}
