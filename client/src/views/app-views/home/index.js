import React, {useEffect} from 'react'
import {ROW_GUTTER} from "../../../constants/ThemeConstant";
import {Row, Col} from "antd"
import {useSelector} from "react-redux";


const Home = () => {
  const userInfo = useSelector(state => state.auth.userInfo);

  useEffect(() => {
    console.log("Home", userInfo)
  })
  return (
    <div>
      <Row gutter={ROW_GUTTER}>
        <Col xs={24} sm={24} md={24} lg={24}>
          <div className="slide-wrapper">
            <div className="hover-background"
             style={{
               backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.527),rgba(0, 0, 0, 0.8)),url(https://duhocnamphong.vn/images/news/2020/05/original/dai-hoc-greenwich_1590138469.jpg)`,
               height: '400px',
               backgroundRepeat: "no-repeat",
               backgroundSize: "cover",
               backgroundPosition: "bottom",
               color: '#fff',
               // background: '#364d79',
               borderRadius: "8px",
               position: "relative"
             }}
            >
              <div style={{
                position: "absolute",
                bottom: 32,
                left: 32
              }}>
                <h1 style={{color: "white"}}>Welcome</h1>
                <p>
                  Welcome to Course Management System for University of Greenwich Students.
                </p>
              </div>
            </div>
          </div>
        </Col>
      </Row>

    </div>
  )
}

export default Home;
