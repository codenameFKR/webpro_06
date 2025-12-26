const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));

app.get("/hello1", (req, res) => {
  const message1 = "Hello world";
  const message2 = "Bon jour";
  res.render('show', { greet1:message1, greet2:message2});
});

app.get("/hello2", (req, res) => {
  res.render('show', { greet1:"Hello world", greet2:"Bon jour"});
});

app.get("/icon", (req, res) => {
  res.render('icon', { filename:"./public/Apple_logo_black.svg", alt:"Apple Logo"});
});

app.get("/omikuji", (req, res) => {
  res.render('omikuji');
});
app.get("/omikuji1", (req, res) => {
  const num = Math.floor( Math.random() * 6 + 1 );
  let luck = '';
  if (num == 1) luck = '大吉';
  else if (num == 2) luck = '吉';
  else if (num == 3) luck = '中吉';
  else if (num == 4) luck = '小吉';
  else if (num == 5) luck = '末吉';
  else if (num == 6) luck = '凶';
  

  res.send( '今日の運勢は' + luck + 'です' );
});

app.get("/omikuji2", (req, res) => {
  const num = Math.floor( Math.random() * 6 + 1 );
  let luck = '';
  if( num==1 ) luck = '大吉';
  else if( num==2 ) luck = '吉';
  else if (num == 3) luck = '中吉';
  else if (num == 4) luck = '小吉';
  else if (num == 5) luck = '末吉';
  else if (num == 6) luck = '凶';


  res.render( 'omikuji2', {result:luck} );
});

app.get("/omikuji3", (req, res) => {
  const num = Math.floor(Math.random() * 6 + 1);
  let luck = '';
  let comment = '';
  if (num == 1) {
    luck = '大吉';
    comment = '絶好調です！';
  }
  else if (num == 2) {
    luck = '吉';
    comment = '単位取得';
  }
  else if (num == 3) {
    luck = '中吉';
    comment = '普通...ってコト!?';
  }
  else if (num == 4) {
    luck = '小吉';
    comment = 'あんたつまんねえなァ!';
  }
  else if (num == 5) {
    luck = '末吉';
    comment = 'くそっ!お前はいつもそうだ';
  }
  else if (num == 6) {
    luck = '凶';
    comment = '誰もお前を愛さない';
  }

  res.render('omikuji3', { result: luck, comment: comment });
});

app.get("/janken", (req, res) => {
  let hand = req.query.hand;
  let win = Number(req.query.win);
  let total = Number(req.query.total);
  console.log({ hand, win, total });
  const num = Math.floor(Math.random() * 3 + 1);
  let cpu = '';
  let judgement = '';
  if (num == 1) cpu = 'グー';
  else if (num == 2) cpu = 'チョキ';
  else if (num == 3) cpu = 'パー';
  // ここに勝敗の判定を入れる
  // 以下の数行は人間の勝ちの場合の処理なので，
  // 判定に沿ってあいこと負けの処理を追加する
  if(num == 1)
  {
    judgement = '勝ち';
    win += 1;
    total += 1;
  }
  else if(num == 2)
  {
    judgement = '勝ち';
    win += 1;
    total += 1;
  }
  else if (num == 3)
  {
    judgement = '勝ち';
    win += 1;
    total += 1;
  }

  const display = {
    your: hand,
    cpu: cpu,
    judgement: judgement,
    win: win,
    total: total
  }
  
  res.render('janken_01', display);
});

/*
app.get("/janken", (req, res) => {
  let hand = req.query.hand;
  let win = Number( req.query.win );
  let total = Number( req.query.total );
  console.log( {hand, win, total});
  const num = Math.floor( Math.random() * 3 + 1 );
  let cpu = '';
  let judgement = '';
  if( num==1 ) cpu = 'グー';
  else if( num==2 ) cpu = 'チョキ';
  else cpu = 'パー';
  // ここに勝敗の判定を入れる
  // 以下の数行は人間の勝ちの場合の処理なので，
  // 判定に沿ってあいこと負けの処理を追加する
  judgement = '勝ち';
  win += 1;
  total += 1;
  const display = {
    your: hand,
    cpu: cpu,
    judgement: judgement,
    win: win,
    total: total
  }
  res.render( 'janken', display );
});
*/

let station = [
  { id: 1, code: "JE01", name: "東京駅" },
  { id: 2, code: "JE07", name: "舞浜駅" },
  { id: 3, code: "JE12", name: "新習志野駅" },
  { id: 4, code: "JE13", name: "幕張豊砂駅" },
  { id: 5, code: "JE14", name: "海浜幕張駅" },
  { id: 6, code: "JE05", name: "新浦安駅" },
];

app.get("/keiyo", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  res.render('db2', { data: station });
});

app.get("/keiyo_add", (req, res) => {
  let id = req.query.id;
  let code = req.query.code;
  let name = req.query.name;
  let newdata = { id: id, code: code, name: name };
  station.push(newdata);
  res.redirect('/public/keiyo_add.html');
  //res.render('db2', { data: station });
});

let station2 = [
  { id: 1, code: "JE01", name: "東京駅", change: "総武本線，中央線，etc", passengers: 403831, distance: 0 },
  { id: 2, code: "JE02", name: "八丁堀駅", change: "日比谷線", passengers: 31071, distance: 1.2 },
  { id: 3, code: "JE05", name: "新木場駅", change: "有楽町線，りんかい線", passengers: 67206, distance: 7.4 },
  { id: 4, code: "JE07", name: "舞浜駅", change: "舞浜リゾートライン", passengers: 76156, distance: 12.7 },
  { id: 5, code: "JE12", name: "新習志野駅", change: "", passengers: 11655, distance: 28.3 },
  { id: 6, code: "JE17", name: "千葉みなと駅", change: "千葉都市モノレール", passengers: 16602, distance: 39.0 },
  { id: 7, code: "JE18", name: "蘇我駅", change: "内房線，外房線", passengers: 31328, distance: 43.0 },
];

app.get("/keiyo2", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  res.render('keiyo2', { data: station2 });
});

app.get("/keiyo2/:number", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  const number = req.params.number;
  const detail = station2[number];
  res.render('keiyo2_detail', { data: detail });
});

// ーーーーー提出課題(キュゥべえ)ーーーーー

let title = [
  { id: 1, title: "夢の中で逢った、ような……" },
  { id: 2, title: "それはとっても嬉しいなって" },
  { id: 3, title: "もう何も恐くない" },
  { id: 4, title: "奇跡も、魔法も、あるんだよ" },
  { id: 5, title: "後悔なんて、あるわけない" },
  { id: 6, title: "こんなの絶対おかしいよ" },
  { id: 7, title: "本当の気持ちと向き合えますか?" },
  { id: 8, title: "あたしって、ほんとバカ" },
  { id: 9, title: "そんなの、あたしが許さない" },
  { id: 10, title: "もう誰にも頼らない" },
  { id: 11, title: "最後に残った道しるべ" },
  { id: 12, title: "わたしの、最高の友達" },
];

// 一覧
app.get("/kyuubey", (req, res) => {
  res.render('kyuubey', { data: title });
});

// Create
app.get("/keiyo2/create", (req, res) => {
  res.redirect('/public/keiyo2_new.html');
});



// Read
app.get("/kyuubey/:number", (req, res) => {
  const number = req.params.number;
  const detail = kyubeyQuotes[number];
  res.render('kyuubey_detail', { id: number, data: detail });
});

// Delete
app.get("/keiyo2/delete/:number", (req, res) => {
  // 本来は削除の確認ページを表示する
  // 本来は削除する番号が存在するか厳重にチェックする
  // 本来ならここにDBとのやり取りが入る
  station2.splice(req.params.number, 1);
  res.redirect('/keiyo2');
});

// Create
app.post("/keiyo2", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  const id = station2.length + 1;
  const code = req.body.code;
  const name = req.body.name;
  const change = req.body.change;
  const passengers = req.body.passengers;
  const distance = req.body.distance;
  station2.push({ id: id, code: code, name: name, change: change, passengers: passengers, distance: distance });
  console.log(station2);
  res.render('keiyo2', { data: station2 });
});

// Edit
app.get("/keiyo2/edit/:number", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  const number = req.params.number;
  const detail = station2[number];
  res.render('keiyo2_edit', { id: number, data: detail });
});

// Update
app.post("/keiyo2/update/:number", (req, res) => {
  // 本来は変更する番号が存在するか，各項目が正しいか厳重にチェックする
  // 本来ならここにDBとのやり取りが入る
  station2[req.params.number].code = req.body.code;
  station2[req.params.number].name = req.body.name;
  station2[req.params.number].change = req.body.change;
  station2[req.params.number].passengers = req.body.passengers;
  station2[req.params.number].distance = req.body.distance;
  console.log(station2);
  res.redirect('/keiyo2');
});

// ーーーーー提出課題(ゼルダ)ーーーーー

// Read
//一覧


// Create
// 新規登録


// Delete

// Edit

// Update

// ーーーーー提出課題(ゼルダ)ーーーーー
let station5 = [
  { id: 1, code: "JE01", name: "東京駅", change: "総武本線，中央線，etc", passengers: 403831, distance: 0 },
  { id: 2, code: "JE02", name: "八丁堀駅", change: "日比谷線", passengers: 31071, distance: 1.2 },
  { id: 3, code: "JE05", name: "新木場駅", change: "有楽町線，りんかい線", passengers: 67206, distance: 7.4 },
  { id: 4, code: "JE07", name: "舞浜駅", change: "舞浜リゾートライン", passengers: 76156, distance: 12.7 },
  { id: 5, code: "JE12", name: "新習志野駅", change: "", passengers: 11655, distance: 28.3 },
  { id: 6, code: "JE17", name: "千葉みなと駅", change: "千葉都市モノレール", passengers: 16602, distance: 39.0 },
  { id: 7, code: "JE18", name: "蘇我駅", change: "内房線，外房線", passengers: 31328, distance: 43.0 },
];

// 一覧
app.get("/zelda", (req, res) => {
  res.render('zelda', { data: station5 });
});

// Create
app.get("/zelda/create", (req, res) => {
  res.redirect('/public/zelda_new.html');
});

// Read
app.get("/zelda/:number", (req, res) => {
  const number = req.params.number;
  const detail = station5[number];
  res.render('zelda_detail', { id: number, data: detail });
});

// Delete
app.get("/zelda/delete/:number", (req, res) => {
  // 本来は削除の確認ページを表示する
  // 本来は削除する番号が存在するか厳重にチェックする
  // 本来ならここにDBとのやり取りが入る
  station5.splice(req.params.number, 1);
  res.redirect('/zelda');
});

// Create
app.post("/zelda", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  const id = station5.length + 1;
  const code = req.body.code;
  const name = req.body.name;
  const change = req.body.change;
  const passengers = req.body.passengers;
  const distance = req.body.distance;
  station5.push({ id: id, code: code, name: name, change: change, passengers: passengers, distance: distance });
  console.log(station5);
  res.render('zelda', { data: station5 });
});

// Edit
app.get("/zelda/edit/:number", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  const number = req.params.number;
  const detail = station5[number];
  res.render('zelda_edit', { id: number, data: detail });
});

// Update
app.post("/zelda/update/:number", (req, res) => {
  // 本来は変更する番号が存在するか，各項目が正しいか厳重にチェックする
  // 本来ならここにDBとのやり取りが入る
  station5[req.params.number].code = req.body.code;
  station5[req.params.number].name = req.body.name;
  station5[req.params.number].change = req.body.change;
  station5[req.params.number].passengers = req.body.passengers;
  station5[req.params.number].distance = req.body.distance;
  console.log(station5);
  res.redirect('/zelda');
});


app.listen(8080, () => console.log("Example app listening on port 8080!"));
