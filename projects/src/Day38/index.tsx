import styled from "styled-components";
import {HomeOutlined, PicCenterOutlined, ReadOutlined, TeamOutlined} from "@ant-design/icons";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: rgba(155, 89, 182, 0.7);
  font-family: 'Open Sans', sans-serif;
`;

const DisplayMobile = styled.div`
  height: 600px;
  width: 340px;
  border-radius: 15px;
  border: 3px solid #eee;
  background-color: #fff;
  
  .container-image {
    height: calc(100% - 60px);
    overflow: hidden;
    img {
      width: 100%;
      object-fit: cover;
      height: 100%;
    }
  }
  
  .nav {
    padding-top: 13px;
    ul {
      list-style: none;
      display: flex;
      justify-content: space-around;
      align-items: center;
      li {
        text-align: center;
        a {
          text-decoration: none;
          color: #777;
          
          p {
            font-size: 14px;  
          }
        }
      }
      li:hover a {
        color: #8e44ad;
      }
    }
  }
`;

export default function NavigateMobile() {
    return (
        <>
            <Container>
                <DisplayMobile>
                    <div className="container-image">
                        <img src="https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1053&q=80" alt=""/>
                    </div>
                    <nav className="nav">
                        <ul>
                            <li>
                                <a href="#">
                                    <i><HomeOutlined /></i>
                                    <p>Home</p>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <i><PicCenterOutlined /></i>
                                    <p>Work</p>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <i><ReadOutlined /></i>
                                    <p>Blog</p>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <i><TeamOutlined /></i>
                                    <p>About Us</p>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </DisplayMobile>
            </Container>
        </>
    );
}