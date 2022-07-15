import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #2a2a72;
  min-height: 100vh;

  .container-github {
    width: 800px;
    .container-search {
      text-align: center;
      input {
        padding: 16px 10px;
        background-color: #4c2885;
        border: none;
        outline: none;
        font-size: 19px;
        color: #fff;
        width: 80%;
        border-radius: 12px;
        margin-bottom: 40px;
      }
    }

    .container-content {
      display: flex;
      /* justify-content: space-around; */
      align-items: center;
      gap: 5%;
      padding: 2rem;
      border-radius: 20px;
      background-color: #4c2885;

      .avatar {
        flex: 0 0 25%;
        img {
          max-width: 100%;
          border-radius: 50%;
          border: 10px solid #2a2a72;
        }
      }

      .info {
        flex: 0 0 70%;
        color: #fff;

        .story {
          margin: 14px 0;
        }

        .info-sub {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 20px;
          font-weight: 600;
        }

        .project {
          list-style: none;
          margin-top: 14px;

          li {
            display: inline-block;
            background-color: #212a72;
            padding: 2px 4px;
            margin-bottom: 10px;

            a {
              text-decoration: none;
              color: #fff;
              font-size: 14px;
            }
          }

          li:not(:last-child) {
            margin-right: 10px;
          }
        }
      }
    }
  }
`;

interface IInfo {
  name: string;
  avatar_url: string;
  bio: string;
  followers: number;
  following: number;
  public_repos: number;
  arrRepos: string;
  html_url: string
}

export default function GithubProfile() {
  const [userName, setUserName] = useState<string>("");
  const [infoUser, setInfoUser] = useState<IInfo>();
  const [repos, setRepos] = useState<any[]>([]);

  //   useEffect(() => {
  //     getApi();
  //   }, [userName]);

  const getApi = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const APIURL = "https://api.github.com/users/";
      const { data } = await axios(APIURL + userName);
      if (data) {
        const repos = data.repos_url;
        const dataRepos = await axios(repos);
        setRepos(dataRepos.data.slice(0, 5));
      }
      setInfoUser(data);
      setUserName("");
    } catch (err: any) {
      if (err.response.status == 404) {
        console.log("No profile with this username");
      }
    }
  };

  return (
    <>
      <Container>
        <div className="container-github">
          <form
            className="container-search"
            onSubmit={(e: React.FormEvent<HTMLFormElement>) => getApi(e)}
          >
            <input
              type="text"
              placeholder="Search a Github User"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </form>
          {infoUser ? (
            <div className="container-content">
              <div className="avatar">
                <img src={infoUser?.avatar_url} alt="" />
              </div>
              <div className="info">
                <h1 className="name">{infoUser?.name}</h1>
                <div className="story">{infoUser?.bio}</div>
                <div className="info-sub">
                  <div className="follower">{infoUser.followers} Followers</div>
                  <div className="following">
                    {infoUser.following} Following
                  </div>
                  <div className="repos">{infoUser.public_repos} Repos</div>
                </div>
                <ul className="project">
                  {repos.length > 0
                    ? repos.map((repo) => (
                        <li key={repo.id}>
                          <a href={`${infoUser.html_url}/${repo.name}`}>{repo.name}</a>
                        </li>
                      ))
                    : "No data"}
                </ul>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </Container>
    </>
  );
}
