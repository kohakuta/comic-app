import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { Badge, Button, Card, Col, Container, ListGroup, ListGroupItem, Modal, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import { Link, useParams } from 'react-router-dom'
import Menu from './Menu';

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
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://otruyenapi.com/v1/api/truyen-tranh/${slug}`);
        setData(response);
        setLoading(false);
        console.log(response);
        // Sau khi dữ liệu được tải, cuộn đến đầu danh sách chapter
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchData();
  }, [slug]);
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
      <Container>
        <Menu></Menu>
        <Row>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>{getdata.data.data.seoOnPage.titleHead}</Card.Title>
                {getdata.data.data.seoOnPage.descriptionHead}</Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card style={{ width: '30rem' }}>
              <Card.Img variant="top" src={`https://img.otruyenapi.com/uploads/comics/${item.thumb_url}`} />
              <Card.Body>
                <Card.Title>{item.name || "No title"}</Card.Title>
                <Card.Text>{item.updatedAt}</Card.Text>
                <Card.Title dangerouslySetInnerHTML={{ __html: item.content }}></Card.Title>

                <Card.Text>
                  {item.category && item.category.length > 0 ? (item.category.map((category, index) => (
                    <Badge bg="info" key={index}>
                      {category.name}
                    </Badge>
                  ))
                  ) :
                    "Other"
                  }
                </Card.Text>
                <Card.Title>{item.status || "Unknow"}</Card.Title>

              </Card.Body>
            </Card>
          </Col>
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
        </Row>
        <Row>
          {/* Modal for Chapter */}
          {isModalOpen && getdataChaper && (
            <Modal show={isModalOpen} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>
                  Chapter {getdataChaper.data.item.chapter_name} - {getdataChaper.data.item.comic_name}
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Button variant="secondary" onClick={handlePreviousChapter} disabled={currentChapterIndex === 0}>
                  Previous Chapter
                </Button>
                <Button variant="primary" onClick={handleNextChapter} disabled={currentChapterIndex === item.chapters[0].server_data.length - 1}>
                  Next Chapter
                </Button>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
              </Modal.Body>
              <Modal.Body>
                {getdataChaper.data.item.chapter_image.map((chapterImage, index) => (
                  <Card.Img
                    key={index}
                    style={{ margin: 0 }}
                    src={`${getdataChaper.data.domain_cdn}/${getdataChaper.data.item.chapter_path}/${chapterImage.image_file}`}
                  />
                ))}
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handlePreviousChapter} disabled={currentChapterIndex === 0}>
                  Previous Chapter
                </Button>
                <Button variant="primary" onClick={handleNextChapter} disabled={currentChapterIndex === item.chapters[0].server_data.length - 1}>
                  Next Chapter
                </Button>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          )}
        </Row>
      </Container>
    </div>
  )
}

export default Detail