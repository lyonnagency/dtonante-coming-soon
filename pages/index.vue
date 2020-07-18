<template>
  <div
    class="d-flex align-items-center justify-content-center full-h flex-wrap"
  >
    <div class="humo"></div>
    <div
      class="col-lg-5 col-12 d-flex align-items-center flex-wrap justify-content-center mb-5 pb-5"
    >
      <div class="col-12 d-flex justify-content-center mb-4 mt-0 pb-lg-5">
        <img width="175" src="~/assets/img/svg/dtonante-logo.svg" alt="" />
      </div>
      <div class="col-12 text-center my-4 text-white">
        <h1 class="fw-700 mb-4 ff-aristoletica fs-30 color-blue">
          <span class="color-orange">¡</span> Estamos en el despegue
          <span class="color-orange">!</span>
        </h1>
        <p class="color-black-text ff-geomanist px-5">
          ¿Quieres hacer realidad tu proyecto, tu idea o tu investigación?.
          Escribe tu correo y te mantendremos al tanto.
        </p>
      </div>
      <div class="col-12 text-center my-4">
        <form
          @submit.prevent="sendMail"
          class="d-md-flex justify-content-center flex-wrap"
        >
          <ValidationProvider
            name="correo"
            rules="email|required"
            v-slot="{ errors }"
            ref="mailIn"
            class="d-flex flex-wrap justify-content-center w-min-content"
          >
            <input
              class="input-soon mx-2"
              type="mail"
              name="mail"
              id="mail"
              placeholder="Tu correo"
              v-model="email"
            />
            <span class="color-black-text ff-nonito fs-12 col-10 color-orange">
              {{ errors[0] }}
            </span>
          </ValidationProvider>
          <button
            type="submit"
            class="btn btn-blue-custom mx-2 mt-2 mt-lg-0 hover-btn"
          >
            {{ msgButton }}
          </button>
          <p v-show="mailStatus" class="col-12 color-black-text mt-4">
            Gracias por suscribirte, te avisaremos cuando estemos listos.
          </p>
        </form>
      </div>
    </div>
    <div class="col-12 d-flex justify-content-center mt-2 social-container">
      <div class="col-lg-3 col-8 d-flex justify-content-around social-icons">
        <a href="#">
          <img src="~/assets/img/svg/facebook.svg" width="11" alt=""
        /></a>
        <a href="#"><img src="~/assets/img/svg/mail.svg" width="22" alt=""/></a>
        <a href="#"><img src="~/assets/img/svg/wap.svg" width="22" alt=""/></a>
        <a href="#"
          ><img src="~/assets/img/svg/phone.svg" width="21" alt=""
        /></a>
      </div>
    </div>
    <div class="figure-down"></div>
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'

export default {
  components: {
    Logo
  },
  data() {
    return {
      email: '',
      msgButton: 'Notifícame',
      mailStatus: false
    }
  },
  methods: {
    async sendMail() {
      console.log(this.$refs.mailIn.validate())
      this.$refs.mailIn.validate().then(async valid => {
        console.log(valid)
        if (valid.valid) {
          let mailData = {}
          this.mailStatus = false
          mailData = { mail: this.mail }
          let formD = new FormData()
          formD.append('mail', this.email)
          this.msgButton = 'Enviando...'
          await this.$axios
            .$post('http://ottuvaq.mx/send_mail_ott.php', formD)
            .then(response => {
              console.log(response)
              if (response.code == 200) {
                this.mailStatus = true
                this.email = ''
                // this.$refs.nameIn.reset();
                this.$refs.mailIn.reset()
                // this.$refs.phoneIn.reset();
                this.msgButton = 'Notifícame'
              }
            })
        }
      })
    }
  }
}
</script>

<style lang="scss">
@font-face {
  font-family: 'Aristotelica';
  src: url('/fonts/aristoletica/AristotelicaText-Bold.otf');
}
@font-face {
  font-family: 'Geomanist';
  src: url('/fonts/geomanist/Geomanist-Regular.otf');
}
@font-face {
  font-family: 'Aristoletica-display';
  src: url('/fonts/aristoletica/Aristotelica-Display-Demibold.otf');
}
@font-face {
  font-family: 'Nunito-Black';
  src: url('/fonts/aristoletica/Nunito-Bold.ttf');
}
.w-fit {
  width: fit-content;
}
canvas {
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  // background-color: transparent;
  // opacity: 0.2;
}
.w-min-content{
  width: auto;
    @media (min-width: 570px) {
   width: auto;
  }
  @media (min-width: 768px) {
    width: min-content;
  }
}
.figure-down {
  position: absolute;
  background-image: url('~assets/img/svg/figure-down.svg');
  background-position: top;
  background-size: cover;
  background-repeat: no-repeat;
  width: 100%;
  height: 12%;
  bottom: 0%;
  z-index: 0;
  @media (min-width: 570px) {
    height: 10%;
    bottom: 0%
  }
  @media (min-width: 768px) {
    width: 100%;
    height: 12%;
    top: 88%;
  }
}

.social-container {
  position: absolute;
  bottom: 3%;
  @media (min-width: 570px) {
    bottom: 3%;
  }
  @media (min-width: 768px) {
    bottom: 5%;
  }
}
.humo {
  background-image: url('~assets/img/svg/humo.svg');
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  width: 100%;
  height: 80%;
  top: 0;
  position: absolute;
  // @media (min-width: 570px) {
  //   height: 20%;
  //   bottom: -60%;
  // }
  // @media (min-width: 768px) {
  // height: 80%;
  // top: 0;
  // }
}
$orange: #ca4f1b;

.fs-30 {
  font-size: 2.5rem;
}

.ff-aristoletica {
  font-family: 'Aristotelica';
}

.ff-aristoletica-display {
  font-family: 'Aristoletica-display';
}
.ff-geomanist {
  font-family: 'Geomanist';
}
.ff-nonito {
  font-family: 'Nunito-Black';
}

.color-blue {
  color: #001d7e;
}

.color-orange {
  color: $orange !important;
}
.color-black-text {
  color: #383838;
}

.hover-btn {
  &:hover {
    color: rgb(218, 216, 216);
  }
}
.full-h {
  height: auto;
  position: relative;
  @media (min-width: 570px) {
    height: auto;
  }
  @media (min-width: 768px) {
    height: 100vh;
  }
}
h1 {
  font-size: 1.3em;
  @media (min-width: 768px) {
    font-size: 3rem !important;
  }
}
p {
  font-size: 0, 9em;
}
.input-soon {
  border: dashed 1px $orange;
  border-radius: 30px;
  padding: 10px 30px;
  color: $orange;
  font-family: 'Nunito-Black';
  &::placeholder {
    color: $orange !important;
    opacity: 0.8;
  }
}

.btn {
  border-radius: 30px;
  border: none;
  padding: 10px 30px;
  height: fit-content;
}
.btn-blue-custom {
  background-color: $orange;
  color: white;
  font-family: 'Nunito-Black';
}
.fw-700 {
  font-weight: 700;
}

.track-400 {
  letter-spacing: 10px;
}



.social-icons {
  z-index: 1;
  img {
    opacity: 0.8;
    transition: all 0.3s linear;
    &:hover {
      opacity: 1;
    }
  }
}
</style>
