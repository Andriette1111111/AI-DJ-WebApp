song="";
leftWristX= 0;
leftWristY= 0;
rightWristX= 0;
rightWristY= 0;
leftWristscore= 0;

function preload(){
    song= loadSound("music.mp3");
}

function setup(){
    canvas= createCanvas(400,500);
    canvas.center();
    video= createCapture(VIDEO);
    video.hide();

    poseNet= ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function draw(){
    image(video, 0, 0, 400, 500);

    fill("red");
    stroke("black");

    if(leftWristscore>0.2){
    circle(leftWristX, leftWristY, 20);
    InNumberleftWristY= Number(leftWristY);
    remove_decimals= floor(InNumberleftWristY);
    volume= remove_decimals/500;
    document.getElementById("volume_label").innerHTML= "Volume= " + volume;
    setvolume(volume);
    }
}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function modelLoaded(){
    console.log("Posenet has been loaded");
}

function gotPoses(results){
    if(results.length>0){
        console.log(results);

        leftWristscore= results[0].pose.keypoints[9].score;
        console.log("The score of left wrist= " + leftWristscore);

        leftWristX= results[0].pose.leftWrist.x;
    leftWristY= results[0].pose.leftWrist.y;
    console.log("The x coordinate of left wrist= "+ leftWristX+"and the y coordinate of left wrist= "+leftWristY);
    rightWristX= results[0].pose.rightWrist.x;
    rightWristY= results[0].pose.rightWrist.y;
    console.log("The x coordinate of right wrist= "+ rightWristX+"and the y coordinate of right wrist= "+rightWristY);
    }
}