"use strict";
//expressを使うよ，準備してね
const express = require("express");
//app(Webアプリケーション)を作るよ
const app = express();
//renderするとき，EJSという仕組みを使うよ
app.set('view engine', 'ejs');
//publicというフォルダの中にある画像やCSSだけは，ブラウザから自由に見てもいいよ
//普通，セキュリティのためみれるところが制限されている
app.use("/public", express.static(__dirname + "/public"));
//<form method="POST">で送られてきたデータを扱いやすいように変換してくれるよ
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

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

// ーーーーー提出課題(フルート)ーーーーー

let flute = [
  { id: 1, maker: "YAMAHA", country: "日本", year: 1887, tone: "初心者でも吹きやすく扱いやすい．" },
  { id: 2, maker: "ムラマツ", country: "日本", year: 1923, tone: "音量が豊かで，響きの良い明るい音．" },
  { id: 3, maker: "サンキョウ", country: "日本", year: 1968, tone: "はっきりと響く，繊細でキラキラとした音．" },
  { id: 4, maker: "Altus", country: "日本", year: 1981, tone: "パワフルで明るい音色で，遠鳴りのする深い響き．" },
  { id: 5, maker: "Pearl", country: "日本", year: 1968, tone: "息がスッと入るような吹奏感が特徴で，柔らかい印象の音色．" },
  { id: 6, maker: "Miyazawa", country: "日本", year: 1969, tone: "輝かしく芯のある音色．" },
  { id: 7, maker: "Powell", country: "アメリカ", year: 1880, tone: "パワフルな音色で，中音域が豊かに響く．" }
];

// 一覧
app.get("/flute", (req, res) => {
  res.render('flute', { data: flute });
});

// Create
app.get("/flute/create", (req, res) => {
  res.redirect('/public/flute_new.html');
});

// Read
app.get("/flute/:number", (req, res) => {
  const number = req.params.number;
  const detail = flute[number];

  //存在しないIDにアクセスがあった時のエラー処理
  if (!detail) {
    console.log("存在しないIDにアクセスがありました")
    return res.redirect('/flute');
  }

  res.render('flute_detail', { id: number, data: detail });
});

// Delete
app.get("/flute/delete/:number", (req, res) => {
  // 本来は削除の確認ページを表示する
  // 本来は削除する番号が存在するか厳重にチェックする
  // 本来ならここにDBとのやり取りが入る
  flute.splice(req.params.number, 1);
  res.redirect('/flute');
});

// Create
app.post("/flute", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  const id = flute.length + 1;
  const maker = req.body.maker;
  const country = req.body.country;
  const year = req.body.year;
  const tone = req.body.tone;
  flute.push({ id: id, maker: maker, country: country, year: year, tone: tone});
  console.log(flute);
  res.redirect('/flute')
});

// Edit
app.get("/flute/edit/:number", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  const number = req.params.number;
  const detail = flute[number];

  //存在しないIDにアクセスがあった時のエラー処理
  if (!detail) {
    console.log("存在しないIDにアクセスがありました")
    return res.redirect('/flute');
  }

  res.render('flute_edit', { id: number, data: detail });
});

// Update
app.post("/flute/update/:number", (req, res) => {
  // 本来は変更する番号が存在するか，各項目が正しいか厳重にチェックする
  // 本来ならここにDBとのやり取りが入る
  
  //存在しないIDにアクセスがあった時のエラー処理
  if (!flute[req.params.number]) {
    console.log("存在しないIDにアクセスがありました")
    return res.redirect('/flute');
  }

  flute[req.params.number].maker = req.body.maker;
  flute[req.params.number].country = req.body.country;
  flute[req.params.number].year = req.body.year;
  flute[req.params.number].tone = req.body.tone;
  console.log(flute);
  res.redirect('/flute/' + req.params.number);
});

// ーーーーー提出課題(ゼルダ)ーーーーー
let zelda = [
  { id: 1, title: "スカイウォードソード", year: 2011, hardware: "Wii/WiiU/Nintendo Switch/Nintendo Switch2" },
  { id: 2, title: "ふしぎのぼうし", year: 2004, hardware: "ゲームボーイアドバンス/Nintendo Switch/Nintendo Switch2" },
  { id: 3, title: "4つの剣", year: 2003, hardware: "ゲームボーイアドバンス/Nintendo Switch/Nintendo Switch2" },
  { id: 4, title: "時のオカリナ", year: 1998, hardware: "NINTENDO64/ニンテンドー3DS/Nintendo Switch/Nintendo Switch2" },
  { id: 5, title: "神々のトライフォース", year: 1991, hardware: "スーパーファミコン/Nintendo Switch/Nintendo Switch2" },
  { id: 6, title: "夢を見る島", year: 1993, hardware: "ゲームボーイ/Nintendo Switch/Nintendo Switch2" },
  { id: 7, title: "ふしぎの木の実", year: 2001, hardware: "ゲームボーイカラー/Nintendo Switch/Nintendo Switch2" },
  { id: 8, title: "神々のトライフォース2", year: 2013, hardware: "ニンテンドー3DS" },
  { id: 9, title: "トライフォース3銃士", year: 2015, hardware: "ニンテンドー3DS" },
  { id: 10, title: "知恵のかりもの", year: 2024, hardware: "Nintendo Switch/Nintendo Switch2" },
  { id: 11, title: "ゼルダの伝説", year: 1986, hardware: "ファミリーコンピュータ ディスクシステム/Nintendo Switch/Nintendo Switch2" },
  { id: 12, title: "リンクの冒険", year: 1987, hardware: "ファミリーコンピュータ ディスクシステム/Nintendo Switch/Nintendo Switch2" },
  { id: 13, title: "風のタクト", year: 2002, hardware: "ニンテンドーゲームキューブ/WiiU/Nintendo Switch2" },
  { id: 14, title: "夢幻の砂時計", year: 2007, hardware: "ニンテンドーDS/ニンテンドー3DS" },
  { id: 15, title: "大地の汽笛", year: 2009, hardware: "ニンテンドーDS/ニンテンドー3DS" },
  { id: 16, title: "ムジュラの仮面", year: 2000, hardware: "NINTENDO64/ニンテンドー3DS/Nintendo Switch/Nintendo Switch2" },
  { id: 17, title: "トワイライトプリンセス", year: 2006, hardware: "ニンテンドーゲームキューブ/Wii/WiiU" },
  { id: 18, title: "4つの剣+(ハイラルアドベンチャー)", year: 2004, hardware: "ニンテンドーゲームキューブ/Nintendo Switch2" }
];

// 一覧
app.get("/zelda", (req, res) => {
  res.render('zelda', { data: zelda });
});

// Create
app.get("/zelda/create", (req, res) => {
  res.redirect('/public/zelda_new.html');
});

// Read
app.get("/zelda/:number", (req, res) => {
  const number = req.params.number;
  const detail = zelda[number];

  //存在しないIDにアクセスがあった時のエラー処理
  if (!detail) {
    console.log("存在しないIDにアクセスがありました")
    return res.redirect('/zelda');
  }

  res.render('zelda_detail', { id: number, data: detail });
});

// Delete
app.get("/zelda/delete/:number", (req, res) => {
  // 本来は削除の確認ページを表示する
  // 本来は削除する番号が存在するか厳重にチェックする
  // 本来ならここにDBとのやり取りが入る
  zelda.splice(req.params.number, 1);
  res.redirect('/zelda');
});

// Create
app.post("/zelda", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  const id = zelda.length + 1;
  const title = req.body.title;
  const year = req.body.year;
  const hardware = req.body.hardware;
  zelda.push({ id: id, title: title, year: year, hardware: hardware });
  console.log(zelda);
  res.redirect('/zelda');
});

// Edit
app.get("/zelda/edit/:number", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  const number = req.params.number;
  const detail = zelda[number];

  //存在しないIDにアクセスがあった時のエラー処理
  if (!detail) {
    console.log("存在しないIDにアクセスがありました")
    return res.redirect('/zelda');
  }

  res.render('zelda_edit', { id: number, data: detail });
});

// Update
app.post("/zelda/update/:number", (req, res) => {
  // 本来は変更する番号が存在するか，各項目が正しいか厳重にチェックする
  // 本来ならここにDBとのやり取りが入る

  //存在しないIDにアクセスがあった時のエラー処理
  if (!zelda[req.params.number]) {
    console.log("存在しないIDにアクセスがありました")
    return res.redirect('/zelda');
  }

  zelda[req.params.number].title = req.body.title;
  zelda[req.params.number].year = req.body.year;
  zelda[req.params.number].hardware = req.body.hardware;
  console.log(zelda);
  res.redirect('/zelda/' + req.params.number);
});

// ーーーーー提出課題(DECO*27)ーーーーー
let deco = [
  { id: 1, title: "ラビットホール", year: 2023, lm: "DECO*27", arrangement: "tepe", movie: "OTOIRO", url: "https://www.youtube.com/watch?v=eSW2LVbPThw" },
  { id: 2, title: "モニタリング", year: 2024, lm: "DECO*27", arrangement: "DECO*27 & Hayato Yamamoto", movie: "OTOIRO", url: "https://www.youtube.com/watch?v=kbNdx0yqbZE" },
  { id: 3, title: "ヴァンパイア", year: 2021, lm: "DECO*27", arrangement: "Rockwell", movie: "OTOIRO", url: "https://www.youtube.com/watch?v=e1xCOsgWG0M" },
  { id: 4, title: "ヒバナ", year: 2017, lm: "DECO*27", arrangement: "Rockwell", movie: "八三", url: "https://www.youtube.com/watch?v=hxSg2Ioz3LM&t=1s" },
  { id: 5, title: "妄想感傷代償連盟", year: 2016, lm: "DECO*27", arrangement: "emon(Tes.)", movie: "檀上大空", url: "https://www.youtube.com/watch?v=8pGRdRhjX3o" },
  { id: 6, title: "乙女解剖", year: 2019, lm: "DECO*27", arrangement: "emon(Tes.) & Rockwell", movie: "OTOIRO", url: "https://www.youtube.com/watch?v=7zwCIz-Ohn4" },
  { id: 7, title: "ゴーストルール", year: 2016, lm: "DECO*27", arrangement: "Naoki Itai (MUSIC FOR MUSIC)", movie: "八三", url: "https://www.youtube.com/watch?v=KushW6zvazM" },
  { id: 8, title: "テレパシ", year: 2025, lm: "DECO*27", arrangement: "tepe", movie: "OTOIRO", url: "https://www.youtube.com/watch?v=c56TpxfO9q0" },
  { id: 9, title: "モニタリング(Best Friend Remix)", year: 2025, lm: "DECO*27", arrangement: "DECO*27 & Hayato Yamamoto", movie: "OTOIRO", url: "https://www.youtube.com/watch?v=C-CYwNz3z8w&list=RDC-CYwNz3z8w&start_radio=1" },
  { id: 10, title: "アニマル", year: 2021, lm: "DECO*27", arrangement: "Rockwell", movie: "OTOIRO", url: "https://www.youtube.com/watch?v=HtBqK6xsQ9k" }
];

// 一覧
app.get("/deco", (req, res) => {
  res.render('deco', { data: deco });
});

// Create
app.get("/deco/create", (req, res) => {
  res.redirect('/public/deco_new.html');
});

// Read
app.get("/deco/:number", (req, res) => {
  const number = req.params.number;
  const detail = deco[number];

  //存在しないIDにアクセスがあった時のエラー処理
  if (!detail) {
    console.log("存在しないIDにアクセスがありました")
    return res.redirect('/deco');
  }

  res.render('deco_detail', { id: number, data: detail });
});

// Delete
app.get("/deco/delete/:number", (req, res) => {
  // 本来は削除の確認ページを表示する
  // 本来は削除する番号が存在するか厳重にチェックする
  // 本来ならここにDBとのやり取りが入る
  deco.splice(req.params.number, 1);
  res.redirect('/deco');
});

// Create
app.post("/deco", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  const id = deco.length + 1;
  const title = req.body.title;
  const year = req.body.year;
  const lm = req.body.lm;
  const arrangement = req.body.arrangement;
  const movie = req.body.movie;
  const url = req.body.url;
  deco.push({ id: id, title: title, year: year, lm: lm, arrangement: arrangement, movie: movie, url: url });
  console.log(deco);
  res.redirect('/deco');
});

// Edit
app.get("/deco/edit/:number", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  const number = req.params.number;
  const detail = deco[number];

  //存在しないIDにアクセスがあった時のエラー処理
  if (!detail) {
    console.log("存在しないIDにアクセスがありました")
    return res.redirect('/deco');
  }

  res.render('deco_edit', { id: number, data: detail });
});

// Update
app.post("/deco/update/:number", (req, res) => {
  // 本来は変更する番号が存在するか，各項目が正しいか厳重にチェックする
  // 本来ならここにDBとのやり取りが入る

  //存在しないIDにアクセスがあった時のエラー処理
  if (!deco[req.params.number]) {
    console.log("存在しないIDにアクセスがありました")
    return res.redirect('/deco');
  }

  deco[req.params.number].title = req.body.title;
  deco[req.params.number].year = req.body.year;
  deco[req.params.number].lm = req.body.lm;
  deco[req.params.number].arrangement = req.body.arrangement;
  deco[req.params.number].movie = req.body.movie;
  deco[req.params.number].url = req.body.url;
  console.log(deco);
  res.redirect('/deco/' + req.params.number);
});

app.listen(8080, () => console.log("Example app listening on port 8080!"));
