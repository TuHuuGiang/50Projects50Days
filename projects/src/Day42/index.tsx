import {useEffect, useState} from "react";
import axios from "axios";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

  .filters {
    width: 300px;
    box-shadow: 3px 3px 10px rgb(0 0 0 / 20%);
    border-radius: 6px;
    overflow: hidden;

    .header {
      background-color: #3e57db;
      color: #fff;
      padding: 30px 20px;

      span {
        display: block;
        font-size: 12px;
        font-weight: 700;
        margin: 5px 0 20px;
        opacity: 0.8;
      }

      input {
        background-color: rgba(0, 0, 0, 0.3);
        border: 0;
        border-radius: 50px;
        color: #fff;
        font-size: 16px;
        padding: 10px 15px;
        width: 100%;
        outline: none;
      }
    }

    .content {
      height: 400px;
      overflow-y: auto;

      li {
        padding: 20px;
        display: flex;
        gap: 10px;

        img {
          border-radius: 50%;
          object-fit: cover;
          height: 50px;
          width: 50px;
        }

        .info {
          h4 {
            font-size: 18px;
          }

          p {
            font-size: 13px;
          }
        }
      }

      li:not(:last-child) {
        border-bottom: 1px solid #f3f3f3;
      }
    }
  }
`;

export default function FilterUser() {
    const [arrUser, setArrUser] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');

    useEffect(() => {
        getApiUser();
    }, [])

    const getApiUser = async () => {
        try {
            const apis = await axios('https://randomuser.me/api?results=50');
            setArrUser(apis.data.results);
            console.log(apis.data.results)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <Container>
                <div className="filters">
                    <div className="header">
                        <h4>Live User Filter</h4>
                        <span>Search by name and/or location</span>
                        <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder='Search ...'/>
                    </div>
                    <ul className="content">
                        {
                            arrUser.map((user: any, index: number) => (
                                <li key={index}>
                                    <img src={user.picture.large} alt=""/>
                                    <div className="info">
                                        <h4>{`${user.name.first} ${user.name.last}`}</h4>
                                        <p>{`${user.location.city}, ${user.location.country}`}</p>
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </Container>
        </>
    );
}