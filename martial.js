//-------------------------------------MARTIAL---------------------------------
let c = document.getElementById("martialCanvas");
let ctx = c.getContext("2d");

var background = new Image();
background.src = "./images/background.jpg";
background.onload = function(){
    ctx.drawImage(background,0,0);   
}

let loadImage = (src, callback) => {
    let img = document.createElement("img");
    img.onload = () => callback(img);
    img.src = src;
};

let imagePath = (framenumber, animation) => {
    return "/images/"+animation+"/"+framenumber+".png";
};

let frames = {
    idle: [1, 2, 3, 4, 5, 6, 7, 8],
    kick: [1, 2, 3, 4, 5, 6, 7],
    punch: [1, 2, 3, 4, 5, 6, 7],
    forward: [1, 2, 3, 4, 5, 6],
    block: [1, 2, 3, 4, 5, 6, 7, 8, 9]
};

let loadImages = (callback) => {
    let images={idle: [], kick: [], punch: [], forward: [], block: [] };
    let imagesToLoad = 0;

    ["idle", "kick", "punch", "forward", "block"].forEach((animation) => {
        let animationFrames = frames[animation];
        imagesToLoad += animationFrames.length;

        animationFrames.forEach((framenumber) => {
            let path = imagePath(framenumber, animation);

            loadImage(path, (image) => {
                images[animation][framenumber - 1] = image;
                imagesToLoad = imagesToLoad - 1;
    
                if (imagesToLoad === 0){
                    callback(images);
                }
            });
        });
      
    });
};

let animate = (ctx, images, animation, callback) => {
    images[animation].forEach((image, index) => {
        setTimeout(() => {
            ctx.clearRect(0,0,500,500);
            ctx.drawImage(background,0,0, 500, 500);            
            ctx.drawImage(image, 0, 0, 500, 500);
        }, index * 100);
    });
    setTimeout(callback, images[animation].length * 100);
};

loadImages((images) => {
    let queuedAnimations = [];

    let aux = () => {
        let selectedAnimation;
        if(queuedAnimations.length == 0){
            selectedAnimation = "idle";
        } else {
            selectedAnimation = queuedAnimations.shift();
        }
        animate(ctx, images, selectedAnimation, aux);
    }

    aux();

    document.getElementById("kick").onclick = () => {
        queuedAnimations.push("kick");
    };
    document.getElementById("punch").onclick = () => {
        queuedAnimations.push("punch");
    };
    document.getElementById("forward").onclick = () => {
        queuedAnimations.push("forward");
    };
    document.getElementById("block").onclick = () => {
        queuedAnimations.push("block");
    };

    document.addEventListener("keydown",(event) => {
        const key = event.key;
        if(key === "ArrowUp"){
            queuedAnimations.push("kick");
        }
        else if(key === "ArrowDown"){
            queuedAnimations.push("punch");
        } 
        else if(key === "ArrowLeft"){
            queuedAnimations.push("block");
        }
        else if(key === "ArrowRight"){
            queuedAnimations.push("forward");
        }
    });
});