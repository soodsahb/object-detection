import { throttle } from "lodash";;

export function renderPredictions(objects,context){

    context.clearRect(0,0,context.canvas.width,context.canvas.height);

    const font='16px sans-serif';
    context.font=font;
    context.textBaseLine="top";

    objects.forEach(object => {
        const [x,y,width,height]=object["bbox"];

        const isPerson=object.class==='person';

        context.strokeStyle=isPerson?"#ff0000":"#00FFFF";
        context.lineWidth=4;
        context.strokeRect(x,y,width,height);

        context.fillStyle=`rgba(255,0,0,${isPerson?0.2:0})`;
        context.fillRect(x,y,width,height);

        context.fillStyle = isPerson ? "#FF0000" : "#00FFFF";
    const textWidth = context.measureText(object.class).width;
    const textHeight = parseInt(font, 10); // base 10
    context.fillRect(x, y, textWidth + 4, textHeight + 4);

    context.fillStyle = "#000000";
    context.fillText(object.class, x, y);


    const playAudio = throttle(() => {
        const audio = new Audio("/pols-aagyi-pols.mp3");
        audio.play();
      }, 2000);
    if (isPerson) {
        playAudio();
      }
     

    });

    

}