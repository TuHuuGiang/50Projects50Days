import {useEffect, useRef, useState} from "react";
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

interface IDataUser {
    image: string;
    name: string;
    country: string;
}

export default function FilterUser() {
    const [arrUser, setArrUser] = useState<IDataUser[]>([]);
    const [arrSearch, setArrSearch] = useState<IDataUser[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const typingTimeoutRef = useRef<any>();

    useEffect(() => {
        getApiUser();
    }, [])

    const getApiUser = async () => {
        try {
            const apis = await axios('https://randomuser.me/api?results=50');
            let infoUsers = apis.data.results.map((info: any) => {
                return {
                    image: info.picture.large,
                    name: `${info.name.first} ${info.name.last}`,
                    country: `${info.location.city} ${info.location.country}`
                }
            })
            setArrUser([...infoUsers]);
        } catch (err) {
            console.log(err)
        }
    }

    const searchUser = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;
        setSearchTerm(e.target.value);
        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        }
        typingTimeoutRef.current = setTimeout(() => {
            if (value !== "") {
                console.log(111)
                let findUser = arrUser.filter(info => info.name.toLowerCase().includes((value)));
                setArrSearch([...findUser]);
            } else {
                setArrSearch(arrUser)
            }
        }, 300);
    }

    return (
        <>
            <Container>
                <div className="filters">
                    <div className="header">
                        <h4>Live User Filter</h4>
                        <span>Search by name and/or location</span>
                        <input type="text" value={searchTerm} onChange={(e) => searchUser(e)} placeholder='Search ...'/>
                    </div>
                    <ul className="content">
                        {
                            arrSearch.length > 0 ?
                                arrSearch.map((user, index) => (
                                    <li key={index}>
                                        <img src={user.image} alt=""/>
                                        <div className="info">
                                            <h4>{user.name}</h4>
                                            <p>{user.country}</p>
                                        </div>
                                    </li>
                                ))
                                :
                                arrUser.map((user, index) => (
                                    <li key={index}>
                                        <img src={user.image} alt=""/>
                                        <div className="info">
                                            <h4>{user.name}</h4>
                                            <p>{user.country}</p>
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