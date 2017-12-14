let infiniplaymode = 0;
window.onload = function(){
	function main(){
		let c = {
			count : 0,//歩行画像変更用
			escapeflag : 0,//回避しているかの判定フラグ
			x : 0,//敵の座標
			v : 5,//敵の移動距離初期値
			great : 0,//回避成功回数
			good : 0,//回避成功回数
			gameover : 0,
			creamario : 0,
			creaenemy : 0,
			cenemy : Math.floor( Math.random() * 11 )
		};

		let f = {
			chraset:function(){//ゲームの初期設定
				$(document).ready(function () {
					//アニメーションスピード
					var scrollSpeed = 1;
					//画像サイズ
					var imgWidth = 1500;
					//画像の初期位置
					var posX = 0;
					//ループ処理
					setInterval(function(){
						//画像のサイズまで移動したら0に戻る。
						if (posX >= imgWidth) posX= 0;
						//scrollSpeed分移動
						posX -= scrollSpeed;
						$('body').css("background-position",posX+"px 0px");
					}, 1);
				});
				//BGM再生
				document.getElementById("backsound").volume = 0.7;
				document.getElementById("backsound").play();
				document.getElementById("backsound").loop = true;
				//marioの描画
				let mario = document.createElement("img");
				mario.setAttribute("id","mario")
				mario.setAttribute("style","position:absolute;width:20%;height:20%;top:645px;")
				document.body.appendChild(mario);
				//敵の描画
				let enemy = document.createElement("img");
				enemy.setAttribute("id","enemy")
				enemy.setAttribute("style","position:absolute;width:10%;height:10%;right:0px;top:730px;")
				document.body.appendChild(enemy);
			},
			walkfunc:function(){//歩き続ける関数
				if(c.count % 2 === 0){
					mario.setAttribute("src","./img/walk1.png")
				}else{
					mario.setAttribute("src","./img/walk2.png")
				}
				c.creamario = setTimeout(f.walkfunc, 800);
				c.count++;
			},
			enemyfunc:function(){//敵を投げ続ける関数
				if(c.cenemy % 2 === 0){
					enemy.setAttribute("style","position:absolute;width:10%;height:10%;right:0px;top:730px;")
					enemy.setAttribute("src","./img/togezo.png")
				}else{
					enemy.setAttribute("style","position:absolute;width:10%;height:10%;right:0px;top:640px;")
					enemy.setAttribute("src","./img/killer.png")
				}
				c.x += c.v;
				if(c.x > 1700) {//座標外に出たらリセットする
					c.x = 0;
					c.escapeflag = 0;
					c.v = Math.floor( Math.random() * 5 ) + 5;//速さをランダムにする
					c.cenemy = Math.floor( Math.random() * 11 );
				}
				document.getElementById("enemy").style.right = c.x+"px";
				c.creaenemy = setTimeout(f.enemyfunc, 1);
				f.judgefunc();
			},
			escapefunc:function (e){//回避関数
				let key_code = e.keyCode;
				if(key_code === 38 && c.gameover === 0){//上矢印ボタンが押されたら
					c.escapeflag = 1;//回避した瞬間に判定ON
					mario.setAttribute("src","./img/stop.png")//すぐに停止
					setTimeout(function() {
						mario.setAttribute("src","./img/squat.png")//0.3秒後にしゃがむ
					}, 100);
					setTimeout(function() {//0.5秒後に回避
						document.getElementById("jumpsound").play();
						document.getElementById("mario").style.top = "540px";
						mario.setAttribute("src","./img/jump.png")
						if(c.x > 1100 && c.x < 1600){//敵をよけられたか座標から判定
							c.great += 1;
							f.gomefunc();
							document.getElementById("great").textContent = c.great;
						}else{
							c.good += 1;
							document.getElementById("good").textContent = c.good;
						}
					}, 300);
					setTimeout(function() {//0.7秒後に着地
						c.escapeflag = 0;
						mario.setAttribute("src","./img/stop.png")
						document.getElementById("mario").style.top = "645px";
					}, 500);
				}else if(key_code === 40 && c.gameover === 0){
					c.escapeflag = 2;//回避した瞬間に判定ON
					document.getElementById("squatsound").currentTime = 0.3;
					document.getElementById("squatsound").play();
					mario.setAttribute("src","./img/syunkan.png")//すぐに停止
					setTimeout(function() {
						//document.getElementById("").play();
						if(c.x > 1300 && c.x < 1600){//敵をよけられたか座標から判定
							c.great += 1;
							f.gomefunc();
							document.getElementById("great").textContent = c.great;
						}else{
							c.good += 1;
							document.getElementById("good").textContent = c.good;
						}
					}, 300);
					setTimeout(function() {
						c.escapeflag = 0;
						mario.setAttribute("src","./img/stop.png")
					}, 1300);
				}
				else{
					c.escapeflag = 0;
				}
			},
			judgefunc:function(){//敵当たり判定
				if(c.cenemy % 2 === 0 && c.escapeflag === 2 && c.x > 1320 && c.x < 1400){
					if(infiniplaymode ===0)f.gameoverfunc();
				}else if(c.cenemy % 2 !== 0 && c.escapeflag === 1 && c.x > 1320 && c.x < 1400){
					if(infiniplaymode ===0)f.gameoverfunc();
				}else if(c.escapeflag === 0 && c.x > 1320 && c.x < 1400){
					if(infiniplaymode ===0)f.gameoverfunc();
				}
			},
			gameoverfunc:function(){//ゲーム終了処理
				document.getElementById("deathsound").play();//ダメージSE
				mario.setAttribute("src","./img/dead.png")//マリオの画像変更
				document.getElementById("backsound").pause();//BGM定時
				document.body.style = "background:rgba(0,0,0,1);";//背景消す
				var score = document.getElementById("score");
				score.style.color = "#00A474";
				clearTimeout(c.creamario);//マリオ停止
				clearTimeout(c.creaenemy);//敵停止
				c.gameover = 1;
				let gameovergif = document.createElement("img");
				gameovergif.setAttribute("src","./img/gameover.gif")
				gameovergif.setAttribute("id","gameovergif")
				document.body.appendChild(gameovergif);
				document.getElementById("gameoversound").play();
				f.calcpointfunc();
				f.replayfunc();
			},
			gomefunc:function(){//ごまだれ用関数
				if(c.great % 10 === 0){
					document.getElementById("gomasound").play();
				}
			},
			replayfunc:function(){//リプレイ用関数
				setTimeout(function() {
					document.body.removeChild(mario);
					document.body.removeChild(enemy);
					let replaypic = document.createElement("img");
					replaypic.setAttribute("src","./img/replay.png")
					replaypic.setAttribute("id","replaypic")
					replaypic.setAttribute("onclick","location.reload()")
					document.body.appendChild(replaypic);
				}, 10000);
			},
			calcpointfunc:function(){//得点計算用関数
				let sumpoints = 0;
				sumpoints = (c.great*1.5) + c.good;
				if(sumpoints >= 15){
					console.log("いいセンスだ");
				}
			}
		};

		return function(){
			f.chraset();
			f.enemyfunc();
			f.walkfunc();
			document.onkeydown = f.escapefunc;
		};
	}
    main();
};