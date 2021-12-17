'use strict';

{
  $(function(){

  // 課題単語の配列
  let words = [
    "hello, world",
    "I have a pen",
    "rome was not built in a day.",
    "no pain, no gain.",
    "I have an apple",
    "Git comit"
  ]

  //パラメータセット
  // let typedWord = [];
  let typedKey = "";
  let missKey = "";
  let nextKey = "";
  let displayWord = "";
  let timeoutId;
  let countId;
  let isPlaying = false;

  let underBar = "";
  let time = 0;
  let point = 0;
  let loc = 0;
  let miss = 0;
  let count = 3;


    function setValue(){
      $("#word").text(displayWord);
      // $("#nextKey").text(nextKey);
      // $("#typedKey").text(typedKey);
      $("#typedWord").text(missKey);
      $("#score").text("score:" + point);
      $("#miss").text("miss: " + miss);
    }

    //カウントダウンの関数
    function countDown(){
      $("#word").text(count);
      countId = setTimeout(()=>{
        if(count <= 1){
          clearTimeout(countId);
          $("#word").text(words[0]);
        }else{
          count--;
          $("#word").text(count);
          countDown();
        }
      },1000)
    }

    //タイマー処理の関数
    function timeUpdate(){
      timeoutId = setTimeout(()=>{
        time += 1;
        $("#time").text("Time:" + time/100);
        if(time < 100000){
          timeUpdate();
        }else{
          $("#time").text("timeup")
          isPlaying = false;
        }
      },10);
    }

    // 正誤判定の関数
    function match(event){
      
      underBar = "";

        //次のkeyとタイプkeyの一致判定
        if(nextKey == event.key){
          //keyが一致しそれが単語の最後のKeyである時場合
          if(words[point].length -1 == loc){
            point++;
            //かつその時全ての単語が終了した場合
            if(point >= words.length){
              //タイマーの終了
              clearTimeout(timeoutId);
              $("#word").text("END");
              return;
              }
              loc = 0;
              nextKey = words[point][loc];
              displayWord = words[point];
              setValue();
          }else{
            //keyが一致したが単語はまだ続く場合
            //locまでの文字数文のアンダーバーを作成
            for(let i = 0; i <= loc; i++){
              underBar += "_";
            }
            loc++;
            displayWord = underBar + words[point].substring(loc);
            nextKey = words[point][loc];
            setValue();
          }
        }else{
          //keyが一致しない場合
          miss++;
          // missKey.push(event.key + " ");
          missKey += " " + event.key;
          setValue();
        }
    }


    // キーを押したときのイベント
    $(window).keydown(function(event) {
      if(isPlaying){
        if( event.key !== "Shift"){
          typedKey += event.key;
          setValue();
        
          // 正誤判定
          match(event);
        //Shiftが押された場合
        }else{
        // typedWord.push(typedKey);
        setValue();
        }
      }else{
        return;
      }
    });

    //クリックしてタイピングスタート
    $(window).click(function(){
      if(isPlaying){
        return
      }else{
        isPlaying = true;
        countDown();
        // nextKeyをセット
        nextKey = words[point][loc];
        // $("#nextKey").text(nextKey);
      
        //タイマースタート
        timeUpdate();
      }
    })
  })


}