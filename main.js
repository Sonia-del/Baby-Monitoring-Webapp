img = "";
status1 = "";
objects = [];
len = 0;
flag = 0;

function preload()
{
    alert_sound = loadSound('alarm_alarm_alarm.mp3');
}

function setup()
{
   canvas = createCanvas(380, 380);
   canvas.center();
   video = createCapture(VIDEO);
   video.size(380, 380);
   video.hide();
   objectDetector = ml5.objectDetector('cocossd', modelLoaded);
   document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function modelLoaded()
{
    console.log("Model Loaded!");
    status1 = true;
    
}

function gotResult(error, results)
{
    if (error)
    {
        console.log(error);
    }
    console.log(results);
    objects = results;
    len = results.length;
    console.log(len);
}


function draw()
{
    image(video, 0, 0, 380, 380);

    if(status1 != "")
{
    r = random(255);
    g = random(255);
    b = random (255);
    objectDetector.detect(video , gotResult);
    for (i = 0; i < len; i++)
    {
        console.log("Entered the for loop");
        document.getElementById("status").innerHTML = "Status : Baby Detected";

        fill(r, g, b);
        percent = floor(objects[i].confidence = 100);
        text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
        noFill();
        stroke(r, g, b);
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

        if (objects[i].label == "person")
        {
            document.getElementById("status").innerHTML = "Status : Baby Detected";
            alert_sound.stop();
        }

        else
    {
        document.getElementById("status").innerHTML = "Status : Baby not Detected";
        alert_sound.play();

    }
    }
    
}
}