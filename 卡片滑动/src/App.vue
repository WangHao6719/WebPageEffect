<template>
  <div id="app">
    <div class="container">
      <header class="header">
        <h1 class="logo">
          Movies
          <div class="period"></div>
        </h1>
        <div class="avatar">
          <img src="https://picsum.photos/200" />
        </div>
      </header>
      <div class="stack">
        <VueCardStack :cards="cards" :cardWidth="286" :cardHeight="458" stackWidth="100%" @move="onMove"
          @update="onUpdate">
          <template v-slot:card="{ card }">
            <div class="card">
              <img onmousedown="event.preventDefault()" draggable="false" :src="card.cover" :style="{
                ...getStyles(card),
                transition: card.isDragging ? 'none' : 'all 0.2s'
              }" />
            </div>
          </template>
        </VueCardStack>
      </div>
      <footer class="footer">
        <div class="info" v-for="(card, index) in cards" :key="index" :style="getInfoStyles[index]">
          <h2 class="title">{{ card.title }}</h2>
          <h3 class="date">
            Coming in
            <span>{{ card.release }}</span>
          </h3>
        </div>
        <div class="rating">
          <div v-for="x in 5" :key="x" class="star" v-bind:class="{ active: x <= activeCard.rating }" />
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
import VueCardStack from "./components/VueCardStack.js";
import image1 from './assets/the-martian.jpg'
import image2 from './assets/blade-runner.jpg'
import image3 from './assets/justice-league.jpg'
import image4 from './assets/ex-machina.jpg'
import image5 from './assets/alien.jpg'
import image6 from './assets/interstellar.jpg'
export default {
  components: {
    VueCardStack
  },
  computed: {
    getInfoStyles() {
      const SPEED = 0.25;

      if (this.stack.length) {
        const styles = this.cards.map((card, index) => {
          const cardInStack = this.stack.find((x) => x.id === card.id);
          const cardIndexInStack = this.stack.findIndex(
            (x) => x.id === card.id
          );

          const yPosFactor = this.convertRange(
            cardInStack.xPos,
            [0, 69],
            [1, 0]
          );

          if (this.direction === "left") {
            const o = (i) => {
              if (this.isDragging) {
                if (i === 0) {
                  return this.convertRange(cardInStack.xPos, [380, 69], [0, 1]);
                } else if (i === 1) {
                  return this.convertRange(cardInStack.xPos, [69, 65], [1, 0]);
                } else {
                  return 0;
                }
              } else {
                return i === 1 ? 1 : 0;
              }
            };

            return {
              transform: `translate(0, ${cardIndexInStack === 0
                ? 5 * yPosFactor
                : (cardIndexInStack + 1) * (100 * yPosFactor)
                }px)`,
              transition: `transform ${this.isDragging && !(cardIndexInStack > 1) ? 0 : SPEED
                }s ease 0s, opacity ${this.isDragging ? 0 : SPEED}s ease 0s`,
              opacity: o(cardIndexInStack)
            };
          } else {
            const o = (i) => {
              if (this.isDragging) {
                if (i === 1) {
                  return this.convertRange(cardInStack.xPos, [69, 200], [1, 0]);
                } else if (i === 2) {
                  return this.convertRange(cardInStack.xPos, [55, 69], [0, 1]);
                } else {
                  return 0;
                }
              } else {
                return i === 1 ? 1 : 0;
              }
            };

            return {
              transform: `translate(0, ${cardIndexInStack === 1
                ? 5 * yPosFactor
                : (cardIndexInStack - 1) * (100 * yPosFactor)
                }px)`,
              transition: `transform ${this.isDragging && !(cardIndexInStack > 2) ? 0 : SPEED
                }s ease 0s, opacity ${this.isDragging ? 0 : SPEED}s ease 0s`,
              opacity: o(cardIndexInStack)
            };
          }
        });

        return styles;
      }

      return {};
    }
  },
  methods: {
    convertRange(value, r1, r2) {
      return ((value - r1[0]) * (r2[1] - r2[0])) / (r1[1] - r1[0]) + r2[0];
    },
    getStyles(card) {
      const MIN_POS_X = 0;
      const MAX_POS_X = 69;
      const MIN_SCALE_FACTOR = 1;
      const MAX_SCALE_FACTOR = 2.5;

      const opacity = this.convertRange(
        card.xPos > 0 ? card.xPos : 0,
        [MIN_POS_X, MAX_POS_X],
        [0, 1]
      );

      const scale = this.convertRange(
        card.xPos > 0 ? card.xPos : 0,
        [MIN_POS_X, MAX_POS_X],
        [MAX_SCALE_FACTOR, 1]
      );

      const normalizedScale =
        scale >= MIN_SCALE_FACTOR
          ? scale <= MAX_SCALE_FACTOR
            ? scale
            : MAX_SCALE_FACTOR
          : MIN_SCALE_FACTOR;

      const normalizedOpacity = opacity >= 0 ? (opacity <= 1 ? opacity : 1) : 0;

      return {
        transform: `scale(${card.$index !== 0 ? normalizedScale : 1}, ${card.$index !== 0 ? normalizedScale : MIN_SCALE_FACTOR
          })`,
        opacity: `${card.$index !== 0 ? normalizedOpacity : 1}`
      };
    },
    onUpdate({ active }) {
      this.activeCard = active;
    },
    onMove({ stack, direction, isDragging }) {
      this.stack = stack;
      this.direction = direction;
      this.isDragging = isDragging;
    }
  },
  data() {
    return {
      stack: [],
      isDragging: false,
      activeCard: {
        rating: 0
      },
      cards: [
        {
          id: 1,
          title: "The Martian",
          release: "10.2.18",
          cover: image1,
          rating: 3,
        },
        {
          id: 2,
          title: "Blade Runner 2049",
          release: "10.6.17",
          cover: image2,
          rating: 5,
        },
        {
          id: 3,
          title: "Justice League",
          release: "10.6.17",
          cover: image3,
          rating: 1,
        },
        {
          id: 4,
          title: "Ex Machina",
          release: "10.6.17",
          cover: image4,
          rating: 4,
        },
        {
          id: 5,
          title: "Alien",
          release: "10.6.17",
          cover: image5,
          rating: 3,
        },
        {
          id: 6,
          title: "Interstellar",
          release: "10.6.17",
          cover: image6,
          rating: 5,
        }
      ]
    };
  }
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}

body {
  font-family: serif;
  background: linear-gradient(to right, #fbc7d4, #9796f0);
}

#app {
  color: #1c1c1c;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  grid-gap: 60px;
}

.container {
  z-index: 2;
  position: relative;
  background: #fff;
  width: 375px;
  height: 667px;
  overflow: hidden;
  box-shadow: 0 70px 63px -60px;
  display: flex;
  flex-direction: column;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px;

  .logo {
    align-items: baseline;
    display: flex;
    font-size: 29px;
  }

  .period {
    width: 5px;
    height: 5px;
    margin-left: 4px;
    background: #ff3366;
  }

  .avatar {
    width: 50px;
    height: 50px;
    border-radius: 50px;
    overflow: hidden;
  }

  .avatar>img {
    width: 100%;
    height: auto;
  }
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 24px 0;
  min-height: 37px;
  flex-direction: row-reverse;
  position: relative;
}

.rating {
  display: flex;
  justify-content: space-between;
  justify-self: flex-end;

  .star {
    background: url("./assets/star.svg");
    background-size: 100%;
    width: 15px;
    height: 15px;
    transform: scale(0.5, 0.5);
    margin: 2px;
    transition: all 0.2s ease;
    opacity: 0.5;

    &.active {
      transform: scale(1, 1);
      opacity: 1;
    }
  }
}

.info {
  position: absolute;
  left: 24px;

  .title {
    font-size: 16px;
    line-height: 22px;
  }

  .date {
    font-size: 11px;
    line-height: 15px;
    color: #9ba7c6;
  }
}

.stack {
  width: 100%;
}

.card {
  width: 100%;
  height: 100%;
  border-radius: 8px;
  overflow: hidden;
  transform: rotate(0);
  background: #fff;
  user-select: none;

  >img {
    width: 286px;
    height: 458px;
    object-fit: cover;
    user-select: none;
  }
}
</style>
