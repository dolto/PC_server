import express, { Request, Response } from "express";
import * as mysql from "mysql";

const app = express();
const db = mysql.createPool({
  host:"localhost",
  port:3306,
  user:"tester",
  password:"1234",
  database:"mysql",
  multipleStatements : true
});

app.use(function(req: Request, res: Response, next: any) {
  express.urlencoded({extended: true});
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
  res.header("Access-Control-Allow-Headers", "x-access-token, Origin, X-Requested-With, Content-TYpe, Accept");
  next();
});

// 프론트 요구사항
// 	0. 모든 리스트출력은 10개단위로 출력
// 	1. 고객 리스트 출력
// 	2. 좌석 리스트 출력 (어느 고객이 어느 좌석에 있는지 확인 및 상태별로 색상 집어넣기)
// 	3. 상품 주문 기록 (주문완료된 상품으로 전환 혹은 취소까지)
// 	4. 완료된 상품 주문기록 출력
// 	5. 취소된 상품 주문기록 출력
// 	6. 시간 주문 기록 출력
// 	7. 자리사용기록 출력 (각 자리별로 필터해서 출력 기능)
// 	8. 키오스크 상태출력 (고장여부)

app.get("/test", (req: Request, res: Response) => {
  let sqlQuery: string = "SELECT * FROM employees.employees limit 1,10;";
  let message:string;
  let inputSql = req.query.sql;

  if(inputSql != null) sqlQuery = inputSql as string;
  console.log(db);
  db.query(sqlQuery, (err, result) => {
    //console.log(result);
    //console.log(err);

    message = `<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">let inputSql = req.query
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>pc방 관리창</title>
</head>
<body>
    보낸쿼리: ${sqlQuery}
    <br/>
    받은데이터: 
    ${JSON.stringify(result)}
    <br/>
    <form action="" method="get">
        입력할 쿼리: <input type="text" name="sql"><br/>let inputSql = req.query
        <input type="submit" value="전송">
   </form> 
</body>
</html>`

    res.send(message);
  });
  //res.send(sendData);
});

app.get("/memberlist", (req: Request, res: Response) => {
  let message:string = "";
  let data:string = "";
  let page:number = req.query.page != null ? Number.parseInt(req.query.page as string):0;
  let go_back:string = req.query.go_back as string;

  if(go_back == "<"){
    page = Math.max(0, page-1);
  }
  else if(go_back == ">"){
    page += 1;
  }

  let sqlQuery: string = `SELECT * FROM PC.member limit ${page*10},${10};`;
  //console.log(db);
  console.log(sqlQuery+"????");
  db.query(sqlQuery, (err, result) => {
    console.log(result);
    //console.log(err);
    let count = 0;
    for(let _ in result){
      let birthday = new Date(result[count]['memberBirthday']);
      let birthday_string: string = "null";
      if(result[count]['memberBirthday'] != null) 
        birthday_string = birthday.getFullYear() + "년 " + birthday.getMonth() + "월 " + birthday.getDate() + "일";
      data += `
        <tr style="background-color: whitesmoke;">
          <td>${result[count]['memberID']}</td>
          <td>${result[count]['memberPhoneNumber']}</td>
          <td>${result[count]['memberEmail']}</td>
          <td>${birthday_string}</td>
          <td>${result[count]['memberUesdTime']}</td>
          <td>${result[count]['memberLeftTime']}</td>
        </tr>`;
      count += 1;
    }

    message = `<!DOCTYPE html>
    <html lang="ko">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>pc방 관리창</title>
    </head>
    <body>
      <div style="display: block; width: fit-content; height: 100%; border-style: solid; border-width: 2px; float: left">
        <form action="memberlist" method="get"> <input style="width: 100%; padding:10px;" type="submit" value="고객리스트"></form>
        <form action="seatlist" method="get"> <input style="width: 100%; padding:10px;" type="submit" value="좌석리스트"></form>
        <form action="productlist" method="get"> <input style="width: 100%; padding:10px;" type="submit" value="상품정보"></form>
        <form action="product_order_complite_list" method="get"> <input style="width: 100%; padding:10px;" type="submit" value="완료된주문"></form>
        <form action="product_order_loding_list" method="get"> <input style="width: 100%; padding:10px;" type="submit" value="진행중인주문"></form>
        <form action="product_cancle_log_list" method="get"> <input style="width: 100%; padding:10px;" type="submit" value="취소된주문"></form>
        <form action="time_order_log_list" method="get"> <input style="width: 100%; padding:10px;" type="submit" value="시간주문기록"></form>
        <form action="seat_used_log_list" method="get"> <input style="width: 100%; padding:10px;" type="submit" value="자리사용기록"></form>
      </div>  
       <form style="display: inline-block;" method="get">
            <div style="border-style: solid;">
                <h1>고객정보</h1>
                페이지: <input type="text" name="page" value="${page}">
                <table border="1">
                  <th>
                    ID
                  </th>
                  <th>
                    연락처
                  </th>
                  <th>
                    이메일 
                  </th>
                  <th>
                    생년월일
                  </th>
                  <th>
                    사용시간
                  </th>
                  <th>
                    잔여시간
                  </th>
                  ${data}
              </table>
                <br />
                <input type="submit" name="go_back" value="<"> <input type="submit" name="go_back" value=">">
            </div>
       </form> 
    </body>
    </html>`

    res.send(message);
  });
  //res.send(sendData);
});

app.get("/seatlist", (req: Request, res: Response) => {
  let message:string = "";
  let data:string = "";
  let page:number = req.query.page != null ? Number.parseInt(req.query.page as string):0;
  let go_back:string = req.query.go_back as string;
  let extraSql:string = "";

  if(go_back == "<"){
    page = Math.max(0, page-1);
  }
  else if(go_back == ">"){
    page += 1;
  }
  else if(go_back == "submit"){
    if(req.query.state != null){
      console.log(typeof req.query.state);
      if(typeof req.query.state === 'string'){ 
        extraSql += `UPDATE PC.seat SET seatBrokend = NOT(seatBrokend) WHERE seatID = ${req.query.state};\n`;
      }
      else{
        let state:[] = req.query.state as [];
        state.forEach(i => {
          extraSql += `UPDATE PC.seat SET seatBrokend = NOT(seatBrokend) WHERE seatID = ${i};\n`;
        });
      }
    }
  }

  let sqlQuery: string = extraSql + `SELECT * FROM PC.seat limit ${page*10},${10};`;
  //console.log(db);
  console.log(sqlQuery+"????");
  db.query(sqlQuery, (err, result) => {
    //console.log(Array.isArray(result));
    //console.log(err);
    let count = 0;
    //if(Array.isArray(result)){
      for(let i in result){
        // console.log(result[i]);
        if(Array.isArray(result[i])){
          result = result[i];
          console.log(result);
        }
      }
    //}
    // if(result.length != 1){
    //   result = result[result.length - 1];
    // } 에러가 날 가능성이 농후함 왜인지는 몰루
    for(let i in result){
      // console.log("이쁜녀석");
      // console.log(result[i]);

      if(result[count]['seatBrokend'] == 0){
        data += `
        <tr style="background-color: orangered;">
          <td>${result[count]['seatID']}</td> 
          <td>${result[count]['seatMemberID']==null?'빈자리':result[count]['seatMemberID']}</td>
          <td>고장<input type="checkbox" name="state" value="${result[count]['seatID']}"></td>
        </tr>`;
      }
      else if(result[count]['seatMemberID'] != null){
        data += `
        <tr style="background-color: aquamarine;">
          <td>${result[count]['seatID']}</td>
          <td>${result[count]['seatMemberID']==null?'빈자리':result[count]['seatMemberID']}</td>
          <td>정상<input type="checkbox" name="state" value="${result[count]['seatID']}"></td>
        </tr>`;
      }
      else{
        data += `
        <tr style="background-color: whitesmoke;">
          <td>${result[count]['seatID']}</td>
          <td>${result[count]['seatMemberID']}</td>
          <td>정상<input type="checkbox" name="state" value="${result[count]['seatID']}"></td>
        </tr>`;        
      }
      count += 1;
    }

    message = `<!DOCTYPE html>
    <html lang="ko">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>pc방 관리창</title>
    </head>
    <body>
      <div style="display: block; width: fit-content; height: 100%; border-style: solid; border-width: 2px; float: left">
        <form action="memberlist" method="get"> <input style="width: 100%; padding:10px;" type="submit" value="고객리스트"></form>
        <form action="seatlist" method="get"> <input style="width: 100%; padding:10px;" type="submit" value="좌석리스트"></form>
        <form action="productlist" method="get"> <input style="width: 100%; padding:10px;" type="submit" value="상품정보"></form>
        <form action="product_order_complite_list" method="get"> <input style="width: 100%; padding:10px;" type="submit" value="완료된주문"></form>
        <form action="product_order_loding_list" method="get"> <input style="width: 100%; padding:10px;" type="submit" value="진행중인주문"></form>
        <form action="product_cancle_log_list" method="get"> <input style="width: 100%; padding:10px;" type="submit" value="취소된주문"></form>
        <form action="time_order_log_list" method="get"> <input style="width: 100%; padding:10px;" type="submit" value="시간주문기록"></form>
        <form action="seat_used_log_list" method="get"> <input style="width: 100%; padding:10px;" type="submit" value="자리사용기록"></form>
      </div>  
       <form style="display: inline-block;" method="get">
            <div style="border-style: solid;">
              <h1>좌석정보</h1>
                페이지: <input type="text" name="page" value="${page}">
                <table border="1">
                  <th>
                    좌석번호
                  </th>
                  <th>
                    회원ID
                  </th>
                  <th>
                    고장여부
                  </th>
                  ${data}
              </table>
                <br />
                <input type="submit" name="go_back" value="<"> <input type="submit" name="go_back" value=">"> <input type="submit" name="go_back" value="submit">
            </div>
       </form> 
    </body>
    </html>`

    res.send(message);
  });
  
  
  //console.log(req.query.state); //배열로 들어옴
  //res.send(sendData);
});

app.get("/productlist", (req: Request, res: Response) => {
  let message:string = "";
  let data:string = "";
  let page:number = req.query.page != null ? Number.parseInt(req.query.page as string):0;
  let go_back:string = req.query.go_back as string;

  if(go_back == "<"){
    page = Math.max(0, page-1);
  }
  else if(go_back == ">"){
    page += 1;
  }

  let sqlQuery: string = `SELECT * FROM PC.product limit ${page*10},${10};`;
  //console.log(db);
  console.log(sqlQuery+"????");
  db.query(sqlQuery, (err, result) => {
    console.log(result);
    //console.log(err);

    let count = 0;
    for(let _ in result){
      let is_empty:string = "";
      if (result[count]['productInventory'] <= 0){
          is_empty = `<td style="background-color: orangered;">${"품절"}</td>`;
      }
      else{
        is_empty = `<td">${result[count]['productInventory']}</td>`;
      }
      data += `
        <tr style="background-color: whitesmoke;">
          <td>${result[count]['productName']}</td>
          <td>${result[count]['productCost']+"원"}</td>
          <td>${is_empty}</td>
          <td>${result[count]['productSales']}</td>
        </tr>`;
      count += 1;
    }

    message = `<!DOCTYPE html>
    <html lang="ko">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>pc방 관리창</title>
    </head>
    <body>
      <div style="display: block; width: fit-content; height: 100%; border-style: solid; border-width: 2px; float: left">
        <form action="memberlist" method="get"> <input style="width: 100%; padding:10px;" type="submit" value="고객리스트"></form>
        <form action="seatlist" method="get"> <input style="width: 100%; padding:10px;" type="submit" value="좌석리스트"></form>
        <form action="productlist" method="get"> <input style="width: 100%; padding:10px;" type="submit" value="상품정보"></form>
        <form action="product_order_complite_list" method="get"> <input style="width: 100%; padding:10px;" type="submit" value="완료된주문"></form>
        <form action="product_order_loding_list" method="get"> <input style="width: 100%; padding:10px;" type="submit" value="진행중인주문"></form>
        <form action="product_cancle_log_list" method="get"> <input style="width: 100%; padding:10px;" type="submit" value="취소된주문"></form>
        <form action="time_order_log_list" method="get"> <input style="width: 100%; padding:10px;" type="submit" value="시간주문기록"></form>
        <form action="seat_used_log_list" method="get"> <input style="width: 100%; padding:10px;" type="submit" value="자리사용기록"></form>
      </div>  
       <form style="display: inline-block;" method="get">
            <div style="border-style: solid;">
              <h1>상품정보</h1>
                페이지: <input type="text" name="page" value="${page}">
                <table border="1">
                  <th>
                    상품명
                  </th>
                  <th>
                    가격
                  </th>
                  <th>
                    재고
                  </th>
                  <th>
                    누적판매량
                  </th>
                  ${data}
              </table>
                <br />
                <input type="submit" name="go_back" value="<"> <input type="submit" name="go_back" value=">">
            </div>
       </form> 
    </body>
    </html>`

    res.send(message);
  });
  //res.send(sendData);
  //console.log(req.query.state); //배열로 들어옴
  //res.send(sendData);
});

app.get("/product_order_complite_list", (req: Request, res: Response) => {
  let message:string = "";
  let data:string = "";
  let page:number = req.query.page != null ? Number.parseInt(req.query.page as string):0;
  let go_back:string = req.query.go_back as string;

  if(go_back == "<"){
    page = Math.max(0, page-1);
  }
  else if(go_back == ">"){
    page += 1;
  }

  let sqlQuery: string = `SELECT * FROM PC.POCR limit ${page*10},${10};`;
  //console.log(db);
  console.log(sqlQuery+"????");
  db.query(sqlQuery, (err, result) => {
    console.log(result);
    //console.log(err);

    let count = 0;
    for(let _ in result){
      data += `
        <tr style="background-color: whitesmoke;">
          <td>${result[count]['POCR_SeatID']}</td>
          <td>${result[count]['POCR_MemberID']}</td>
          <td>${result[count]['POCR_SeatID']}</td>
          <td>${result[count]['POCR_Payment']}</td>
          <td>${result[count]['POCR_Inventory']}</td>
        </tr>`;
      count += 1;
    }

    message = `<!DOCTYPE html>
    <html lang="ko">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>pc방 관리창</title>
    </head>
    <body>
      <div style="display: block; width: fit-content; height: 100%; border-style: solid; border-width: 2px; float: left">
        <form action="memberlist" method="get"> <input style="width: 100%; padding:10px;" type="submit" value="고객리스트"></form>
        <form action="seatlist" method="get"> <input style="width: 100%; padding:10px;" type="submit" value="좌석리스트"></form>
        <form action="productlist" method="get"> <input style="width: 100%; padding:10px;" type="submit" value="상품정보"></form>
        <form action="product_order_complite_list" method="get"> <input style="width: 100%; padding:10px;" type="submit" value="완료된주문"></form>
        <form action="product_order_loding_list" method="get"> <input style="width: 100%; padding:10px;" type="submit" value="진행중인주문"></form>
        <form action="product_cancle_log_list" method="get"> <input style="width: 100%; padding:10px;" type="submit" value="취소된주문"></form>
        <form action="time_order_log_list" method="get"> <input style="width: 100%; padding:10px;" type="submit" value="시간주문기록"></form>
        <form action="seat_used_log_list" method="get"> <input style="width: 100%; padding:10px;" type="submit" value="자리사용기록"></form>
      </div>  
       <form style="display: inline-block;" method="get">
            <div style="border-style: solid;">
            <h1>완료된주문</h1>
                페이지: <input type="text" name="page" value="${page}">
                <table border="1">
                  <th>
                    상품명
                  </th>
                  <th>
                    주문자ID
                  </th>
                  <th>
                    주문한좌석ID
                  </th>
                  <th>
                    결제수단
                  </th>
                  <th>
                    주문수량
                  </th>
                  ${data}
              </table>
                <br />
                <input type="submit" name="go_back" value="<"> <input type="submit" name="go_back" value=">">
            </div>
       </form> 
    </body>
    </html>`

    res.send(message);
  });
  //res.send(sendData);
  //console.log(req.query.state); //배열로 들어옴
  //res.send(sendData);
});

app.get("/product_cancle_log_list", (req: Request, res: Response) => {
  let message:string = "";
  let data:string = "";
  let page:number = req.query.page != null ? Number.parseInt(req.query.page as string):0;
  let go_back:string = req.query.go_back as string;

  if(go_back == "<"){
    page = Math.max(0, page-1);
  }
  else if(go_back == ">"){
    page += 1;
  }

  let sqlQuery: string = `SELECT * FROM PC.POCL limit ${page*10},${10};`;
  //console.log(db);
  console.log(sqlQuery+"????");
  db.query(sqlQuery, (err, result) => {
    console.log(result);
    //console.log(err);

    let count = 0;
    for(let _ in result){
      data += `
        <tr style="background-color: whitesmoke;">
          <td>${result[count]['POCL_SeatID']}</td>
          <td>${result[count]['POCL_MemberID']}</td>
          <td>${result[count]['POCL_SeatID']}</td>
          <td>${result[count]['POCL_Payment']}</td>
          <td>${result[count]['POCL_Inventory']}</td>
        </tr>`;
      count += 1;
    }

    message = `<!DOCTYPE html>
    <html lang="ko">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>pc방 관리창</title>
    </head>
    <body>
      <div style="display: block; width: fit-content; height: 100%; border-style: solid; border-width: 2px; float: left">
        <form action="memberlist" method="get"> <input style="width: 100%; padding:10px;" type="submit" value="고객리스트"></form>
        <form action="seatlist" method="get"> <input style="width: 100%; padding:10px;" type="submit" value="좌석리스트"></form>
        <form action="productlist" method="get"> <input style="width: 100%; padding:10px;" type="submit" value="상품정보"></form>
        <form action="product_order_complite_list" method="get"> <input style="width: 100%; padding:10px;" type="submit" value="완료된주문"></form>
        <form action="product_order_loding_list" method="get"> <input style="width: 100%; padding:10px;" type="submit" value="진행중인주문"></form>
        <form action="product_cancle_log_list" method="get"> <input style="width: 100%; padding:10px;" type="submit" value="취소된주문"></form>
        <form action="time_order_log_list" method="get"> <input style="width: 100%; padding:10px;" type="submit" value="시간주문기록"></form>
        <form action="seat_used_log_list" method="get"> <input style="width: 100%; padding:10px;" type="submit" value="자리사용기록"></form>
      </div>  
       <form style="display: inline-block;" method="get">
            <div style="border-style: solid;">
            <h1>취소된주문</h1>
                페이지: <input type="text" name="page" value="${page}">
                <table border="1">
                  <th>
                    상품명
                  </th>
                  <th>
                    주문자ID
                  </th>
                  <th>
                  주문한좌석ID
                 </th>
                  <th>
                    결제수단
                  </th>
                  <th>
                    주문수량
                  </th>
                  ${data}
              </table>
                <br />
                <input type="submit" name="go_back" value="<"> <input type="submit" name="go_back" value=">">
            </div>
       </form> 
    </body>
    </html>`

    res.send(message);
  });
  //res.send(sendData);
  //console.log(req.query.state); //배열로 들어옴
  //res.send(sendData);
});

app.get("/product_order_loding_list", async (req: Request, res: Response) => {
  let message:string = "";
  let data:string = "";
  let page:number = req.query.page != null ? Number.parseInt(req.query.page as string):0;
  let go_back:string = req.query.go_back as string;
  let extraSql:string = "";
  let sqlQuery: string = `SELECT p.POL_SeatID, p.POL_MemberID, p.POL_Payment, p.POL_Inventory, p.POL_Index, pd.productName FROM PC.POL as p INNER JOIN PC.product as pd ON p.POL_productID = pd.productID limit ${page*10},${10};`;

  if(go_back == "<"){
    page = Math.max(0, page-1);
  }
  else if(go_back == ">"){
    page += 1;
  }
  else if(go_back == "submit"){
    // <td>${result[count]['POL_SeatID']}</td>
    // <td>${result[count]['POL_MemberID']}</td>
    // <td>${result[count]['POL_SeatID']}</td>
    // <td>${result[count]['POL_Payment']}</td>
    // <td>${result[count]['POL_Inventory']}</td>
    //console.log(db);
    if(req.query.complite != null){
      let complite = req.query.complite;
      if(typeof complite === 'string'){ //애초에 주문중이 가능하려면 수량이 맞는지 미리 확인했을거기 때문에 예외처리는 생략
        // db.query(`SELECT * FROM PC.POL WHERE POL_Index = ${complite}`, (err, result) => {
        //   for(let _ in result){
        //     let pol_inventory = result['POL_Inventory']; 
        //     let pol_index = result['POL_Index'];
        //     let pro_code = result['POL_ProductID'];

        //   }
        // });
        extraSql += `INSERT IGNORE INTO PC.POCR (POCR_SeatID, POCR_Payment, POCR_MemberID, POCR_Inventory, POCR_ProductID)
        SELECT POL_SeatID, POL_Payment, POL_MemberID, POL_Inventory, POL_ProductID
        FROM PC.POL
        WHERE POL_Index = ${complite};
        UPDATE PC.product 
        SET productInventory = productInventory - (SELECT POL_Inventory FROM PC.POL WHERE POL_Index = ${complite})
        ,productSales = productSales + (SELECT POL_Inventory FROM PC.POL WHERE POL_Index = ${complite})
        WHERE productID = (SELECT POL_ProductID FROM PC.POL WHERE POL_Index = ${complite});
        DELETE FROM PC.POL WHERE POL_Index = ${complite};`;
      } //TODO 연속된 코드가 왜 동작하지 않는지 알아내기 
      else{
        // console.log("complite data : "+complite);
        // console.log("complite type : "+typeof complite);
        // console.log("complite is array : "+Array.isArray(complite));
        let mul_complite:Array<string> = complite as Array<string>;
        mul_complite.forEach(i => {
          // console.log("i type is "+ typeof i);
          extraSql += `INSERT IGNORE INTO PC.POCR (POCR_SeatID, POCR_Payment, POCR_MemberID, POCR_Inventory, POCR_ProductID)
          SELECT POL_SeatID, POL_Payment, POL_MemberID, POL_Inventory, POL_ProductID
          FROM PC.POL
          WHERE POL_Index = ${i};
          UPDATE PC.product 
          SET productInventory = productInventory - (SELECT POL_Inventory FROM PC.POL WHERE POL_Index = ${i})
          ,productSales = productSales + (SELECT POL_Inventory FROM PC.POL WHERE POL_Index = ${i})
          WHERE productID = (SELECT POL_ProductID FROM PC.POL WHERE POL_Index = ${i});
          DELETE FROM PC.POL WHERE POL_Index = ${i};`;
        });
      }
    }
    if(req.query.cancle != null){
      let cancle = req.query.cancle;
      if(typeof cancle === 'string'){
        extraSql += `INSERT IGNORE INTO PC.POCL (POCL_SeatID, POCL_Payment, POCL_MemberID, POCL_Inventory, POCL_ProductID)
        SELECT POL_SeatID, POL_Payment, POL_MemberID, POL_Inventory, POL_ProductID
        FROM PC.POL
        WHERE POL_Index = ${cancle};
        DELETE FROM PC.POL WHERE POL_Index = ${cancle};`;
      }
      else{
        let mul_cancle = cancle as [];
        mul_cancle.forEach(i => {
          extraSql += `INSERT IGNORE INTO PC.POCL (POCL_SeatID, POCL_Payment, POCL_MemberID, POCL_Inventory, POCL_ProductID)
          SELECT POL_SeatID, POL_Payment, POL_MemberID, POL_Inventory, POL_ProductID
          FROM PC.POL
          WHERE POL_Index = ${i};
          DELETE FROM PC.POL WHERE POL_Index = ${i};`;
        });
      }
    }
    sqlQuery = extraSql + sqlQuery;
    console.log(sqlQuery);

  }
  db.query(sqlQuery, (err, result) => {
    //console.log(result);
    //console.log(err);
    console.log("result : "+result);
    for(let i in result){
      //console.log(result[i]);
      if(Array.isArray(result[i])){
        result = result[i];
        //console.log(result);
      }
    }
  //}
  // if(result.length != 1){
  //   result = result[result.length - 1];
  // } 에러가 날 가능성이 농후함 왜인지는 몰루
    let count = 0;
    for(let _ in result){
      data += `
        <tr style="background-color: whitesmoke;">
          <td>${result[count]['productName']}</td>
          <td>${result[count]['POL_MemberID']}</td>
          <td>${result[count]['POL_SeatID']}</td>
          <td>${result[count]['POL_Payment']}</td>
          <td>${result[count]['POL_Inventory']}</td>
          <td><input type="checkbox" name="complite" value="${result[count]['POL_Index']}"/></td>
          <td><input type="checkbox" name="cancle" value="${result[count]['POL_Index']}"/></td>
        </tr>`;
      count += 1;
    }

    message = `<!DOCTYPE html>
    <html lang="ko">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>pc방 관리창</title>
    </head>
    <body>
      <div style="display: block; width: fit-content; height: 100%; border-style: solid; border-width: 2px; float: left">
        <form action="memberlist" method="get"> <input style="width: 100%; padding:10px;" type="submit" value="고객리스트"></form>
        <form action="seatlist" method="get"> <input style="width: 100%; padding:10px;" type="submit" value="좌석리스트"></form>
        <form action="productlist" method="get"> <input style="width: 100%; padding:10px;" type="submit" value="상품정보"></form>
        <form action="product_order_complite_list" method="get"> <input style="width: 100%; padding:10px;" type="submit" value="완료된주문"></form>
        <form action="product_order_loding_list" method="get"> <input style="width: 100%; padding:10px;" type="submit" value="진행중인주문"></form>
        <form action="product_cancle_log_list" method="get"> <input style="width: 100%; padding:10px;" type="submit" value="취소된주문"></form>
        <form action="time_order_log_list" method="get"> <input style="width: 100%; padding:10px;" type="submit" value="시간주문기록"></form>
        <form action="seat_used_log_list" method="get"> <input style="width: 100%; padding:10px;" type="submit" value="자리사용기록"></form>
      </div>  
       <form style="display: inline-block;" method="get">
            <div style="border-style: solid;">
            <h1>진행중인 주문</h1>
                페이지: <input type="text" name="page" value="${page}">
                <table border="1">
                  <th>
                    상품명
                  </th>
                  <th>
                    주문자ID
                  </th>
                  <th>
                    주문한좌석ID
                  </th>
                  <th>
                    결제수단
                  </th>
                  <th>
                    주문수량
                  </th>
                  <th>
                    완료처리
                  </th>
                  <th>
                    취소처리
                  </th>
                  ${data}
              </table>
                <br />
                <input type="submit" name="go_back" value="<"> <input type="submit" name="go_back" value=">"> <input type="submit" name="go_back" value="submit">
            </div>
       </form> 
    </body>
    </html>`

    res.send(message);
  });
  //res.send(sendData);
  //console.log(req.query.state); //배열로 들어옴
  //res.send(sendData);
});

app.get("/time_order_log_list", async (req: Request, res: Response) => {
  let message:string = "";
  let data:string = "";
  let page:number = req.query.page != null ? Number.parseInt(req.query.page as string):0;
  let go_back:string = req.query.go_back as string;

  if(go_back == "<"){
    page = Math.max(0, page-1);
  }
  else if(go_back == ">"){
    page += 1;
  }

  let sqlQuery: string = `SELECT * FROM PC.TOR limit ${page*10},${10};`;
  //console.log(db);
  console.log(sqlQuery+"????");
  db.query(sqlQuery, (err, result) => {
    console.log(result);
    //console.log(err);

    let count = 0;
    for(let _ in result){
      data += `
        <tr style="background-color: whitesmoke;">
          <td>${result[count]['TOR_MemberID']}</td>
          <td>${result[count]['TOR_Payment']}</td>
          <td>${result[count]['TOR_PName']}</td>
          <td>${result[count]['TOR_InputCost']}</td>
          <td>${result[count]['TOR_OutputCost']}</td>
        </tr>`;
      count += 1;
    }

    message = `<!DOCTYPE html>
    <html lang="ko">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>pc방 관리창</title>
    </head>
    <body>
      <div style="display: block; width: fit-content; height: 100%; border-style: solid; border-width: 2px; float: left">
        <form action="memberlist" method="get"> <input style="width: 100%; padding:10px;" type="submit" value="고객리스트"></form>
        <form action="seatlist" method="get"> <input style="width: 100%; padding:10px;" type="submit" value="좌석리스트"></form>
        <form action="productlist" method="get"> <input style="width: 100%; padding:10px;" type="submit" value="상품정보"></form>
        <form action="product_order_complite_list" method="get"> <input style="width: 100%; padding:10px;" type="submit" value="완료된주문"></form>
        <form action="product_order_loding_list" method="get"> <input style="width: 100%; padding:10px;" type="submit" value="진행중인주문"></form>
        <form action="product_cancle_log_list" method="get"> <input style="width: 100%; padding:10px;" type="submit" value="취소된주문"></form>
        <form action="time_order_log_list" method="get"> <input style="width: 100%; padding:10px;" type="submit" value="시간주문기록"></form>
        <form action="seat_used_log_list" method="get"> <input style="width: 100%; padding:10px;" type="submit" value="자리사용기록"></form>
      </div>  
       <form style="display: inline-block;" method="get">
            <div style="border-style: solid;">
            <h1>시간주문기록</h1>
                페이지: <input type="text" name="page" value="${page}">
                <table border="1">
                  <th>
                    주문자ID
                  </th>
                  <th>
                    결재수단
                  </th>
                  <th>
                    상품명
                  </th>
                  <th>
                    받은돈
                  </th>
                  <th>
                    거스름돈
                  </th>
                  ${data}
              </table>
                <br />
                <input type="submit" name="go_back" value="<"> <input type="submit" name="go_back" value=">">
            </div>
       </form> 
    </body>
    </html>`

    res.send(message);
  });
  //res.send(sendData);
  //console.log(req.query.state); //배열로 들어옴
  //res.send(sendData);
});

app.get("/seat_used_log_list", async (req: Request, res: Response) => {
  let message:string = "";
  let data:string = "";
  let page:number = req.query.page != null ? Number.parseInt(req.query.page as string):0;
  let go_back:string = req.query.go_back as string;

  if(go_back == "<"){
    page = Math.max(0, page-1);
  }
  else if(go_back == ">"){
    page += 1;
  }

  let sqlQuery: string = `SELECT * FROM PC.SUL limit ${page*10},${10};`;
  //console.log(db);
  console.log(sqlQuery+"????");
  db.query(sqlQuery, (err, result) => {
    console.log(result);
    //console.log(err);

    let count = 0;
    for(let _ in result){
      let startDay = new Date(result[count]['SUL_StartDay']);
      let startTime = new Date(result[count]['SUL_StartTime']);
      let endDay = new Date(result[count]['SUL_EndDay']);
      let endTime = new Date(result[count]['SUL_EndTime']);

      let startDaye_s = startDay.getFullYear() + "년 " + startDay.getMonth() + "월 " + startDay.getDate() + "일 " + startTime.getHours()+"시간 "+startTime.getMinutes()+"분";
      let EndDaye_s = endDay.getFullYear() + "년 " + endDay.getMonth() + "월 " + endDay.getDate() + "일 " + endTime.getHours()+"시간 "+endTime.getMinutes()+"분";
      data += `
        <tr style="background-color: whitesmoke;">
          <td>${result[count]['SUL_SeatID']}</td>
          <td>${result[count]['SUL_MemberID']}</td>
          <td>${startDaye_s}</td>
          <td>${EndDaye_s}</td>
        </tr>`;
      count += 1;
    }

    message = `<!DOCTYPE html>
    <html lang="ko">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>pc방 관리창</title>
    </head>
    <body>
      <div style="display: block; width: fit-content; height: 100%; border-style: solid; border-width: 2px; float: left">
        <form action="memberlist" method="get"> <input style="width: 100%; padding:10px;" type="submit" value="고객리스트"></form>
        <form action="seatlist" method="get"> <input style="width: 100%; padding:10px;" type="submit" value="좌석리스트"></form>
        <form action="productlist" method="get"> <input style="width: 100%; padding:10px;" type="submit" value="상품정보"></form>
        <form action="product_order_complite_list" method="get"> <input style="width: 100%; padding:10px;" type="submit" value="완료된주문"></form>
        <form action="product_order_loding_list" method="get"> <input style="width: 100%; padding:10px;" type="submit" value="진행중인주문"></form>
        <form action="product_cancle_log_list" method="get"> <input style="width: 100%; padding:10px;" type="submit" value="취소된주문"></form>
        <form action="time_order_log_list" method="get"> <input style="width: 100%; padding:10px;" type="submit" value="시간주문기록"></form>
        <form action="seat_used_log_list" method="get"> <input style="width: 100%; padding:10px;" type="submit" value="자리사용기록"></form>
      </div>  
       <form style="display: inline-block;" method="get">
            <div style="border-style: solid;">
            <h1>자리사용기록</h1>
                페이지: <input type="text" name="page" value="${page}">
                <table border="1">
                  <th>
                    좌석ID
                  </th>
                  <th>
                    주문자ID
                  </th>
                  <th>
                    시작시간
                  </th>
                  <th>
                    종료시간
                  </th>
                  ${data}
              </table>
                <br />
                <input type="submit" name="go_back" value="<"> <input type="submit" name="go_back" value=">">
            </div>
       </form> 
    </body>
    </html>`

    res.send(message);
  });
  //res.send(sendData);
  //console.log(req.query.state); //배열로 들어옴
  //res.send(sendData);
});
app.listen(8080);