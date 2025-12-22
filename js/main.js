(function () {
            const snowmax = 35;
            const snowcolor = ["#AAAACC", "#DDDDFF", "#CCCCDD", "#F3F3F3", "#F0FFFF", "#FFFFFF", "#EFF5FF"];
            const snowtype = ["Arial Black", "Arial Narrow", "Times", "Comic Sans MS"];
            const snowletter = "❄"; // Символ снежинки
            const sinkspeed = 0.6;
            const snowmaxsize = 40;
            const snowminsize = 8;
            const snowingzone = 1;
            const snow = [];
            let marginbottom;
            let marginright;
            let timer;
            const x_mv = [];
            const crds = [];
            const lftrght = [];
            function randommaker(range) {
                return Math.floor(range * Math.random());
            }
            function initsnow() {
                marginbottom = window.innerHeight;
                marginright = window.innerWidth;
                const snowsizerange = snowmaxsize - snowminsize;
                for (let i = 0; i <= snowmax; i++) {
                    crds[i] = 0;
                    lftrght[i] = Math.random() * 15;
                    x_mv[i] = 0.03 + Math.random() / 10;
                    snow[i] = document.getElementById("s" + i);
                    snow[i].style.fontFamily = snowtype[randommaker(snowtype.length)];
                    snow[i].size = randommaker(snowsizerange) + snowminsize;
                    snow[i].style.fontSize = snow[i].size + "px";
                    snow[i].style.color = snowcolor[randommaker(snowcolor.length)];
                    snow[i].sink = sinkspeed * snow[i].size / 5;
                    if (snowingzone === 1) {
                        snow[i].posx = randommaker(marginright - snow[i].size);
                    } else if (snowingzone === 2) {
                        snow[i].posx = randommaker(marginright / 2 - snow[i].size);
                    } else if (snowingzone === 3) {
                        snow[i].posx = randommaker(marginright / 2 - snow[i].size) + marginright / 4;
                    } else if (snowingzone === 4) {
                        snow[i].posx = randommaker(marginright / 2 - snow[i].size) + marginright / 2;
                    }
                    snow[i].posy = randommaker(2 * marginbottom - marginbottom - 2 * snow[i].size);
                    snow[i].style.left = snow[i].posx + "px";
                    snow[i].style.top = snow[i].posy + "px";
                }
                movesnow();
            }
            function movesnow() {
                for (let i = 0; i <= snowmax; i++) {
                    crds[i] += x_mv[i];
                    snow[i].posy += snow[i].sink;
                    snow[i].style.left = snow[i].posx + lftrght[i] * Math.sin(crds[i]) + "px";
                    snow[i].style.top = snow[i].posy + "px";
                    if (snow[i].posy >= marginbottom - 2 * snow[i].size || parseInt(snow[i].style.left) > (marginright - 3 * lftrght[i])) {
                        if (snowingzone === 1) {
                            snow[i].posx = randommaker(marginright - snow[i].size);
                        } else if (snowingzone === 2) {
                            snow[i].posx = randommaker(marginright / 2 - snow[i].size);
                        } else if (snowingzone === 3) {
                            snow[i].posx = randommaker(marginright / 2 - snow[i].size) + marginright / 4;
                        } else if (snowingzone === 4) {
                            snow[i].posx = randommaker(marginright / 2 - snow[i].size) + marginright / 2;
                        }
                        snow[i].posy = 0;
                    }
                }
                timer = setTimeout(movesnow, 50);
            }
            function createSnowflakes() {
                const snowContainer = document.createElement("div");
                snowContainer.style.position = "absolute";
                snowContainer.style.top = "0";
                snowContainer.style.left = "0";
                document.body.appendChild(snowContainer);
                for (let i = 0; i <= snowmax; i++) {
                    const snowflake = document.createElement("span");
                    snowflake.id = "s" + i;
                    snowflake.style.position = "absolute";
                    snowflake.style.top = -snowmaxsize + "px";
                    snowflake.textContent = snowletter; // Используем символ снежинки
                    snowContainer.appendChild(snowflake);
                }
            }
            createSnowflakes();
            window.addEventListener("load", initsnow);
        })();

        //курсор
        (function () {
    const colour = "white";
    const sparkles = 100;
    let x = 400, ox = 400;
    let y = 300, oy = 300;
    let swide = 800, shigh = 600;
    let sleft = 0, sdown = 0;

    const tiny = [];
    const star = [];
    const starv = [];
    const starx = [];
    const stary = [];
    const tinyx = [];
    const tinyy = [];
    const tinyv = [];

    function createDiv(height, width) {
        const div = document.createElement("div");
        div.style.position = "absolute";
        div.style.height = `${height}px`;
        div.style.width = `${width}px`;
        div.style.overflow = "hidden";
        div.style.backgroundColor = colour;
        return div;
    }

    function set_width() {
        if (typeof self.innerWidth === "number") {
            swide = self.innerWidth;
            shigh = self.innerHeight;
        } else if (document.documentElement && document.documentElement.clientWidth) {
            swide = document.documentElement.clientWidth;
            shigh = document.documentElement.clientHeight;
        } else if (document.body.clientWidth) {
            swide = document.body.clientWidth;
            shigh = document.body.clientHeight;
        }
    }

    function set_scroll() {
        if (typeof self.pageYOffset === "number") {
            sdown = self.pageYOffset;
            sleft = self.pageXOffset;
        } else if (document.body.scrollTop || document.body.scrollLeft) {
            sdown = document.body.scrollTop;
            sleft = document.body.scrollLeft;
        } else if (document.documentElement && (document.documentElement.scrollTop || document.documentElement.scrollLeft)) {
            sleft = document.documentElement.scrollLeft;
            sdown = document.documentElement.scrollTop;
        } else {
            sdown = 0;
            sleft = 0;
        }
    }

    function mouse(e) {
        set_scroll();
        y = e ? e.pageY : event.y + sdown;
        x = e ? e.pageX : event.x + sleft;
    }

    function update_star(i) {
        if (--starv[i] === 25) {
            star[i].style.clip = "rect(1px, 4px, 4px, 1px)";
        }
        if (starv[i]) {
            stary[i] += 1 + Math.random() * 3;
            if (stary[i] < shigh + sdown) {
                star[i].style.top = `${stary[i]}px`;
                starx[i] += (i % 5 - 2) / 5;
                star[i].style.left = `${starx[i]}px`;
            } else {
                star[i].style.visibility = "hidden";
                starv[i] = 0;
                return;
            }
        } else {
            tinyv[i] = 50;
            tiny[i].style.top = `${tinyy[i] = stary[i]}px`;
            tiny[i].style.left = `${tinyx[i] = starx[i]}px`;
            tiny[i].style.width = "2px";
            tiny[i].style.height = "2px";
            star[i].style.visibility = "hidden";
            tiny[i].style.visibility = "visible";
        }
    }

    function update_tiny(i) {
        if (--tinyv[i] === 25) {
            tiny[i].style.width = "1px";
            tiny[i].style.height = "1px";
        }
        if (tinyv[i]) {
            tinyy[i] += 1 + Math.random() * 3;
            if (tinyy[i] < shigh + sdown) {
                tiny[i].style.top = `${tinyy[i]}px`;
                tinyx[i] += (i % 5 - 2) / 5;
                tiny[i].style.left = `${tinyx[i]}px`;
            } else {
                tiny[i].style.visibility = "hidden";
                tinyv[i] = 0;
                return;
            }
        } else {
            tiny[i].style.visibility = "hidden";
        }
    }

    function sparkle() {
        if (x !== ox || y !== oy) {
            ox = x;
            oy = y;
            for (let c = 0; c < sparkles; c++) {
                if (!starv[c]) {
                    star[c].style.left = `${starx[c] = x}px`;
                    star[c].style.top = `${stary[c] = y}px`;
                    star[c].style.clip = "rect(0px, 5px, 5px, 0px)";
                    star[c].style.visibility = "visible";
                    starv[c] = 50;
                    break;
                }
            }
        }
        for (let c = 0; c < sparkles; c++) {
            if (starv[c]) update_star(c);
            if (tinyv[c]) update_tiny(c);
        }
        requestAnimationFrame(sparkle);
    }

    function init() {
        if (document.getElementById) {
            for (let i = 0; i < sparkles; i++) {
                const tinyDiv = createDiv(3, 3);
                tinyDiv.style.visibility = "hidden";
                document.body.appendChild(tiny[i] = tinyDiv);
                starv[i] = 0;
                tinyv[i] = 0;

                const starDiv = createDiv(5, 5);
                starDiv.style.backgroundColor = "transparent";
                starDiv.style.visibility = "hidden";

                const rlef = createDiv(1, 5);
                const rdow = createDiv(5, 1);
                starDiv.appendChild(rlef);
                starDiv.appendChild(rdow);
                rlef.style.top = "3px";
                rlef.style.left = "0px";
                rdow.style.top = "0px";
                rdow.style.left = "3px";

                document.body.appendChild(star[i] = starDiv);
            }
            set_width();
            sparkle();
        }
    }

    window.addEventListener("load", init);
    document.addEventListener("mousemove", mouse);
    window.addEventListener("resize", set_width);
})();


//паралакс
