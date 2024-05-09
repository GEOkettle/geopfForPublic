import express from 'express';
const router = express.Router();
import { NotionAPI } from 'notion-client';
import mariadb from 'mariadb'; // mariadb
import dotenv from 'dotenv'; 

dotenv.config(); 

const {  MARIA_HOST, MARIA_PORT, MARIA_DB, MARIA_USER, MARIA_PW,  } = process.env;

const mariadbPool = mariadb.createPool({
  host: MARIA_HOST,
  port: MARIA_PORT,
  user: MARIA_USER,
  password: MARIA_PW,
  database: MARIA_DB,
});

router.get('/mainArticle', async (req, res) => {
  // const notion = new NotionAPI({
  //   activeUser: '1f9f6762-ff1f-4a48-a4e9-5aae363e99d7',
  //   authToken: 'v02%3Auser_token_or_cookies%3Ay8gjKe-QA-X5BLICHss81rznkgpQBrOCZUJqi1nHHaHYtuuhJxjNx1O1evzs9_5hxCJGPY5Jd-gYgIlXUaliOzj-2nnV9fyqJTBxNGwV6PywYZInyUttn1GRVPfLkJGrQC9k',
  // });
  // 분리해서 두번부르는게 맞긴 함..
  let mariaConn;
  let result;
   try {
     mariaConn = await mariadbPool.getConnection();
     mariaConn.release();

     const mariaTest = await mariaConn.query('SELECT * FROM GEO_VISITOR');
     if (mariaTest.length >= 0) {
      let query = `SELECT IFNULL(
			                            (SELECT VISITOR
                                     FROM GEO_VISITOR 
			                              WHERE 1 = 1
			                                AND DATE(COUNT_DATE)  = CURDATE()
                                  ), 0) AS VISITOR
                        , IFNULL(
                                  (SELECT SUM(VISITOR)
                                     FROM GEO_VISITOR 
                                  ), 0) AS TOTAL_VISITOR;`;
      const visitor = await mariaConn.query(query);
       result = visitor[0]
       console.log(visitor)
       console.log(result)
     } else {
       throw new Error('디비 접속에 실패하였습니다.');
     }

   } catch (error) {
     console.error('데이터베이스 연결 오류:', error.message);
   }
  const notion = new NotionAPI();
  //https://furtive-lemming-021.notion.site/GEO-s-portfolio-83fca179f8314fd784e541e3368df6a5?pvs=4
  const recordMap = await notion.getPage('83fca179f8314fd784e541e3368df6a5');
  result.recordMap = recordMap
  return res.status(200).json({ result, status: 'success' });
});

router.get('/pjList', async (req, res) => {
  const notion = new NotionAPI();
  //https://furtive-lemming-021.notion.site/2528e3d7315245f799f82e26c552ee71?v=34e80522ec5e48a8b3ead60ddf96def1&pvs=4
  const recordMap = await notion.getPage('2528e3d7315245f799f82e26c552ee71');
  return res.status(200).json({ recordMap, status: 'success' });
});

router.get('/contact', async (req, res) => {
  const notion = new NotionAPI();
  //https://furtive-lemming-021.notion.site/c0d36f29a0e345ad894ffec4433667d7?pvs=4
  const recordMap = await notion.getPage('c0d36f29a0e345ad894ffec4433667d7');
  return res.status(200).json({ recordMap, status: 'success' });
});

router.get('/credit', async (req, res) => {
  const notion = new NotionAPI();
  //https://furtive-lemming-021.notion.site/Credit-6a61ba67b8074d2cb593ea26880294fc?pvs=4
  const recordMap = await notion.getPage('6a61ba67b8074d2cb593ea26880294fc');
  return res.status(200).json({ recordMap, status: 'success' });
});

router.post('/getPost', async (req, res) => {

  const notion = new NotionAPI();
  const postId = req.body.postId;
  const recordMap = await notion.getPage(postId);
  return res.json({ recordMap, status: 'success' });
});


export default router;
