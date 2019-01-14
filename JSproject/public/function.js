$(document).ready(()=>{ // jQuery main

    let stage = new createjs.Stage(canvas);
    let repo = new createjs.LoadQueue();

    let greenScore = 0;
    let blueScore = 0;
    let b=document.getElementById('blueScore');  //取得顯示藍色分數的div
    let g=document.getElementById('greenScore');  //取得顯示綠色分數的div

    let peopleList = [];
    let numOfPeople = 1000;

    let team = 'green';
    let playerside;
    let bluespot = new createjs.Shape();
    let greenspot = new createjs.Shape();

    function random(min,max) {
        return parseInt(Math.random()*(max - min) + min);
    }


    function People(x, y, r){
        this.type = random(1,3);
        if(this.type == 1){
            this.r = 20;
        }else{
            this.r = 30;
        };
       // this.r = 20;
        // this.x = x || random(-50, 1000 - this.r);//產生範圍x
        // this.y = y || random(-200, 600- this.r);//產生範圍y
        this.x = x || random(-50, 4100 - this.r);//產生範圍x
        this.y = y || random(-200, 2300- this.r);//產生範圍y
        this.shape = new createjs.Shape();
        this.speedX = random(-100, 100);
        this.speedY = random(-100, 100);
        this.isEaten = false;
    }

    function createPeopleList() {
        for(let i = 0;i < numOfPeople;i++){
            let person = new People();
            peopleList.push(person)
        }
    }

    function drawPeople() {
        for(let i = 0;i < numOfPeople;i++){
            let people = peopleList[i];
            people.shape.graphics.beginFill('white').drawEllipse(people.x,people.y,people.r,people.r);
            stage.addChild(people.shape);
            let wait = random(0, 1000);
            let speedTime = random(1500, 4000);

            // createjs.Tween.get(people.shape, {loop: true,pause:true})
            //     .to({x: -people.speedX, y: people.speedY}, speedTime).wait(wait).to({x: people.speedX, y: -people.speedY}, speedTime).wait(wait)
            //     .to({x: people.speedX, y: people.speedY}, speedTime).wait(wait).to({x: -people.speedX, y: -people.speedY}, speedTime).wait(wait)
            //     .to({x: people.speedX, y: people.speedY}, speedTime).wait(wait).to({x: -people.speedX, y: -people.speedY}, speedTime).wait(wait)
            //     .to({x: -people.speedX, y: people.speedY}, speedTime).wait(wait).to({x: 0, y: 0}, speedTime).wait(wait)
            // ;
        }
    }

        function isTouched(people){
            let r = 25;
            if(people.shape.x + people.x >= 500 - r && people.shape.x + people.x <= 500 + r){
                if(people.shape.y + people.y >= 300 - r && people.shape.y + people.y <= 300 + r){
                    return true;
                }
            }
            return false;
        }

    function enemyCount(xposition,yposition){
        for(let i = 0;i < numOfPeople;i++) {
            //全部人
            let people = peopleList[i];
            function isTouchedByEnemy(){
                let r = 25;
                if(people.shape.x + people.x >= xposition - r && people.shape.x + people.x <= xposition + r){
                    if(people.shape.y + people.y >= yposition - r && people.shape.y + people.y <= yposition + r){
                        return true;
                    }
                }
                return false;
            }
            if(team === 'green'){
                if(isTouchedByEnemy(people,bluespot) && !people.isEaten){
                    stage.removeChild(people.shape);
                    blueScore += people.type;
                    people.isEaten = true;
                    b.innerHTML=blueScore;
                    g.innerHTML=greenScore;
                };
            }else{
                if(isTouchedByEnemy(people,greenspot) && !people.isEaten){
                    stage.removeChild(people.shape);
                    greenScore += people.type;
                    people.isEaten = true;
                    b.innerHTML=blueScore;
                    g.innerHTML=greenScore;
                };
            }
        }
    }


        function offsetPeople(direction,point,team){
            for(let i = 0;i < numOfPeople;i++) {
                let people = peopleList[i];
                // left
                if(direction==37){
                        people.shape.x += point;
                }//up
                else if(direction==38){
                        people.shape.y += point;
                }//right
                else if(direction==39){
                        people.shape.x -= point;
                }//dowm
                else if(direction==40){
                        people.shape.y -= point;
                };

                if(isTouched(people) && !people.isEaten){
                    stage.removeChild(people.shape);
                    if(team === 'green'){
                        greenScore += people.type;
                        //blueScore += random(0,3);
                    }else{
                        blueScore += people.type;
                        //greenScore += random(0,3);
                    };
                    people.isEaten = true;
                    b.innerHTML=blueScore;
                    g.innerHTML=greenScore;
                };

            }

        }



    function setup() {
        // automatically update
        createjs.Ticker.on("tick", e => stage.update());
        createjs.Ticker.framerate = 60;
        //預先載入資源
        repo.loadManifest([
            {id:'begin_canvas',src:"images/begin_canvas.png"},
            {id:'blue_wins',src:"images/blue_wins.png"},
            {id:'blueA',src:"images/blueA.png"},
            {id:'blueB',src:"images/blueB.png"},
            {id:'choice0',src:"images/choice0.png"},
            {id:'choice1',src:"images/choice1.png"},
            {id:'choice2',src:"images/choice2.png"},
            {id:'green_wins',src:"images/green_wins.png"},
            {id:'greenA',src:"images/greenA.png"},
            {id:'greenB',src:"images/greenB.png"},
            {id:'restart',src:"images/restart.png"},
            {id:'restart_hovered',src:"images/restart_hovered.png"},
            {id:'start',src:"images/start.png"},
            {id:'start_hovered',src:"images/start_hovered.png"},
            {id:'backGroundTPI',src:"images/backGroundTPI2.png"},
            {id:'blue_choice',src:"images/blue_choice.png"},
            {id:'green_choice',src:"images/green_choice.png"},
            {id:'drawPic',src:"images/draw.png"},
            {id:'startmusic',src:"music/startmusic.mp3"},
            {id:'gamemusic',src:"music/gamemusic.mp3"},
            {id:'winmusic',src:"music/winmusic.mp3"},
            {id:'failmusic',src:"music/failmusic.mp3"},
            {id:'drawmusic',src:"music/drawmusic.mp3"},
        ]);
        repo.on('complete', draw);

        createPeopleList();

    }


    function draw(){

        //音樂
        let startmusic = repo.getResult('startmusic');
        let gamemusic = repo.getResult('gamemusic');
        let winmusic = repo.getResult('winmusic');
        let failmusic = repo.getResult('failmusic');
        let drawmusic = repo.getResult('drawmusic');

        //啟用mouseover功能
        stage.enableMouseOver();

        //隨機腳色圖片
        let playerRandom = Math.floor(Math.random() * 2)+1;

        //載入圖片
        let begin_canvas = new createjs.Bitmap(repo.getResult('begin_canvas'));
        let blue_wins = new createjs.Bitmap(repo.getResult('blue_wins'));
        let blueA = new createjs.Bitmap(repo.getResult('blueA'));
        let blueB = new createjs.Bitmap(repo.getResult('blueB'));
        let choice0 = new createjs.Bitmap(repo.getResult('choice0'));
        let choice1 = new createjs.Bitmap(repo.getResult('choice1'));
        let choice2 = new createjs.Bitmap(repo.getResult('choice2'));
        let green_wins = new createjs.Bitmap(repo.getResult('green_wins'));
        let greenA = new createjs.Bitmap(repo.getResult('greenA'));
        let greenB = new createjs.Bitmap(repo.getResult('greenB'));
        let restart = new createjs.Bitmap(repo.getResult('restart'));
        let restart_hovered = new createjs.Bitmap(repo.getResult('restart_hovered'));
        let start = new createjs.Bitmap(repo.getResult('start'));
        let start_hovered = new createjs.Bitmap(repo.getResult('start_hovered'));
        let backGroundTPI = new createjs.Bitmap(repo.getResult('backGroundTPI'));
        let blue_choice = new createjs.Bitmap(repo.getResult('blue_choice'));
        let green_choice = new createjs.Bitmap(repo.getResult('green_choice'));
        let drawPic = new createjs.Bitmap(repo.getResult('drawPic'));//////////////////////////

        //玩家變數、人民變數
        let player_spot_size = 30;

        let whitespot = new createjs.Shape();


        //輔助陣營選單的變數
        let blue_bound = new createjs.Shape();
        let green_bound = new createjs.Shape();


        //計時器的變數、function、遊戲結束
        let countdownnumber = 60; // 目前測試     實際遊戲為90秒鐘
        let countdownid, x;


        function initialTimer(){
            x=document.getElementById("countdown");
            x.innerHTML=countdownnumber+"秒";
            countdownnumber--; //把裡面的值-1
            countdownid=window.setInterval(countdownfunc,1000);  //設定定時器, 每一秒執行一次countdownfunc
        }

        function countdownfunc(){
            x.innerHTML=countdownnumber+"秒";
            if (countdownnumber==0){
                clearInterval(countdownid);
                if (blueScore > greenScore){
                    gamemusic.pause();
                    if (playerside == 'green'){
                        setTimeout(function () {
                            failmusic.play();
                        },300);
                    }
                    if (playerside == 'blue'){
                        setTimeout(function () {
                            winmusic.play();
                        },300);
                    }

                    blue_wins.set({scaleX: 0.5, scaleY: 0.5});
                    restart.set({scaleX: 0.5, scaleY: 0.5, regX: start.image.width/2, regY: start.image.height/2, x: 250, y: 500});
                    stage.addChild(blue_wins);
                    stage.removeChild(bluespot, greenspot, backGroundTPI);

                    //重新開始
                    stage.addChild(restart);
                    restart.on('mouseover',()=>{
                        restart_hovered.set({scaleX: 0.5, scaleY: 0.5, regX: start.image.width/2, regY: start.image.height/2, x: 250, y: 500});
                        stage.addChild(restart_hovered);
                    });
                    restart.on('mouseout',()=>{
                        stage.removeChild(restart_hovered);
                    });
                    restart.on('click',()=>{
                        location.reload(true);  //按下重新開始會重新載入畫面

                    });

                }
                else if (blueScore < greenScore){
                    gamemusic.pause();
                    if (playerside == 'green'){
                        setTimeout(function () {
                            winmusic.play();
                        },300);
                    }
                    if (playerside == 'blue'){
                        setTimeout(function () {
                            failmusic.play();
                        },300);
                    }

                    green_wins.set({scaleX: 0.5, scaleY: 0.5});
                    restart.set({scaleX: 0.5, scaleY: 0.5, regX: start.image.width/2, regY: start.image.height/2, x: 250, y: 500});
                    stage.addChild(green_wins);
                    stage.removeChild(bluespot, greenspot, backGroundTPI);

                    //重新開始
                    stage.addChild(restart);
                    restart.on('mouseover',()=>{
                        restart_hovered.set({scaleX: 0.5, scaleY: 0.5, regX: start.image.width/2, regY: start.image.height/2, x: 250, y: 500});
                        stage.addChild(restart_hovered);
                    });
                    restart.on('mouseout',()=>{
                        stage.removeChild(restart_hovered);
                    });
                    restart.on('click',()=>{
                        location.reload(true); //按下重新開始會重新載入畫面
                    });

                }
                else{
                    gamemusic.pause();
                    setTimeout(function () {
                        drawmusic.play();
                    },300);

                    stage.removeChild(bluespot, greenspot, backGroundTPI);
                    drawPic.set({scaleX: 0.5, scaleY: 0.5});
                    stage.addChild(drawPic);

                    restart.set({scaleX: 0.5, scaleY: 0.5, regX: start.image.width/2, regY: start.image.height/2, x: 500, y: 500});
                    stage.addChild(restart);
                    restart.on('mouseover',()=>{
                        restart_hovered.set({scaleX: 0.5, scaleY: 0.5, regX: start.image.width/2, regY: start.image.height/2, x: 500, y: 500});
                        stage.addChild(restart_hovered);
                    });
                    restart.on('mouseout',()=>{
                        stage.removeChild(restart_hovered);
                    });
                    restart.on('click',()=>{
                        location.reload(true);  //按下重新開始會重新載入畫面
                    });
                }

                x.innerHTML= ' ';      //取消顯示倒數時間
                g.innerHTML= ' ';      //取消顯示綠色分數
                b.innerHTML= ' ';      //取消顯示藍色分數
                countdownnumber = 91;  //這裡要把秒數改成(遊戲時間+1)秒
            }
            countdownnumber--;
        }

        startmusic.play();
        startmusic.loop = true;

        //遊戲選單
        begin_canvas.set({scaleX: 0.5, scaleY: 0.5, x:-10});
        start.set({scaleX: 0.5, scaleY: 0.5, regX: start.image.width/2, regY: start.image.height/2, x: 500-10, y: 400});
        stage.addChild(begin_canvas,start);



        //按鈕滑鼠hover
        start.on("mouseover",()=>{
            start_hovered.set({scaleX: 0.5, scaleY: 0.5, regX: start.image.width/2, regY: start.image.height/2, x: 500-10, y: 400});
            stage.addChild(start_hovered);
        });
        start.on("mouseout",()=>{
            stage.removeChild(start_hovered);
        });

        //按鈕點擊，開始遊戲

        start.on('click', () => {
            start_hovered.set({scaleX: 0.5, scaleY: 0.5, regX: start.image.width/2, regY: start.image.height/2, x: 500, y: 400});
            stage.addChild(start_hovered);
            choice0.set({scaleX: 0.5, scaleY: 0.5, x:-20});
            blue_bound.graphics.beginFill("rgba(128, 128, 128, 0.01)").drawRect(0, 0, 500, 600);
            green_bound.graphics.beginFill("rgba(128, 128, 128, 0.01)").drawRect(500, 0, 500, 600);
            stage.addChild(choice0,blue_bound,green_bound);
            stage.removeChild(begin_canvas,start,start_hovered);
        });

        //滑鼠hover綠色陣營
        green_bound.on('mouseover',()=>{
            choice2.set({scaleX: 0.5, scaleY: 0.5, x:-20});
            stage.addChild(choice2);
        });
        green_bound.on('mouseout', ()=>{
            stage.removeChild(choice2);
        });

        //滑鼠hover藍色陣營
        blue_bound.on('mouseover', ()=>{
            choice1.set({scaleX: 0.5, scaleY: 0.5, x:-20});
            stage.addChild(choice1);
        });
        blue_bound.on('mouseout', ()=>{
            stage.removeChild(choice1);
        });

        //點擊綠色陣營
        green_bound.on('click', ()=>{
            playerside = 'green';
            startmusic.pause();
            setTimeout(function() {
                gamemusic.play();
            },1000);
            stage.removeChild(choice0);
            stage.removeChild(blue_bound,green_bound);
            createjs.Tween.get(choice2).wait(1000).call(()=> {
                //隨機出現綠色陣營的其中一個角色
                greenA.set({scaleX: 0.5, scaleY: 0.5});
                greenB.set({scaleX: 0.5, scaleY: 0.5});
                if(playerRandom == 1){
                    stage.addChild(greenA);
                }else{
                    stage.addChild(greenB);
                }
                stage.removeChild(choice2);

            }).wait(1000).call(()=>{
                if(playerRandom == 1){
                    stage.removeChild(blueA);
                }else{
                    stage.removeChild(blueB);
                };

                //遊戲背景
                backGroundTPI.set({scaleX: 0.5, scaleY: 0.5, x:-600 ,y: -600});
                stage.addChild(backGroundTPI);

                //玩家
                greenspot.graphics.beginFill('green').drawEllipse(500-(player_spot_size/2),300-(player_spot_size/2),player_spot_size,player_spot_size);
                stage.addChild(greenspot);

                //************
                //玩家吸引碰撞

                drawPeople();

                //***********************
                // 電腦玩家
                // 電腦玩家自動跑(還沒寫好)  -交給杰修了> <
                //***********************
                bluespot.graphics.beginFill('blue').drawEllipse(500+(player_spot_size/2),300+(player_spot_size/2),player_spot_size,player_spot_size);

                createjs.Tween.get(bluespot)
                    .to({x:bluespot.x+500, y:bluespot.y+600},10000).to({x:bluespot.x-600, y:bluespot.y-200},10000)
                    .to({x:bluespot.x+300, y:bluespot.y+200},10000).to({x:bluespot.x-200, y:bluespot.y-300},10000)
                    .to({x:bluespot.x+200, y:bluespot.y+100},10000).to({x:bluespot.x-100, y:bluespot.y-500},10000).addEventListener("change", handleChange)
                ;
            // .to({x:bluespot.x+100, y:bluespot.y+300},5000).to({x:bluespot.x-800, y:bluespot.y-200},5000)
            //         .to({x:bluespot.x+700, y:bluespot.y+200},5000).to({x:bluespot.x-300, y:bluespot.y-600},5000)
            //         .to({x:bluespot.x+200, y:bluespot.y+300},5000).to({x:bluespot.x-200, y:bluespot.y-400},5000)
                function handleChange(event){
                    console.log(500+(player_spot_size/2)+bluespot.x);
                    enemyCount((500+(player_spot_size/2)+bluespot.x), (300+(player_spot_size/2)+bluespot.y));
                };

                stage.addChild(bluespot);
                // createjs.Tween.get(bluespot)
                //     .to({x:bluespot.x+500, y:bluespot.y+200},3000).wait(1000).to({x:bluespot.x-600, y:bluespot.y-200},3000).wait(1000).to({x:bluespot.x+500, y:bluespot.y+400},4000);
            }).wait(500).call(()=>{
                //開始倒數計時，顯示兩方分數
                initialTimer();
                b.innerHTML=blueScore;
                g.innerHTML=greenScore;

            });
        });

        //點擊藍色陣營
        blue_bound.on('click', ()=>{
            playerside = 'blue';
            startmusic.pause();
            setTimeout(function() {
                gamemusic.play();
            },1000);
            stage.removeChild(choice0);
            stage.removeChild(blue_bound,green_bound);
            createjs.Tween.get(choice1).wait(1000).call(()=> {
                //隨機出現藍色陣營的其中一個角色
                blueA.set({scaleX: 0.5, scaleY: 0.5});
                blueB.set({scaleX: 0.5, scaleY: 0.5});
                if(playerRandom == 1){
                    stage.addChild(blueA);
                }else{
                    stage.addChild(blueB);
                };
                stage.removeChild(choice1);

            }).wait(1000).call(()=>{
                if(playerRandom == 1){
                    stage.removeChild(blueA);
                }else{
                    stage.removeChild(blueB);
                };
                team = 'blue';
                //遊戲背景
                backGroundTPI.set({scaleX: 0.5, scaleY: 0.5, x:-600,y:-600});
                stage.addChild(backGroundTPI);

                //玩家
                bluespot.graphics.beginFill('blue').drawEllipse(500-(player_spot_size/2),300-(player_spot_size/2),player_spot_size,player_spot_size);
                stage.addChild(bluespot);

                //************
                //玩家吸引碰撞
                //************
                drawPeople();




                //***********************
                //電腦玩家
                // 電腦玩家自動跑(還沒寫好)  -交給杰修了> <

                greenspot.graphics.beginFill('green').drawEllipse(500+(player_spot_size/2),300+(player_spot_size/2),player_spot_size,player_spot_size);
                createjs.Tween.get(greenspot)
                    .to({x:greenspot.x+500, y:greenspot.y+600},10000).to({x:greenspot.x-600, y:greenspot.y-200},10000)
                    .to({x:greenspot.x+300, y:greenspot.y+200},10000).to({x:greenspot.x-200, y:greenspot.y-300},10000)
                    .to({x:greenspot.x+200, y:greenspot.y+100},10000).to({x:greenspot.x-100, y:greenspot.y-500},10000).addEventListener("change", handleChange2)
                ;
                // .to({x:bluespot.x+100, y:bluespot.y+300},5000).to({x:bluespot.x-800, y:bluespot.y-200},5000)
                //         .to({x:bluespot.x+700, y:bluespot.y+200},5000).to({x:bluespot.x-300, y:bluespot.y-600},5000)
                //         .to({x:bluespot.x+200, y:bluespot.y+300},5000).to({x:bluespot.x-200, y:bluespot.y-400},5000)
                function handleChange2(event){
                    console.log(500+(player_spot_size/2)+greenspot.x);
                    enemyCount((500+(player_spot_size/2)+greenspot.x), (300+(player_spot_size/2)+greenspot.y));
                };

                stage.addChild(greenspot);

            }).wait(1200).call(()=>{
                //開始倒數計時
                initialTimer();
                b.innerHTML=blueScore;         //////////////////
                g.innerHTML=greenScore;        //////////////////
            });
        });
        //*********************************************
        //白色要被吸的人民看要不要也跟著動                               -景雲、輔
        //碰撞吸引看你們怎麼寫都可以(前面我大概備註了位置 但也還不確定)
        //電腦玩家也要有碰撞吸引功能，玩家跟電腦可以互相搶人民
        //如果還有時間可加道具功能
        //要在畫布上顯示目前分數
        //*********************************************
        //鍵盤控制 (玩家固定畫面中間，背景圖和人民移動)
        window.addEventListener("keydown", (e)=>{

           // let team = 'green';
            let point = 10;

            switch(e.keyCode){
                case 37:// left
                    if(backGroundTPI.x<-40){
                        backGroundTPI.x += point;
                        offsetPeople(37,point,team)
                    };
                    console.log('people:',peopleList[0].x,peopleList[0].y);
                    console.log('people Shape:',peopleList[0].shape.x,peopleList[0].shape.y);
                    console.log('bg',backGroundTPI.x,backGroundTPI.y);
                    console.log('player',team.x,team.y);

                    break;
                case 38:// up
                    if(backGroundTPI.y<-115){
                        backGroundTPI.y += point;
                        offsetPeople(38,point,team)
                    };
                    console.log('people:',peopleList[0].x,peopleList[0].y);
                    console.log('people Shape:',peopleList[0].shape.x,peopleList[0].shape.y);
                    console.log('bg',backGroundTPI.x,backGroundTPI.y);
                    console.log('player',team.x,team.y);

                    break;
                case 39:// right
                    if(backGroundTPI.x>-4175){
                        backGroundTPI.x -= point
                        offsetPeople(39,point,team)
                    };
                    console.log('people:',peopleList[0].x,peopleList[0].y);
                    console.log('people Shape:',peopleList[0].shape.x,peopleList[0].shape.y);
                    console.log('bg',backGroundTPI.x,backGroundTPI.y);
                    console.log('player',team.x,team.y);

                    break;
                case 40:// down
                    if(backGroundTPI.y>-2580){
                        backGroundTPI.y -= point
                        offsetPeople(40,point,team)
                    };
                    console.log('people:',peopleList[0].x,peopleList[0].y);
                    console.log('people Shape:',peopleList[0].shape.x,peopleList[0].shape.y);
                    console.log('bg',backGroundTPI.x,backGroundTPI.y);
                    console.log('player',team.x,team.y);

                    break;
            }
        });
    }

    setup();
});






