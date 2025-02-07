import axios from 'axios';
import React, { use, useEffect, useState } from 'react'
import { Button, Col, Container, Form, Nav, Navbar, NavDropdown, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
const Menu = () => {
    const navigate = useNavigate();
    const [getdata, setData] = useState([]);
    const items = getdata?.data?.items;
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("https://otruyenapi.com/v1/api/the-loai");
                setData(response.data);
                console.log(response);

            } catch (error) { }
        };
        fetchData();
    }, []);
    const handleSearch = (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const query = formData.get("keyword");
        navigate(`/search?query=${query}`); //chuyển hướng đến trang search
    };
    return (
        <div><Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to={"/"}>Trang chủ</Nav.Link>
                        <Nav.Link as={Link} to={"/danh-sach/truyen-moi"}>Truyện Mới</Nav.Link>
                        <Nav.Link as={Link} to={"/danh-sach/dang-phat-hanh"}>Đang phát hành</Nav.Link>
                        <Nav.Link as={Link} to={"/danh-sach/hoan-thanh"}>Hoàn thành</Nav.Link>
                        <Nav.Link as={Link} to={"/danh-sach/sap-ra-mat"}>Sắp ra mắt</Nav.Link>
                        <NavDropdown title="Thể loại" id="basic-nav-dropdown">
                            {items && items.length > 0 ? (
                                items.map((nav, index) => (<NavDropdown.Item as={Link} to={`/genre/${nav.slug}`}>{nav.name}</NavDropdown.Item>))) : (
                                <NavDropdown.Item as={Link} to={"/"}>Unknow</NavDropdown.Item>
                            )}
                        </NavDropdown>
                    </Nav>
                    <Form autoComplete="off" method="get" onSubmit={handleSearch}>
                            <Row>
                                <Col xs="auto">
                                    <Form.Control
                                        type="text"
                                        name="keyword"
                                        placeholder="Tìm kiếm truyện"
                                        className=" mr-sm-2"
                                    />
                                </Col>
                                <Col xs="auto">
                                    <Button type="submit">Tìm kiếm</Button>
                                </Col>
                            </Row>
                        </Form>
                    <Nav>
                        <Nav.Link as={Link} to={"/login"}>Đăng nhập</Nav.Link>
                        <Nav.Link as={Link} to={"/register"}>Đăng ký</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar></div>
    )
}

export default Menu