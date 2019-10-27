import React from "react";

const Card = ({ repos }) => {
  return (
    <div>
      {repos.map(repo => (
        <div className="card" key={repo.id}>
          <div>
            <img className="avatar" src={repo.owner.avatar_url} alt="avatar" />
          </div>
          <div>
            <h2 className="title">{repo.name}</h2>
            <p className="description">{repo.description}</p>
            <div className="stars">stars {repo.stargazers_count}</div>
            <div className="issues">issues {repo.open_issues}</div>
            <small>
              Submitted on {repo.created_at} by {repo.owner.login}
            </small>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card;
