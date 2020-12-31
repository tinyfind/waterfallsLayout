// 自适应布局，设置宽度和高度即可，原子组件宽高确定，
// martixline-------控制宽度可容纳多少个原子组件
// martixrow------同上(高度)

// 父与子与边距的关系
// 1*1 = side+1*1+side
// 2*2 = side+1*1 + side + 1*1+side
// 3*3 = side+ 1*1 + side +1*1+ side +1*1+side
// 2*1 = side+ 1*1 + side + 1*1+side  height = side+1*1+side

let side = 8;
let originwidth = 120 // = side+1*1+side

// 建立零矩阵
let martix = []
let martixline = 14;
let martixrow = 14;
// 初始化下标--即内容数组按照下标遍历
let index = 0;
// 创建空数组--容纳内容数组
for (let i = 0; i < martixrow; i++) {
    martix[i] = [];
    for (let j = 0; j < martixline; j++) {
        martix[i][j] = 0;
    }
}
// 给定一个数据--内容数组
// 1--1*1  2--2*2  1.8--2*1  3--3*3
let assest = [1, 2, 3, 1, 1, 2, 1, 2, 1, 1, 3, 3, 1, 1, 2, 1, 3, 2, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1.8, 1.8, 1, 1, 1, 1.8, 1.8, 1.8, 1.8, 1.8, 1.8, 1.8, 1, 1, 1, 1.8, 1.8, 1, 1, 1, 1]
// let assest = [1.8, 1.8, 1.8, 1.8]

// 数据处理
for (let i = 0; i < martixrow; i++) {
    for (let j = 0; j < martixline; j++) {
        let lastspace = 0;
        if (martix[i][j] == 0) {
            lastspace = 1
            if (martix[i][j] == 0 && martix[i][j + 1] == 0) {
                lastspace = 2
                if (martix[i][j] == 0 && martix[i][j + 1] == 0 && martix[i][j + 2] == 0) {
                    lastspace = 3
                }
            }
        }
        // 判断与剩余空间
        if (assest[index]) {

            // 先判断lastspece是否有空位，
            if (assest[index] > lastspace) {
                // 寻找assest数组后符合的条件，并与之交换
                for (let m = index + 1; m < assest.length; m++) {
                    // 不用担心找不到
                    if (assest[m] <= lastspace) {
                        let temp = assest[index];
                        assest[index] = assest[m]
                        assest[m] = temp
                        // 执行
                        add()
                        break;
                    }
                }

            } else {
                // 执行
                add()
            }
            // 增添块 方法
            function add() {
                let assx = assy = assest[index]
                if (assest[index] == 1.8) {
                    assx = 1
                }
                for (let k = i; k < assx + i; k++) {
                    for (let l = j; l < assy + j; l++) {
                        martix[k][l] = assest[index]
                    }
                }
                index++;
            }
        }
    }
}
// 1.数据再处理，多余重复元素设置为0
for (let i = 0; i < martix.length; i++) {
    for (let j = 0; j < martix[i].length; j++) {
        let mtargetx = mtargety = martix[i][j]
        if (martix[i][j] == 1.8) {
            mtargetx = 1
        }
        for (let k = 0; k < mtargetx; k++) {
            for (let l = 0; l < mtargety; l++) {
                if (martix[i + k][j + l]) {
                    martix[i + k][j + l] = 0;
                }
            }
        }
        martix[i][j] = mtargety
    }
}

// 创建父元素方块以及固定定位的子元素
let origindiv = '<div class="father"></div>'
let body = document.querySelector('.content')
body.insertAdjacentHTML('beforeend', origindiv)
let div = document.querySelector('.father')

// 下标初始化
// 内容数组下标归1----与选择器有关（默认从1开始）
index = 1

// 控制父元素的大小与矩阵一致
div.style.width = martixline * originwidth + side + 'px'
div.style.height = martixrow * originwidth + side + 'px'

// dom渲染
for (let i = 0; i < martix.length; i++) {
    for (let j = 0; j < martix[i].length; j++) {
        // 判断并添加块以及距离
        // 距离设置--top由行数决定，left由j决定
        // 跳跃--矩阵下一目标的选择由 上一目标 + 上一目标宽度决定
        if (martix[i][j] > 0) {
            let twidth = 0;
            let theight = 0

            if (martix[i][j] == 1) {
                div.insertAdjacentHTML('beforeend', '<div class="son1"></div>');
                twidth = theight = originwidth - side * 2
            } else if (martix[i][j] == 2) {
                div.insertAdjacentHTML('beforeend', '<div class="son2"></div>');
                twidth = theight = originwidth * 2 - side * 2

            } else if (martix[i][j] == 3) {
                div.insertAdjacentHTML('beforeend', '<div class="son3"></div>')
                twidth = theight = originwidth * 3 - side * 2

            } else if (martix[i][j] == 1.8) {
                div.insertAdjacentHTML('beforeend', '<div class="son4">UNO GAME</div>')
                twidth = originwidth * 2 - side * 2
                theight = originwidth - side * 2

            }
            let target = document.querySelector('.father div:nth-child(' + index + ')')
            index++
            target.style.width = twidth + 'px'
            target.style.height = theight + 'px'
            target.style.margin = side + 'px'
            target.style.left = j * originwidth + 'px'
            target.style.top = i * originwidth + 'px'
        }






    }
}