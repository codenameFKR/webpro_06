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

let kyubeyQuotes = [
  // 第1話 [cite: 10]
  { id: 1, episode: 1, text: "助けて、、、助けて、、、まどか、、、! 助けて、、、", situation: "まどかの脳内に響く謎の声", comment: "そんな感情ないだろう。" },
  { id: 2, episode: 1, text: "ありがとう、マミ! 助かったよ。どうもありがとう! 僕の名前はキュゥべえ。そうだよ、鹿目まどか。それと、美樹さやか。僕、君たちにお願いがあって来たんだ。僕と契約して、魔法少女になって欲しいんだ!", situation: "キュゥべえ救出直後", comment: "伝説のセリフ。" },

  // 第2話 [cite: 13]
  { id: 3, episode: 2, text: "おはよう! まどか。", situation: "まどかが朝目覚めた直後。", comment: "私もおはようって言われたい。" },
  { id: 4, episode: 2, text: "僕は、君たちの願い事をなんでも一つ叶えてあげる。何だってかまわない。どんな奇跡だって起こしてあげられるよ。", situation: "マミさんの家にて説明を受けている", comment: "契約します!させてください!" },
  { id: 5, episode: 2, text: "でも、それと引き換えに出来上がるのがソウルジェム。この石を手にしたものは、魔女と戦う使命を科されるんだ。願いから産まれるのが魔法少女だとすれば、魔女は呪いから産まれた存在なんだ。", situation: "マミさんの家にて説明を受けている", comment: "合ってるけど合ってない。" },
  { id: 6, episode: 2, text: "魔法少女が希望を振りまくように、魔女は絶望をまき散らす。しかもその姿は普通の人間には見えないからタチが悪い。", situation: "マミさんの家にて説明を受けている", comment: "その仕組み作ったのあなたですよね?" },
  { id: 7, episode: 2, text: "不安や猜疑心、過剰な怒りや憎しみ、そういう災いの種を世界にもたらしているんだ。", situation: "マミさんの家にて説明を受けている", comment: "大変だあ" },
  { id: 8, episode: 2, text: "魔女は常に結界の奥に隠れ潜んで、決して人前には姿を現さないからね。さっき君たちが迷い込んだ、迷路のような場所がそうだよ。", situation: "マミさんの家にて説明を受けている", comment: "熱出た時に見る夢みたいで結構好き。" },
  { id: 9, episode: 2, text: "おはよう! さやか。いやいや、今はまだ僕が間で中継してるだけ。内緒話には便利でしょ?", situation: "登校中", comment: "テレパシできるようになりたい。" },
  { id: 10, episode: 2, text: "どうして? むしろ学校の方が安全だと思うな。マミもいるし。この程度の距離なら、テレパシも圏内だよ。", situation: "学校到着後", comment: "ここら辺のキュゥべえは普通の妖精みたい。" },
  { id: 11, episode: 2, text: "彼女が狙ってたのは僕だよ。新しい魔法少女が生まれることを、阻止しようとしてたんだろうね。", situation: "屋上", comment: "ほむらの目的推測" },
  { id: 12, episode: 2, text: "あぁ、ん、、、", situation: "屋上でご飯中", comment: "唯一キュゥべえの口内が見える。かわいい。" },
  { id: 13, episode: 2, text: "意外だな。大抵の子は二つ返事なんだけど。", situation: "屋上でご飯中", comment: "追い詰められた人と契約するからでは?" },
  { id: 14, episode: 2, text: "大丈夫。その状態では安全だよ。むしろ役に立つ貴重なものだ。", situation: "グリーフシードの説明中", comment: "魔女ごとにデザインが違うのがいいよね。" },

  // 第3話 [cite: 18]
  { id: 15, episode: 3, text: "今のは魔女から分裂した使い魔でしかないからね。グリーフシードは持ってないよ。", situation: "マミさん使い魔退治後。", comment: "残念だ。" },
  { id: 16, episode: 3, text: "別に契約者自身が願いことの対象になる必然性はないんだけどね。前例もないわけじゃないし。", situation: "帰り道", comment: "必然性と言うのがキュゥべえっぽくて良い" },
  { id: 17, episode: 3, text: "僕としては、早ければ早いほどいいんだけど。", situation: "帰り道", comment: "みんながキュゥべえは男の子だと思ってることが判明するシーンでもある。" },
  { id: 18, episode: 3, text: "まどかは、力そのものに憧れているのかい? まどかが魔法少女になれば、マミよりずっと強くなれるよ。もちろん、どんな願いことで契約するかにもよるけれど。まどかが生み出すかもしれないソウルジェムの大きさは、僕にも測定しきれない。これだけの資質を持つこと出会ったのは初めてだ。", situation: "まどかの部屋にて", comment: "勧誘開始" },
  { id: 19, episode: 3, text: "グリーフシードだ! 孵化しかかってる! まずいよ早く逃げないと! もうすぐ結界が出来上がる!", situation: "病院前", comment: "なんでこんなところにあるんでしょうね。" },
  { id: 20, episode: 3, text: "無茶だよ! 中の魔女が出てくるまでにもまだ時間があるけど、結界が閉じたら、君は外に出られなくなる! マミの助けが間に合うかどうか、、、", situation: "さやかが結界の中に入ろうとしている", comment: "エネルギー源が減ってしまうもんね。" },
  { id: 21, episode: 3, text: "まどか。先に行ってくれ。さやかには僕がついてる。マミならここまで来れば、テレパシで僕の位置がわかる。ここでさやかと一緒にグリーフシードを見張っていれば、最短距離で結界を抜けられるよう、マミを誘導できるから。", situation: "さやかに着いていくキュゥべえ", comment: "唯一の良心かもしれない。" },
  { id: 22, episode: 3, text: "怖いかい、さやか。願い事さえ決めてくれれば、今、この場で君を魔法少女にしてあげることもできるんだけど。", situation: "結界内", comment: "有無を言わせない状況下で勧誘するのずるいと思うな。" },
  { id: 23, episode: 3, text: "まだ大丈夫。すぐに孵化する様子はないよ。むしろ、迂闊に大きな魔力を使って卵を刺激する方がまずい。急がなくていいから、なるべく静かにきてくれるかい。", situation: "結界内", comment: "まともな会話。" },
  { id: 24, episode: 3, text: "気をつけて! 出てくるよ!", situation: "魔女出現", comment: "まともな会話2。" },
  { id: 25, episode: 3, text: "二人とも! 今すぐ僕と契約を! まどか! さやか! 願い事を決めるんだ、早く!", situation: "マミった直後", comment: "ここから雲行きが怪しくなる。" },

  // 第4話 [cite: 21]
  { id: 26, episode: 4, text: "長らくここはマミのテリトリーだったけど、空席になれば他の魔法少女が黙ってないよ。すぐにも魔女狩りのためにやってくる、、、", situation: "学校の屋上にて", comment: "何気に他の魔法少女がいることを示唆している初めての発言。" },
  { id: 27, episode: 4, text: "確かにマミみたいなタイプは珍しかった。普通はちゃんと損得を考えるよ。誰だって報酬は欲しいさ。でもそれを非難できるとしたら、それは同じ魔法少女としての運命を背負った子だけじゃないかな。", situation: "学校の屋上にて", comment: "損得で考えて行動してるもんね、キュゥべえ。" },
  { id: 28, episode: 4, text: "ふう。君たちの気持ちはわかった。残念だけど、僕だって無理強いはできない。お別れだね。僕はまた、僕との契約を必要としてる子を探しに行かないと。", situation: "勧誘の諦め", comment: "勧誘に値してるかの基準ってなんだろう?" },
  { id: 29, episode: 4, text: "こっちこそ、巻き込んですまなかった、、、短い間だったけど、ありがとう。一緒にいて楽しかったよ、まどか。", situation: "勧誘の諦め", comment: "まどかにしか言わないあたり裏を感じるね。" },
  { id: 30, episode: 4, text: "ふぅ、、、。まさか君がくるとはね。悪いけど、この土地には新しい魔法少女がいるんだ。ついさっき契約したばかりだけどね。どうするつもりだい? 杏子。", situation: "さやか契約後。杏子初登場。", comment: "杏子ちゃんとキュゥべえの会話好き" },

  // 第5話 [cite: 25]
  { id: 31, episode: 5, text: "大丈夫。君の祈りは間違いなく遂げられる。じゃあ、、、いいんだね? さあ、受け取るといい。それが君の運命だ。", situation: "さやかと契約", comment: "さやかちゃんの崩壊RTA、はっじまっるよー。" },
  { id: 32, episode: 5, text: "本当に彼女とことを構えるきかい? すべて君の思い通りに行くとは限らないよ。この街にはもう一人、魔法少女がいるからね。", situation: "杏子との会話", comment: "ここら辺のキュゥべえはキュゥべえ味が合っていいね。" },
  { id: 33, episode: 5, text: "僕にもよくわからない。そうとも言えるし、違うとも言える。あの子は極めつけのイレギュラーだ。どういう行動に出るか、僕にも予想できない。", situation: "ほむらちゃんについて", comment: "わからないことをわからないと認められるの偉いね。" },
  { id: 34, episode: 5, text: "緊張しているのかい?", situation: "さやか初パトロール。", comment: "緊張している状態は認知できるんですね。" },
  { id: 35, episode: 5, text: "危険は承知の上なんだね? そっか、うん。考えがあってのことならいいんだ。", situation: "まどかがパトロールに同伴", comment: "まどかを失うことは損失になるもんな。" },
  { id: 36, episode: 5, text: "君にも君の考えがあるんだろう? まどか。さやかを守りたい君の気持ちはわかる。実際、君が隣にいてくれるだけで、最悪の事態に備えた切り札を一つだけ用意できるしね。", situation: "キュゥべえとまどかのテレパシ", comment: "後半が本音だろ。" },
  { id: 37, episode: 5, text: "今は何も言わなくていい。さやかはきっと反対するだろうし。ただ、もし君が心決める時が来たら、僕の準備はいつでも整っているからね。", situation: "キュゥべえとまどかのテレパシ", comment: "私でよければ契約しますよ??" },
  { id: 38, episode: 5, text: "この結界は、多分魔女じゃなくて使い魔のものだね 油断は禁物だよ?", situation: "使い魔の結界内", comment: "油断は禁物だよって言われたいよぉ。" },
  { id: 39, episode: 5, text: "彼女は癒しの祈りを契約にして魔法少女になったからね。ダメージの回復力は人一倍だ。", situation: "さやか vs 杏子", comment: "冷静な実況してないで止めようね" },
  { id: 40, episode: 5, text: "まどか! 近づいたら危険だ! どうしようもない、、、お互い譲る気なんてまるでないよ。僕にはどうしようもない、、、", situation: "さやか vs 杏子", comment: "できるでしょ。諦めんなよぉ!" },
  { id: 41, episode: 5, text: "でも、どうしても力ずくでも止めたいのなら、方法がないわけじゃないよ。あの戦いに割り込むには、同じ魔法少女でなきゃダメだ。君にならその資格がある。本当にそれを望むならね。", situation: "さやか vs 杏子", comment: "本当に契約のことしか考えてないなこの子。" },

  // 第6話 [cite: 30, 33, 39]
  { id: 42, episode: 6, text: "大丈夫、気絶しているだけだ。", situation: "さやか気絶", comment: "ほむらちゃんも大変だ。" },
  { id: 43, episode: 6, text: "なんにせよ、彼女が何かを企んでいるのは確かだ。くれぐれも気をつけて! 暁美ほむら、、、君は、まさか、、、", situation: "ほむらへの疑念", comment: "キュゥべえ VS ほむらちゃんはいいぞ。" },
  { id: 44, episode: 6, text: "これでまたしばらくは大丈夫だ。もう危険だね。これ以上の穢れを吸ったら、魔女が孵化するかもしれない。", situation: "さやかの部屋", comment: "魔女って何回でも孵化するのかな?" },
  { id: 45, episode: 6, text: "大丈夫!貸して。きゅっぷい。これでもう安全だ。これもまた、僕の役目の一つだからね。", situation: "グリーフシードを食べるキュゥべえ", comment: "きゅっぷい頂きました!!!" },
  { id: 46, episode: 6, text: "でも、また次にソウルジェムを浄化するためには、早く新しいグリーフシードを手に入れないと。", situation: "グリーフシードを集める重要性", comment: "こういうところだけ見たら普通なのになあ。" },
  { id: 47, episode: 6, text: "佐倉杏子は強かっただろう? 余分なグリーフシードがあれば、魔法を出し惜しみせずに無駄遣いすることだってできる。それ杏子の強みだ。魔力を使えば使うほど、ソウルジェムには穢れが溜まるんだ。", situation: "グリーフシードを集める重要性", comment: "そんなしょっちゅう魔女って現れるの?" },
  { id: 48, episode: 6, text: "さやか、君がグリーフシードを集められない限り、杏子と戦っても勝ち目はないと思っていい。", situation: "グリーフシードを集める重要性", comment: "まるでキュゥべえがよき相棒のようだ。" },
  { id: 49, episode: 6, text: "確かにそれは事実だね。こればっかりは仕方ないよ。杏子は素質がある上にベテランだし。", situation: "才能の差は大きいという話", comment: "ベテランって何年からベテランなんだろ?" },
  { id: 50, episode: 6, text: "逆に、全く経験がなくても才能だけで杏子以上の魔法少女になれる天才だっている。鹿目まどかさ。", situation: "まどかは実は天才だって話。", comment: "キュゥべえの目には何が見えているのだろう。" },
  { id: 51, episode: 6, text: "ああ。だからもし、どうしても杏子に対抗する戦力が欲しいなら、いっそまどかに頼んでみるのも手だよ。彼女が僕と契約すれば、、、", situation: "まどか頼みの提案", comment: "全部まどかに結びつけるの良くないと思うな!" },
  { id: 52, episode: 6, text: "ダメだ。時間が経ちすぎている。昨夜(ゆうべ)の使い魔を追う手がかりはなさそうだ。", situation: "逃した使い魔の捜索中", comment: "君絶対わかるよね?? 探せ??" },
  { id: 53, episode: 6, text: "僕から言わせてもらえるのは、無謀すぎるってことだけだ。今のさやかじゃ、暁美ほむらにも佐倉杏子にも勝ち目はない。", situation: "さやかについての評価", comment: "スカウターみたいな感じで数値化されるのかな?" },
  { id: 54, episode: 6, text: "でもね、さやかは聞き届けてくれないよ。", situation: "まどかの心配はさやかには届かないという話", comment: "さやかちゃん、まどかの話を聞いてあげて、、、" },
  { id: 55, episode: 6, text: "まどか、まどか、、、! 急いで! さやかが危ない。着いてきて!", situation: "キュゥべえによる緊急呼び出し", comment: "そもそもなんで呼び出したんだ? また勧誘か?" },
  { id: 56, episode: 6, text: "今のはまずかったよ、まどか。よりにもよって友達を放り投げるなんて、どうかしてるよ。", situation: "さやかのソウルジェムをまどかが投げた直後", comment: "どうかしてるのはキュゥべえの方だと思うな!" },
  { id: 57, episode: 6, text: "君たち魔法少女が体をコントロールできるのは、せいぜい 100m 圏内が限度だからね。普段は当然肌身離さず持ち歩いてるんだから、こういう事故は滅多にあることじゃないんだけど。", situation: "さやかのソウルジェムをまどかが投げた直後", comment: "いきなりのカミングアウト。" },
  { id: 58, episode: 6, text: "はあ。まどか、そっちはさやかじゃなくて、ただの抜け殻なんだって。さやかはさっき、君が投げて捨てちゃったじゃないか。", situation: "キュゥべえによる説明タイム", comment: "最高だ。それでこそキュゥべえだ。" },
  { id: 59, episode: 6, text: "ただの人間と同じ、壊れやすい身体のままで、魔女と戦ってくれなんて、とてもお願いできないよ。", situation: "キュゥべえによる説明タイム", comment: "呆れてる感あって好き。かわいい。" },
  { id: 60, episode: 6, text: "君たち魔法少女にとって、元の身体なんていうのは、外付けのハードウェアでしかないんだ。君たちの本体としての魂には、魔力をより効率よく運用できる、コンパクトで、安全な姿が与えられているんだ。", situation: "キュゥべえによる説明タイム", comment: "説明の仕方が最高にキュゥべえしてて好き。" },
  { id: 61, episode: 6, text: "魔法少女との契約をとぎ結ぶ、僕の役目はね。君たちの魂を抜き取って、ソウルジェムに変えることなのさ。", situation: "キュゥべえによる説明タイム", comment: "言い方とニュアンスを変えるだけで印象ってこんなに変わるんだ..." },
  { id: 62, episode: 6, text: "むしろ便利だろう? 心臓が破れても、ありったけの血を抜かれても、その身体は魔力で修理すれば、すぐまた動くようになる。ソウルジェムさえ砕かれない限り、君たちは無敵だよ。弱点だらけの人体よりも、よほど戦いでは有利じゃないか。", situation: "キュゥべえによる説明タイム", comment: "F0000000!最高最高最高!" },
  { id: 63, episode: 6, text: "君たちはいつもそうだね、事実をありのままに伝えると、決まって同じ反応をする。訳が分からないよ。どうして人間はそんなに、魂の在処にこだわるんだい?", situation: "キュゥべえによる説明タイム", comment: "名言いただきましたーーーー!素晴らしいですキュゥべえ!" }
];

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
let game = [
  { id: 1, name: "勇者敗北ルート" },
  { id: 2, name: "勇者勝利ルート" },
];
app.get("/zelda", (req, res) => {
  res.render('zelda', { data: game });
});

let game2 = [
  {
    id:1,
    haiboku: [
      "神々のトライフォース",
      "夢を見る島",
      "ふしぎの木の実",
      "神々のトライフォース2",
      "トライフォース3銃士",
      "知恵のかりもの",
      "ゼルダの伝説",
      "リンクの冒険"
    ]
},
  {
    id: 2,
    adult: [
      "風のタクト",
      "夢幻の砂時計",
      "大地の汽笛"
    ],
    child: [
      "ムジュラの仮面",
      "トワイライトプリンセス",
      "4つの剣＋(ハイラルアドベンチャー)"
    ]
  },
]; 

//　詳細表示
app.get("/zelda/:number", (req, res) => {
  const number = req.params.number;
  const detail = game2[number];
  res.render('zelda_detail', { data: detail });
});

// Create
// 新規登録


// Delete

// Edit

// Update

// ーーーーー提出課題(マジミラ)ーーーーー
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
app.get("/keiyo2", (req, res) => {
  res.render('keiyo2', { data: station2 });
});

// Create
app.get("/keiyo2/create", (req, res) => {
  res.redirect('/public/keiyo2_new.html');
});

// Read
app.get("/keiyo2/:number", (req, res) => {
  const number = req.params.number;
  const detail = station2[number];
  res.render('keiyo2_detail', { id: number, data: detail });
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


app.listen(8080, () => console.log("Example app listening on port 8080!"));
