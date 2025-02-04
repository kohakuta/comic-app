import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { Badge, Button, Card, Col, Container, ListGroup, ListGroupItem, Modal, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import { Link, useParams } from 'react-router-dom'
import Menu from './Menu';
import Footer from './Footer';
import Header from './Header';

const Detail = () => {
  const { slug } = useParams();
  const [getdata, setData] = useState([]);
  const [getdataChaper, setDataChapter] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const handleClose = () => setisModalOpen(false);
  const [isModalOpen, setisModalOpen] = useState(false);
  const item = getdata?.data?.data?.item;
  const [currentChapterIndex, setCurrentChapterIndex] = useState(null); // Lưu vị trí chapter hiện tại
  const modalBodyRef = useRef(null); // Tham chiếu đến phần tử chứa nội dung chapter

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://otruyenapi.com/v1/api/truyen-tranh/${slug}`);
        setData(response);
        setLoading(false);
        console.log(response);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchData();
  }, [slug]);

  useEffect(() => {
    // Cuộn lên đầu trang mỗi khi currentChapterIndex thay đổi
    if (modalBodyRef.current) {
      modalBodyRef.current.scrollTo(0, 0);
    }
  }, [currentChapterIndex]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const handleReadChapter = async (chapter_api, index) => {
    try {
      const response = await axios.get(`${chapter_api}`);
      setDataChapter(response.data);
      setCurrentChapterIndex(index); // Lưu vị trí chapter hiện tại
      setLoading(false);
      console.log(response);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
    setisModalOpen(true);
  };

  const handleNextChapter = () => {
    if (currentChapterIndex !== null && currentChapterIndex < item.chapters[0].server_data.length - 1) {
      const nextChapter = item.chapters[0].server_data[currentChapterIndex + 1];
      handleReadChapter(nextChapter.chapter_api_data, currentChapterIndex + 1);
    }
  };

  const handlePreviousChapter = () => {
    if (currentChapterIndex !== null && currentChapterIndex > 0) {
      const previousChapter = item.chapters[0].server_data[currentChapterIndex - 1];
      handleReadChapter(previousChapter.chapter_api_data, currentChapterIndex - 1);
    }
  };

  return (
    <div>
      <Helmet>
        <title>{getdata.data.data.seoOnPage.titleHead}</title>
      </Helmet>
      <Header></Header>
      <Container className="mt-3">
        <Menu></Menu>
        <div><hr></hr></div>
        <Row className='justify-content-md-center p-3'>
          <Col>
            <Card>
              <div className="text-center">
                <Card.Img variant="center" src={`https://img.otruyenapi.com/uploads/comics/${item.thumb_url}`}/>
              </div>
              <Card.Body>
                <Card.Title>{item.name || "No title"}</Card.Title>
                <Card.Text>Cập nhật: {item.updatedAt}</Card.Text>
                <Card.Title dangerouslySetInnerHTML={{ __html: item.content }}></Card.Title>

                <Card.Text>Thể Loại:
                  {item.category && item.category.length > 0 ? (item.category.map((category, index) => (
                    <Badge bg="info" key={index}>
                      {category.name}
                    </Badge>
                  ))
                  ) :
                    "Other"
                  }
                </Card.Text>
                <Card.Title>Tình trạng: {item.status || "Unknow"}</Card.Title>

              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Col>
          <ListGroup className="scrollable-list">
            <ListGroupItem>
              {item.chapters &&
                item.chapters[0]?.server_data?.map((listchapter, index) => (

                  <ListGroup.Item className="chapter-click"
                    key={index}
                    onClick={() => handleReadChapter(listchapter.chapter_api_data, index)}
                    style={{ cursor: 'pointer', height: 'fit-content' }}
                  >
                    Chapter: {listchapter.chapter_name}
                  </ListGroup.Item>
                ))}
            </ListGroupItem>
          </ListGroup>
        </Col>
        <Row>
          {/* Modal for Chapter */}
          {isModalOpen && getdataChaper && (
            <Modal show={isModalOpen} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>
                  Chapter {getdataChaper.data.item.chapter_name} - {getdataChaper.data.item.comic_name}
                </Modal.Title>
              </Modal.Header>
              <Modal.Body ref={modalBodyRef} style={{ overflowY: 'auto', maxHeight: '70vh' }}>
                {getdataChaper.data.item.chapter_image.map((chapterImage, index) => (
                  <Card.Img
                    key={index}
                    style={{ margin: 0 }}
                    src={`${getdataChaper.data.domain_cdn}/${getdataChaper.data.item.chapter_path}/${chapterImage.image_file}`}
                  />
                ))}
              </Modal.Body>
              <Modal.Footer style={{ justifyContent: 'space-between' }}>
                <Button variant="secondary" onClick={handlePreviousChapter} disabled={currentChapterIndex === 0}>
                 Trang trước
                </Button>
                <Button variant="primary" onClick={handleNextChapter} disabled={currentChapterIndex === item.chapters[0].server_data.length - 1}>
                 Trang sau
                </Button>
                <Button variant="secondary" onClick={handleClose}>
                 Đóng
                </Button>
              </Modal.Footer>
            </Modal>
          )}
        </Row>
        <div><hr></hr></div>
      </Container>
      <Footer></Footer>
    </div>
  )
}

export default Detail;