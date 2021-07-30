<template>
  <div class="doubleSnake">
    <div class="score">
      <span>Snake1🐍: {{score1}}</span>
      <span>Snake2🐍: {{score2}}</span>
    </div>
    <div class="snake-border">
    <div class="mask" v-show="isDead">
        <div class="title">
            <h2>{{message}}</h2>
            <span>
                Snake1 获得 {{score1}} 分!<br/>
                Snake2 获得 {{score2}} 分!
            </span>
        </div>
    </div>
      <div class="col" v-for="(col, i) in table" :key="i">
        <span class="row" v-for="(row, j) in table[i]" :key="j">
          <svg
            class="icon"
            aria-hidden="true"
            :style="table[i][j].type == 'food' ? { fontSize: '100px' } : ''"
          >
            <use :xlink:href="table[i][j].icon"></use>
          </svg>
        </span>
      </div>
    </div>
    <div class="button">
      <el-button round type="info" @click="start()" icon="el-icon-video-play"
        >开始</el-button
      >
      <el-button round type="info" @click="pause()" icon="el-icon-video-pause"
        >暂停</el-button
      >
      <el-button
        round
        type="info"
        @click="replay()"
        icon="el-icon-refresh-right"
        >重玩</el-button
      >
    </div>
  </div>
</template>

<script>
import IconList from "../assets/font/icon.js";
export default {
  name: "doubleSnake",
  props: {
    size: {
      type: Number,
    },
  },
  data() {
    return {
      snake1: [
        { x: 4, y: 1, icon: "#icon-caterpie", type: "head" },
        { x: 3, y: 1, icon: "#icon-maomaochongmianbao", type: "body" },
        { x: 2, y: 1, icon: "#icon-maomaochongmianbao", type: "body" },
        { x: 1, y: 1, icon: "#icon-maomaochongmianbao", type: "body" },
      ],
      snake2: [
        { x: 4, y: 30, icon: "#icon-caterpie", type: "head" },
        { x: 3, y: 30, icon: "#icon-maomaochongmianbao", type: "body" },
        { x: 2, y: 30, icon: "#icon-maomaochongmianbao", type: "body" },
        { x: 1, y: 30, icon: "#icon-maomaochongmianbao", type: "body" },
      ],
      table: [],
      food: [],
      iconNameArr: IconList.glyphs,
      direction1: 1,
      directionFlag1: 1,
      direction2: 1,
      directionFlag2: 1,
      snakeEnd: [
        { x: "", y: "", snake: "snake1" },
        { x: "", y: "", snake: "snake2" },
      ],
      timer: "",
      isDead: false,
      message:''
    };
  },
  computed: {
    score1(){ 
      return this.snake1.length - 4;
    },
    score2(){
        return this.snake2.length - 4
    }
  },
  watch: {},
  created() {
    this.initTable();
  },
  mounted() {
    this.createSnake(this.snake1);
    this.createSnake(this.snake2);
    this.createFood(2);
  },
  methods: {
    initTable() {
      for (let i = 0; i < this.size; i++) {
        let row = [];
        for (let j = 0; j < this.size; j++) {
          row.push({ X: i, y: j, icon: "", type: "" });
        }
        this.table.push(row);
      }
    },
    start() {
      this.keyborad();
      this.timer = setInterval(() => {
        this.moveSnake(this.direction1, this.snake1, "Snake1");
        this.moveSnake(this.direction2, this.snake2, "Snake2");
      }, 100);
    },
    pause() {
      clearInterval(this.timer);
    },
    replay() {
      location.reload();
    },
    createSnake(snake) {
      for (let i = 0; i < snake.length; i++) {
        this.table[snake[i].x][snake[i].y].type = snake[i].type;
        this.table[snake[i].x][snake[i].y].icon = snake[i].icon;
      }
    },
    createFood(number) {
      while (number != 0) {
        let iconName =
          this.iconNameArr[Math.floor(Math.random() * 25)].font_class;
        let iconItem = "#icon-" + iconName;
        this.food.push({
          x: Math.floor(Math.random() * 30),
          y: Math.floor(Math.random() * 30),
          icon: iconItem,
          type: "food",
        });
        for (let i = 0; i < this.food.length; i++) {
          this.table[this.food[i].x][this.food[i].y].icon = this.food[i].icon;
          this.table[this.food[i].x][this.food[i].y].type = this.food[i].type;
        }
        number--;
      }
    },
    keyborad() {
      document.onkeydown = (event) => {
        switch (event.code) {
          case "ArrowDown": {
            this.direction1 = 1;
            break;
          }
          case "ArrowUp": {
            this.direction1 = 3;
            break;
          }

          case "ArrowLeft": {
            this.direction1 = 4;
            break;
          }
          case "ArrowRight": {
            this.direction1 = 2;
            break;
          }
          case "KeyS": {
            this.direction2 = 1;
            break;
          }
          case "KeyD": {
            this.direction2 = 2;
            break;
          }
          case "KeyW": {
            this.direction2 = 3;
            break;
          }
          case "KeyA": {
            this.direction2 = 4;
            break;
          }
          default:
        }
      };
    },
    moveSnake(direction, snake, name) {
      if (name === "snake1") {
        if (Math.abs(this.directionFlag1 - direction) == 2) {
          direction = this.directionFlag1;
        } else {
          this.directionFlag1 = direction;
        }
      } else {
        if (Math.abs(this.directionFlag2 - direction) == 2) {
          direction = this.directionFlag2;
        } else {
          this.directionFlag2 = direction;
        }
      }
      let len = snake.length;
      if (name === "Snake1") {
        this.snakeEnd[0].x = snake[len - 1].x;
        this.snakeEnd[0].y = snake[len - 1].y;
      } else if (name === "Snake2") {
        this.snakeEnd[1].x = snake[len - 1].x;
        this.snakeEnd[1].y = snake[len - 1].y;
      }
      this.table[snake[len - 1].x][snake[len - 1].y].icon = "";
      this.table[snake[len - 1].x][snake[len - 1].y].type = "";
      for (let i = len - 1; i > 0; i--) {
        snake[i].x = snake[i - 1].x;
        snake[i].y = snake[i - 1].y;
        this.table[snake[i].x][snake[i].y].icon = snake[i].icon;
        this.table[snake[i].x][snake[i].y].type = snake[i].type;
      }
      switch (direction) {
        case 1: {
          snake[0].x += 1;
          break;
        }
        case 2: {
          snake[0].y += 1;
          break;
        }
        case 3: {
          snake[0].x -= 1;

          break;
        }
        case 4: {
          snake[0].y -= 1;
          break;
        }
      }
      this.snakeDie(snake,name);
      if (this.isDead != true) {
        this.table[snake[0].x][snake[0].y].icon = snake[0].icon;
      }
      this.eatFood(snake, name);
    },
    eatFood(snake, name) {
      for (let i = 0; i < this.food.length; i++) {
        if (snake[0].x == this.food[i].x && snake[0].y == this.food[i].y) {
          if (name === "Snake1") {
            snake.push({
              x: this.snakeEnd[0].x,
              y: this.snakeEnd[0].y,
              icon: "#icon-maomaochongmianbao",
              type: "body",
            });
          } else {
            snake.push({
              x: this.snakeEnd[1].x,
              y: this.snakeEnd[1].y,
              icon: "#icon-maomaochongmianbao",
              type: "body",
            });
          }
          this.food.splice(i, 1);
          if(name === 'Snake1'){
              this.table[this.snakeEnd[0].x][this.snakeEnd[0].y].icon = "#icon-maomaochongmianbao";
              this.table[this.snakeEnd[0].x][this.snakeEnd[0].y].icon = "body";
          }else{
              this.table[this.snakeEnd[1].x][this.snakeEnd[1].y].icon = "#icon-maomaochongmianbao";
              this.table[this.snakeEnd[1].x][this.snakeEnd[1].y].icon = "body";
          }
          this.createFood(1);
        }
      }
    },
    snakeDie(snake,name) {
      if (
        snake[0].x < 0 ||
        snake[0].x >= this.size ||
        snake[0].y < 0 ||
        snake[0].y >= this.size
      ) {
        this.isDead = true;
        this.message = name+' Died!'
        clearInterval(this.timer);
        return;
      }
      for (let i = 1; i < snake.length; i++) {
        if (snake[0].x === snake[i].x && snake[0].y == snake[i].y) {
          this.isDead = true;
          clearInterval(this.timer);
          this.message = name+' Died!'
          return;
        }
        this.snakeBattle()
      }
    },
    snakeBattle(){
        for(let i = 1;i<this.snake2.length;i++){
            if(this.snake1[0].x==this.snake2[i].x && this.snake1[0].y==this.snake2[i].y){
                this.isDead = true;
                this.message = 'Snake2 Win'
                clearInterval(this.timer)
            }
        }
        for(let i = 1;i<this.snake1.length;i++){
            if(this.snake2[0].x==this.snake1[i].x && this.snake2[0].y==this.snake1[i].y){
                this.isDead = true;
                this.message = 'Snake1 Win'
                clearInterval(this.timer)
            }
        }
    }
  },
};
</script>
<style scoped>
.row {
  flex: 1;
}
.col {
  display: flex;
  height: 100%;
  height: 15px;
}
.snake-border {
  position: relative;
  margin: 5px auto;
  width: 900px;
  border: solid 1px #333;
}
.mask{
    position:absolute;
    display: flex;
    top: 0;
    left: 0;
    z-index: 99;
    background-color:rgba(0, 0,0,.7);
    height: 100%;
    width: 100%;
    text-align: center;
    font-size: 30px;
    color: #F56C6C;
}
title {
    justify-content: center;
    align-items: center;
    margin: auto;
}
</style>