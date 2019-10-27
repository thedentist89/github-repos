import React, { Component } from "react";
import "./App.css";
import Card from "./card";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";

class App extends Component {
  state = {
    repos: [],
    pages: 1
  };

  async componentDidMount() {
    try {
      const { data } = await axios.get(
        `https://api.github.com/search/repositories?q=created:%3E2019-10-01&sort=stars&order=desc&page=${this.state.pages}`
      );
      const { items: repos } = data;
      let pages = this.state.pages;
      pages++;
      this.setState({ repos, pages });
    } catch (error) {
      console.log(error);
    }
  }

  fetchMoreData = async () => {
    let pages = this.state.pages;
    pages++;
    try {
      const { data } = await axios.get(
        `https://api.github.com/search/repositories?q=created:%3E2019-10-01&sort=stars&order=desc&page=${this.state.pages}`
      );
      const { items: repos } = data;

      this.setState({
        repos: this.state.repos.concat(repos),
        pages
      });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <div className="container">
        <InfiniteScroll
          dataLength={this.state.repos.length}
          next={this.fetchMoreData}
          hasMore={true}
          loader={<div className="loader"></div>}
          style={{ padding: 40, overflow: "hidden" }}
        >
          <Card repos={this.state.repos}></Card>
        </InfiniteScroll>
      </div>
    );
  }
}

export default App;
