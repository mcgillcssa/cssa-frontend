<template>
  <div v-if="isModalVisible" class="modal-overlay" @click.self="emitHideModal">
    <div class="modal">
      <div class="modal-top-container">
        <div class="merchant-name">
          {{ benefit.merchantName }} <br />
          {{ benefit.merchantAlternativeName }}
        </div>
        <ImageCarousel :images="benefit.merchantImagesUrl"> </ImageCarousel>
      </div>
      <ul class="info-list">
        <li>
          <local
            theme="filled"
            :size="iconSize"
            fill="#3F83CE"
            strokeLinejoin="miter"
            strokeLinecap="square"
          />
          <span class="list-content">{{ benefit.merchantAddress }}</span>
        </li>
        <li>
          <phone-call
            theme="filled"
            :size="iconSize"
            fill="#3F83CE"
            :strokeWidth="3"
            strokeLinejoin="miter"
            strokeLinecap="square"
          />
          <span class="list-content">{{ benefit.merchantPhone }}</span>
        </li>
        <li>
          <alarm-clock
            theme="filled"
            :size="iconSize"
            fill="#3F83CE"
            :strokeWidth="3"
            strokeLinejoin="miter"
            strokeLinecap="square"
          />
          <span class="list-content">{{ benefit.merchantOpeningHours }}</span>
        </li>
        <li>
          <coupon
            theme="filled"
            :size="iconSize"
            fill="#3F83CE"
            :strokeWidth="3"
            strokeLinejoin="miter"
            strokeLinecap="square"
          />
          <span class="list-content">{{ benefit.merchantDiscount }}</span>
        </li>
        <li>
          <buy
            theme="filled"
            :size="iconSize"
            fill="#3F83CE"
            :strokeWidth="3"
            strokeLinejoin="miter"
            strokeLinecap="square"
          />
          <span class="list-content">{{ benefit.merchantPaymentMethods }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import ImageCarousel from './ImageCarousel.vue'
import { Local, PhoneCall, AlarmClock, Coupon, Buy } from '@icon-park/vue-next'

export default {
  components: {
    ImageCarousel,
    Local,
    PhoneCall,
    AlarmClock,
    Coupon,
    Buy
  },
  props: {
    isModalVisible: { type: Boolean, required: true },
    benefit: { type: Object }
  },
  data() {
    return {
      iconSize: '36'
    }
  },
  created() {
    window.addEventListener('resize', this.updateIconSize)
  },
  mounted() {
    this.updateIconSize()
  },
  methods: {
    updateIconSize() {
      if (window.innerWidth <= 600) {
        this.iconSize = '24'
      } else {
        this.iconSize = '36'
      }
    },
    emitHideModal() {
      this.$emit('hide-modal')
    }
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.modal {
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  height: auto;
  width: 500px;
  padding-top: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  font-size: 16px;
  max-height: 90vh;
  overflow-y: auto;
  margin: 5% auto;
  flex-shrink: 0;
}

.modal::-webkit-scrollbar {
  width: 8px;
}

.modal::-webkit-scrollbar-thumb {
  background-color: rgba(63, 131, 206, 1);
  border-radius: 100px;
}

.modal::-webkit-scrollbar-track {
  background: transparent;
}

.modal {
  scrollbar-width: thin;
  scrollbar-color: rgba(63, 131, 206, 1) transparent;
}

.modal-top-container {
  margin: auto;
  position: relative;
  font-size: 1em;
  background-color: #3F83CE;
  width: 100%;
}

.merchant-name {
  text-align: center;
  font-size: 1.5em;
  font-family: 'Montserrat', sans-serif;
  font-weight: bold;
  color: #ffffff;
  padding: 10px;
}

.info-list {
  margin: auto;
  margin-top: 20px;
  margin-bottom: 20px;
  width: calc(100% - 40px);
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 15px;
  font-size: 1em;
}

.info-list li {
  display: flex;
  align-items: center;
  padding: 0;
  position: relative;
  gap: 20px;
}

.list-content {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #E3F4FF;
  flex-grow: 1;
  padding: 10px 20px;
  font-family: 'Open Sans', sans-serif;
  font-weight: 450;
  color: #3F83CE;
  border-radius: 5px;
  transform: scale(1, 0.95);
}

@media screen and (max-width: 600px) {
  body {
    font-size: 16px;
  }

  .modal {
    padding-top: 10px;
    width: 300px;
    font-size: 12px;
  }

  .merchant-name {
    padding: 5px;
  }

  .info-list {
    margin-top: 10px;
    width: calc(100% - 20px);
    gap: 10px;
  }

  .info-list li {
    gap: 10px;
  }
}
</style>
