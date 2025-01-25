import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'
const Menu = () => {
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
                </Navbar.Collapse>
            </Container>
        </Navbar></div>
    )
}

export default Menu