const sphereCenterX = 0; // 词云中心点x坐标
const sphereCenterY = 0; // 词云中心点y坐标
const radiusSp = 1;
const particleRad = 10; // 圆点半径
const rgbString = 'rgba(70, 255, 140, ';
let timer; // 计时器
let count = 0; // 粒子总数
const numToAddEachFrame = 1; // 每一帧添加数量
let particleList = {}; // 粒子列表
let recycleBin = {}; // 回收粒子列表
const zeroAlphaDepth = -750; // rgba中a值为0时的深度
const particleAlpha = 1; // 最大rgba中a值
let fLen = 1199; // 观察者到z = 0的距离
let zMax = fLen - 2;
let m;
let turnAngle = 0; // 旋转角度
const turnSpeed = 2 * Math.PI / 2600; // 词云旋转速度（1600毫秒旋转一圈）

let randAccelX, randAccelY, randAccelZ;
const gravity = 0; // -1 向上、0 四周、1向下
let particle;
let outsideFlag; // 飞出标识
let nextParticle;
let sinAngle;
let cosAngle;
let depthAlphaFactor;
let i;
let theta, phi;
let x0, y0, z0;

export function wordCloud(canvas, data, coClick, img) {
    const ctx = canvas.getContext('2d');
    
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const centerX = canvasWidth / 2;
    const centerY = canvasHeight / 2;
    const sphereRad = centerX; // 词云半径
    const sphereCenterZ = -3 - sphereRad; // 词云中心点z坐标    
    let  holdData = null
    const eventPostion = {
        x: null,
        y: null
    }
    // 粒子消失因子
    randAccelX = 0.1;
    randAccelY = 0.1;
    randAccelZ = 0.1;
    // requestAnimationFrame
    onTimer()
    // 控制速度
    // timer = setInterval(onTimer, 1000);
    EventInit()
    async function onTimer() {
        count++;
        if (count >= 1) {
            count = 0;
            for (i = 0; i < numToAddEachFrame; i++) {
                // 设置粒子的位置及速度分量，粒子从球心向外飞出
                theta = Math.random() * 2 * Math.PI;
                phi = Math.acos(Math.random() * 2 - 1);
                x0 = sphereRad * Math.sin(phi) * Math.cos(theta);
                y0 = sphereRad * Math.sin(phi) * Math.sin(theta);
                z0 = sphereRad * Math.cos(phi);
                let p = addParticle(x0, sphereCenterY + y0, sphereCenterZ + z0, 0.002 * x0, 0.002 * y0, 0.002 * z0);
                // 粒子控制
                p.attack = 50;
                p.hold = 50;
                p.decay = 100;
                p.initValue = 0;
                p.holdValue = particleAlpha;
                p.lastValue = 0;
                // 消失
                p.stuckTime = 90 + Math.random() * 20;

                p.accelX = 0;
                p.accelY = gravity;
                p.accelZ = 0;
            }
        }

        // 更新可视角度
        turnAngle = (turnAngle + turnSpeed) % (2 * Math.PI);
        sinAngle = Math.sin(turnAngle);
        cosAngle = Math.cos(turnAngle);
        ctx.clearRect(0,0,canvasWidth,canvasHeight);
        // 准备绘制
        ctx.fillStyle = 'rgba(0,0,0,0)';
  

        ctx.fillRect(0, 0, canvasWidth, canvasHeight);

        // 更新或向粒子列表中添加数据
        particle = particleList.first;
        while (particle !== null) {
            // 在更新之前先记录一下
            nextParticle = particle.next;

            /*
             * 计算显示坐标
             * 计算旋转坐标
             * x和z（但y坐标不会改变）
             * 生成新坐标（rotX，y，rotZ），并将它们投影到2D视图平面上。
             */
            let rotX = cosAngle * particle.x + sinAngle * (particle.z - sphereCenterZ);
            let rotZ = -sinAngle * particle.x + cosAngle * (particle.z - sphereCenterZ) + sphereCenterZ;
            if (particle.onHover) {
                particle.alpha++

            } else {
                particle.age++;
                // 标签开始移动
                if (particle.age > particle.stuckTime) {
                    particle.velX += particle.accelX + randAccelX * (Math.random() * 2 - 1);
                    particle.velY += particle.accelY + randAccelY * (Math.random() * 2 - 1);
                    particle.velZ += particle.accelZ + randAccelZ * (Math.random() * 2 - 1);

                    particle.x += particle.velX;
                    particle.y += particle.velY;
                    particle.z += particle.velZ;
                }
                m = radiusSp * fLen / (fLen - rotZ);
                particle.projX = rotX * m + centerX;
                particle.projY = particle.y * m + centerY;
            }

            // 更新a值
            if (particle.age < particle.attack + particle.hold + particle.decay) {
                if (particle.age < particle.attack) {
                    particle.alpha = (particle.holdValue - particle.initValue) / particle.attack * particle.age + particle.initValue;
                } else if (particle.age < particle.attack + particle.hold) {
                    particle.alpha = particle.holdValue;
                } else if (particle.age < particle.attack + particle.hold + particle.decay) {
                    particle.alpha = (particle.lastValue - particle.holdValue) / particle.decay * (particle.age - particle.attack - particle.hold) + particle.holdValue;
                }
            } else {
                particle.dead = true;
            }

            // 粒子在可视范围内
            if ((particle.projX > canvasWidth) || (particle.projX < 0) || (particle.projY < 0) || (particle.projY > canvasHeight) || (rotZ > zMax)) {
                outsideFlag = true;
            } else {
                outsideFlag = false;
            }

            if (outsideFlag || particle.dead) {
                recycle(particle); // 回收粒子
            } else {
                // 消失
                depthAlphaFactor = (1 - rotZ / zeroAlphaDepth);
                depthAlphaFactor = (depthAlphaFactor > 1) ? 1 : ((depthAlphaFactor < 0) ? 0 : depthAlphaFactor);
                if (particle.onHover) {
                    ctx.font = '20px 微软雅黑';
                    ctx.fillStyle = rgbString + 1+ ')';
                } else {
                    ctx.font = '14px 微软雅黑';
                    ctx.fillStyle = rgbString + depthAlphaFactor * particle.alpha + ')';
                }
              
                // 获取文本
                const metrics = ctx.measureText(particle.flake);
                const textHeight = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
                ctx.fillText(particle.flake, particle.projX, particle.projY);
                // ctx.beginPath()
                // ctx.rect(particle.projX, particle.projY - textHeight, metrics.width, textHeight)
                // ctx.stroke()
                // ctx.strokeStyle = '#00f';
                // ctx.closePath()
                if (
                    isHover()&&
                    holdData === null
                ) {
                    particle.onHover = true
                    holdData = particle.flake
                } else if (particle.onHover && !isHover()) {
                    particle.onHover = false
                    holdData=null
                 }else {
                 }

                function isHover() {
                    return  particle.projX < eventPostion.x &&
                    eventPostion.x < particle.projX + metrics.width &&
                    particle.projY - textHeight < eventPostion.y &&
                    eventPostion.y < particle.projY 
                }
            }

            particle = nextParticle;
        }

        timer = window.requestAnimationFrame(onTimer);

    }

    function addParticle(x0, y0, z0, vx0, vy0, vz0) {
        let newParticle;
        let color;
        // 检查粒子回收
        if (recycleBin.first != null) {
            newParticle = recycleBin.first;
            // 回收粒子
            if (newParticle.next != null) {
                recycleBin.first = newParticle.next;
                newParticle.next.prev = null;
            } else {
                recycleBin.first = null;
            }
        } else {
            // 回收站为空时创建新的粒子
            newParticle = {};
        }

        if (particleList.first == null) {
            particleList.first = newParticle;
            newParticle.prev = null;
            newParticle.next = null;
        } else {
            // 插入到了数组的第一个
            newParticle.next = particleList.first;
            particleList.first.prev = newParticle;
            particleList.first = newParticle;
            newParticle.prev = null;
        }

        // 初始化
        newParticle.x = x0;
        newParticle.y = y0;
        newParticle.z = z0;
        newParticle.velX = vx0;
        newParticle.velY = vy0;
        newParticle.velZ = vz0;
        newParticle.age = 0;
        newParticle.dead = false;

        newParticle.flake = data[Math.floor(Math.random() * data.length)];
        if (Math.random() < 0.5) {
            newParticle.right = true;
        } else {
            newParticle.right = false;
        }
        return newParticle;
    }
    // 回收
    function recycle(p) {
        if (particleList.first === p) {
            if (p.next !== null) {
                p.next.prev = null;
                particleList.first = p.next;
            } else {
                particleList.first = null;
            }
        } else {
            if (p.next == null) {
                p.prev.next = null;
            } else {
                p.prev.next = p.next;
                p.next.prev = p.prev;
            }
        }

        if (recycleBin.first == null) {
            recycleBin.first = p;
            p.prev = null;
            p.next = null;
        } else {
            p.next = recycleBin.first;
            recycleBin.first.prev = p;
            recycleBin.first = p;
            p.prev = null;
        }
    }

    function EventInit() {
        canvas.addEventListener('mousemove', (event) => {
            eventPostion.x = event.offsetX
            eventPostion.y = event.offsetY
        })
        canvas.addEventListener('mouseout', (event) => {
            eventPostion.x = null
            eventPostion.y = null
        })

        canvas.addEventListener('click', (event) => {
            if (holdData) {
                coClick(holdData)
            }
 
        })
    }
}
