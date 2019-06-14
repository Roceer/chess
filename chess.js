$(function(){
    //棋子循环安排他
    let box = $(".box");
    let flag = true;
    let black = {}, white = {};//定义两种颜色的棋子的空对象
    let blank = {};
    for (let i = 0; i < 15; i++){
        for (let j = 0; j < 15; j++){//添加棋子
            $("<div>").addClass("chess").appendTo(box)
                .attr("id",i + "_" + j);
            blank[i + "_" + j] = true;//定义空白区域的棋子为真
        }
    }

    let ai = true;
    box.on("click",".chess",function(){
        //若此处已有棋子禁止落子
        if($(this).hasClass("black") || $(this).hasClass("white")){
            return;
        }
        flag = !flag;
        let coordinate = $(this).attr("id");
        //通过flag判断是否已经落子以及其颜色
        if(flag){
            black[coordinate] = true;//为棋子设置黑棋的属性值为true
            delete blank[coordinate];//删除定义的空白棋子属性值
            $(this).addClass("black");
            if(success(black,coordinate) >= 5){
                alert("黑棋胜");
                console.log("黑棋胜");
                box.off("click");//胜利关闭点击事件
            }

        }else {
            white[coordinate] = true;
            delete blank[coordinate];
            $(this).addClass("white");
            if(success(white,coordinate) >= 5){
                alert("白棋胜");
                console.log("白棋胜");
                box.off("click");
            }
            if(ai){
                //此处写符合条件后人机落子
                let P = aifn();
                black[P] = true;
                delete blank[P];
                $("#"+P).addClass("black");
                if(success(black,P) >= 5){
                    alert("黑棋胜");
                    console.log("黑棋胜");
                    box.off("click");
                }
                flag = !flag;
            }
        }
    })

    function aifn(){
        let blankScorce = 0 , whiteScore = 0;
        let P1 = "" , P2 = "";
        for (let i in blank){
            let score = success(black,i);
            if(score >= blankScorce){
                blankScorce = score;
                P1 = i;
            }
        }
        for (let i in blank){
            let score = success(white,i);
            if(score >= whiteScore){
                whiteScore = score;
                P2 = i;
            }
        }
        return blankScorce >=whiteScore  ? P1 : P2 ;
    }

    function success(obj,coordinate){
        let [x, y] = coordinate.split("_");
        let  X = 1 ,  Y = 1, L = 1, R = 1;
        let i = x*1 , j = y*1;

        //X_axis
        while (obj[i + "_" + (++j)]) {
            X++;
        }
        j = y * 1;
        while (obj[i + "_" + (--j)]) {
            X++;
        }

        //Y_axis
        j = y * 1;
        while (obj[(++i) + "_" + j]) {
            Y++;
        }
        i = x * 1;
        while (obj[(--i) + "_" + j]) {
            Y++;
        }

        //Lcross_axis
        i = x * 1;
        while (obj[(--i) + "_" + (--j)]) {
            L++;
        }
        i = x * 1;  j = y * 1;
        while (obj[(++i) + "_" + (++j)]) {
            L++;
        }

        //Rcross_axis
        i = x * 1;  j = y * 1;
        while (obj[(++i) + "_" + (--j)]) {
            R++;
        }
        i = x * 1;  j = y * 1;
        while (obj[(--i) + "_" + (++j)]) {
            R++;
        }

        return Math.max(X,Y,L,R);
    }
})