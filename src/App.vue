<script setup>
import IconArrowRight from '@/components/icons/IconArrowRight.vue';
import IconVerified from '@/components/icons/IconVerified.vue';
import IconWarning from '@/components/icons/IconWarning.vue';
import TheButton from '@/components/TheButton.vue';
import TheNotification from '@/components/TheNotification.vue';
import TheHeader from '@/components/TheHeader.vue';
import { ref } from 'vue';

const questions = ref([
  {
    title: 'Question 1 of 4: Are you a man or a woman?',
    answers: [
      { id: 'man', value: 'man' },
      { id: 'woman', value: 'woman' }
    ],
    category: 'sex'
  },
  {
    title: 'Question 2 of 4: How old are you?',
    answers: [
      { id: 'young', value: '18-29' },
      { id: 'adult', value: '30-39' },
      { id: 'middleAged', value: '40-49' },
      { id: 'old', value: '50+' }
    ],
    category: 'age'
  },
  {
    title: 'Question 3 of 4: How many members are in your family?',
    answers: [
      { id: 'alone', value: 'alone' },
      { id: 'one', value: '1' },
      { id: 'two', value: '2' },
      { id: 'many', value: '3+' }
    ],
    category: 'membersQuantity'
  },
  {
    title: "Question 4 of 4: Have you bought anything at Jack Daniel's before?",
    answers: [
      { id: 'no', value: 'no' },
      { id: 'yes', value: 'yes' }
    ],
    category: 'isClient'
  }
]);

const verifications = ref(['You answered 4 out of 4 questions', 'There are no previous polls from your IP address.', 'There are still prizes available!']);

const currentQuestionsStep = ref(0);

const currentStep = ref(0);

const formAnswers = ref([])

const verifiedIndices = ref([]);

const addAnswer = (value) => {
  formAnswers.value.push(value)
}

const isVerified = (index) => verifiedIndices.value.includes(index);

const verifyItems = async () => {
  for (const [index] of verifications.value.entries()) {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    verifiedIndices.value.push(index);
  }

  await new Promise((resolve) => setTimeout(resolve, 2000));
  currentStep.value++;
};

const moveToNextQuestion = () => {
  currentQuestionsStep.value++
  if (currentQuestionsStep.value >= questions.value.length) {
    currentStep.value++;
    verifyItems()
  }
}

const winningCase = ref();
const loosingCase = ref();

const makeWin = ref(false);

const currentTry = ref(0)

const animatedIndex = ref(null);

const chooseGift = (index) => {
  animatedIndex.value = index;

  if (winningCase.value && loosingCase.value) {
    return
  }
  if (makeWin.value) {
    winningCase.value = index;
    setTimeout(() => {
      currentStep.value++
      animatedIndex.value = null
    }, 3000)
  }
  else {
    loosingCase.value = index;
    makeWin.value = true
  }
  currentTry.value++
}

</script>


<template>
  <TheHeader />

  <main class="container mx-auto text-center px-4 pt-3.5 pb-6 overflow-x-hidden">
    <div v-if="currentStep < 2" class="flex flex-col gap-3.5">
      <template v-if="currentStep === 0">
        <section class="flex flex-col gap-4 items-center">
          <TheButton variant="outline">
            Exclusive Offer for
            You!
          </TheButton>

          <h1 class="font-semibold text-[32px] leading-[38px]">
            <span class="text-primary">Congratulations!</span> You Could Win a Limited Edition Jack
            Daniel's Sinatra Century!
          </h1>
          <div>
            <p>
              Today, 2 June, 2024, you have been chosen to participate in this
              survey.
              <strong>It will only take a minute of your time</strong> and you can
              <strong>receive a fantastic prize</strong>: Limited Edition Jack
              Daniel's Sinatra Century!
            </p>
            <picture class="mx-auto inline-block">
              <source srcset="./assets/images/JackDaniels.avif" type="image/avif">
              <source srcset="./assets/images/JackDaniels.webp" type="image/webp">
              <source srcset="./assets/images/JackDaniels.png" type="image/png">

              <img src="./assets/images/logo.png" width="358px" height="280px" alt="logo">
            </picture>
          </div>
        </section>
        <div class="text-left">
          <p>
            Every Sunday we choose 10 random users giving them the
            <strong>chance to win fabulous prizes</strong>. Today's prize is
            a Limited Edition Jack Daniel's Sinatra Century!
            <strong>
              There will be 10 lucky winners. Only for those living in the
              United States!
            </strong>
          </p>
          <br>
          <p>This survey aims to improve the service for our users.</p>
        </div>
      </template>
      <div>
        <TheNotification v-if="currentStep === 0">
          <IconWarning />
          <p class="text-black">
            Hurry up! The number of prizes is limited! </p>
        </TheNotification>

        <div class="px-4 py-6 border border-whiteTransparent">
          <form class="flex flex-col gap-4">
            <div v-if="currentQuestionsStep < questions.length" class="grid grid-flow-col gap-2">
              <div v-for="(question, index) in questions" :key="index" class="h-1 bg-whiteTransparent duration-200"
                :class="{ 'progress-step-active': index <= currentQuestionsStep }"></div>
            </div>
            <div v-for="(question, index) in questions" :key="index" class="flex flex-col gap-6"
              :class="{ hidden: index !== currentQuestionsStep }">
              <h2 class="text-2xl font-semibold leading-[120%] capitalize text-center">
                {{ question.title }}
              </h2>
              <fieldset class="flex flex-col gap-2">
                <div v-for="answer in question.answers" :key="answer.id"
                  class="relative px-2.5 py-2.5 border-2 border-primary">
                  <input @change="addAnswer(answer.value); moveToNextQuestion()" :id="answer.id" class="hidden"
                    type="radio" :name="question.category" :value="answer.value" />
                  <label :for="answer.id"
                    class="absolute top-0 left-0 w-full h-full hover:bg-primary duration-200 cursor-pointer">
                  </label>
                  <span class="relative block text-primary text-base duration-200 pointer-events-none uppercase">
                    {{ answer.value }}
                  </span>
                </div>
              </fieldset>
            </div>
          </form>

          <div v-if="currentStep === 1" class="flex flex-col gap-6 text-left">
            <div class="flex flex-col gap-4">
              <h2 class="text-2xl font-semibold leading-[120%] capitalize">
                We are checking your answers...
              </h2>
              <div class="bg-whiteTransparent h-1">
                <div class="progress"></div>
              </div>
            </div>
            <ul class="flex flex-col gap-2">
              <li v-for="(text, index) in verifications" :key="index"
                class="flex items-center gap-2 font-semibold capitalize">
                <IconVerified :class="[isVerified(index) ? 'fill-[#438b29]' : 'fill-gray-600']" />
                {{ text }}
              </li>
            </ul>
          </div>
        </div>

        <div class="grid grid-cols-3 px-[11px] py-4">
          <a href="#"
            class="px-2.5 font-semibold text-xs capitalize tracking-[.4px] text-primary border-r border-whiteSemiTransparent hover:text-white">Exclusive
            Prizes</a>
          <a href="#"
            class="px-2.5 font-semibold text-xs capitalize tracking-[.4px] text-primary border-r border-whiteSemiTransparent hover:text-white">Quick
            and Easy</a>
          <a href="#" class="px-2.5 font-semibold text-xs capitalize tracking-[.4px] text-primary hover:text-white">Only
            6 left</a>
        </div>
      </div>
    </div>
    <div v-if="currentStep === 2" class="relative flex flex-col gap-6 py-6 px-4 max-w-[358px] mx-auto game">
      <div class="flex justify-center gap-2">
        <div
          class="bg-whiteTransparent border-2 border-transparent min-w-[103px] px-3 py-2 font-semibold text-xs text-center capitalize"
          :class="{ 'try-active': currentTry === 0 }">
          1st Try
        </div>
        <div
          class="bg-whiteTransparent border-2 border-transparent min-w-[103px] px-3 py-2 font-semibold text-xs text-center capitalize"
          :class="{ 'try-active': currentTry === 1 }">
          2nd Try
        </div>
        <div
          class="bg-whiteTransparent border-2 border-transparent min-w-[103px] px-3 py-2 font-semibold text-xs text-center capitalize"
          :class="{ 'try-active': currentTry === 2 }">
          3rd Try
        </div>
      </div>
      <div class="grid grid-cols-3">
        <button v-for="index in 9" :key="index" class="cursor-pointer relative pb-[100%] gamebox"
          :class="{ 'loose': index === loosingCase, 'win': index === winningCase }" @click.once="chooseGift(index)">
          <img :class="{ 'animate-top': index === animatedIndex }"
            class="absolute left-[21px] bottom-[53px] z-10 top-img" src="./assets/images/top.png" alt="">
          <img class="absolute left-0 bottom-10 " src="./assets/images/light.png" alt="">
          <img v-show="index === winningCase" :class="{ 'animate-backpack': index === animatedIndex }"
            class="absolute left-1 bottom-5 gift-img" src="./assets/images/backpack.png" alt="">
          <img class="absolute left-5 bottom-4 " src="./assets/images/box.png" alt="">
        </button>
      </div>
    </div>
    <div v-if="currentStep === 3" class="flex flex-col items-center gap-6 text-left px-2">
      <picture class="mx-auto inline-block">
        <source srcset="./assets/images/JackDaniels-sm.avif" type="image/avif">
        <source srcset="./assets/images/JackDaniels-sm.webp" type="image/webp">
        <source srcset="./assets/images/JackDaniels-sm.png" type="image/png">

        <img src="./assets/images/JackDaniels-sm.png" width="258px" height="185px" alt="JackDaniel's">
      </picture>

      <div class="flex flex-col gap-2.5 w-full">
        <h2 class="font-semibold text-[32px] leading-[120%] capitalize">
          You did it!
        </h2>
        <p class="text-base">You won the Limited Edition Jack
          Daniel's Sinatra Century!</p>
      </div>
      <div class="flex flex-col gap-2.5 w-full">
        <h3 class="font-semibold text-2xl leading-[120%] capitalize">How to get prize?</h3>
        <ol class="flex flex-col gap-2.5 capitalize text-whiteDarkTransparent">
          <li>1. You will be directed to the website of our certified distributors.</li>
          <li>2. Enter your address to get your Limited Edition Jack Daniel's Sinatra Century.</li>
          <li>3. The Limited Edition Jack Daniel's Sinatra Century will be delivered within 5-7 days</li>
        </ol>
      </div>

      <TheButton variant="solid">
        <span>Apply now</span>
        <IconArrowRight />
      </TheButton>
    </div>
  </main>
</template>

<style>
.-active {
  @apply flex;
}

.progress-step-active {
  @apply bg-primary;
}

input:checked+label {
  @apply bg-primary text-black;
}

input:checked~span {
  @apply text-black;
}

label:hover+span {
  @apply text-black;
}

.verified {
  @apply fill-[#438B29]
}

.try-active {
  @apply text-primary border-primary bg-transparent
}

.progress {
  @apply bg-primary h-full;
  animation: progress 8s linear;
}

@keyframes progress {
  0% {
    @apply w-0
  }

  100% {
    @apply w-full
  }
}

.game {
  animation: game 3s linear;
}

@keyframes game {
  0% {
    transform: translateX(100vw);
  }

  100% {
    transform: translateX(0);
  }
}

.gamebox {
  animation-name: shake;
  animation-duration: .5s;
  animation-delay: 3s;
}

@keyframes shake {
  0% {
    transform: translate(1px, 1px) rotate(0deg);
  }

  10% {
    transform: translate(-1px, -2px) rotate(-1deg);
  }

  20% {
    transform: translate(-3px, 0px) rotate(1deg);
  }

  30% {
    transform: translate(3px, 2px) rotate(0deg);
  }

  40% {
    transform: translate(1px, -1px) rotate(1deg);
  }

  50% {
    transform: translate(-1px, 2px) rotate(-1deg);
  }

  60% {
    transform: translate(-3px, 1px) rotate(0deg);
  }

  70% {
    transform: translate(3px, 1px) rotate(-1deg);
  }

  80% {
    transform: translate(-1px, -1px) rotate(1deg);
  }

  90% {
    transform: translate(1px, 2px) rotate(0deg);
  }

  100% {
    transform: translate(1px, -2px) rotate(-1deg);
  }

}

.loose .animate-top {
  animation: bounceTop 1s ease-out forwards;
}

.win .animate-top {
  animation: fadeOut 1s ease-out forwards;
}

.animate-backpack {
  animation: fadeIn 1s ease-out 1s forwards;
}


@keyframes bounceTop {
  to {
    transform: translate(-12px, -13px) rotate(-19deg);
  }
}

@keyframes fadeOut {
  to {
    transform: translate(-50px, -50px) rotate(-45deg);
    opacity: 0;
  }
}

@keyframes fadeIn {
  to {
    transform: translateY(-20px);
  }
}
</style>
