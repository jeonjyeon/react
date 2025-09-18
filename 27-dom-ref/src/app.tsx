import { useGSAP } from '@gsap/react'
import { useEffect, useRef, useState } from 'react'
import confetti from 'canvas-confetti'
import gsap from 'gsap'
import VanillaTilt, { HTMLVanillaTiltElement } from 'vanilla-tilt'
import { AutoFocusInput, LearnSection } from '@/components'
import ClassRef from './components/class-ref'

export default function App() {
  const [visible, setVisible] = useState(true)

  return (
    <LearnSection title="DOM 참조" style={{ flexDirection: 'column' }}>
      <ClassRef />
      <AutoFocusInput
        type="checkbox"
        label="자동 초점 이동 인풋"
        shouldFocus={true}
      />
    </LearnSection>
  )
}
// --------------------------------------------------------------------------
// gsap 라이브러리와 리액트 연동
gsap.registerPlugin(useGSAP)
function GsapDemoUseGsap() {
  const containerRef = useRef(null)

  useGSAP(
    () => {
      gsap.to('.box', { x: 360 })
      gsap.to('.box', { y: 360 })
    },
    { scope: containerRef }
  )

  return (
    <div ref={containerRef}>
      <figure className="box">박스</figure>
    </div>
  )
}

function GsapDemoRefCallback() {
  return (
    <div
      ref={(element) => {
        if (element) {
          const timeline = gsap.timeline({
            repeat: -1,
            defaults: { duration: 1.2, ease: 'power2.inOut' },
          })

          timeline
            .to(element, { x: window.innerWidth - 180 - 20 })
            .to(element, { y: window.innerHeight - 60 - 20 })
            .to(element, { x: 0 })
            .to(element, { y: 0 })
        }
      }}
    >
      <abbr title="Green Sock Animation Platform" className="text-5xl">
        GsapDemoRefCallback
      </abbr>
    </div>
  )
}

function GsapDemo() {
  const boxRef = useRef(null)

  useEffect(() => {
    const box = boxRef.current

    if (box) {
      const timeline = gsap.timeline({
        repeat: -1,
        defaults: { duration: 1.2, ease: 'power2.inOut' },
      })

      timeline
        .to(box, { x: window.innerWidth - 180 - 20 })
        .to(box, { y: window.innerHeight - 60 - 20 })
        .to(box, { x: 0 })
        .to(box, { y: 0 })

      // 클린업 (React 19+)
      return () => {
        console.log('GSAP 애니메이션 제거')
        timeline.kill()
        gsap.killTweensOf(box)
        gsap.set(box, { clearProps: 'all' })
      }
    }
  }, [])

  return (
    <div ref={boxRef}>
      <abbr title="Green Sock Animation Platform" className="text-5xl">
        GsapDemo
      </abbr>
    </div>
  )
}

// --------------------------------------------------------------------------
// vanilla-tilt 라이브러리와 리액트 연동

const TILT_OPTIONS = {
  'glare': true,
  'max-glare': 0.5,
  'scale': 1.2,
}

function VanillaTiltDemo() {
  const boxs = useState(Array(3).fill(null))

  // 1. ref 속성 + 콜백(callback) 함수 설정 방법
  const _boxRefCallback = (element: HTMLElement) => {
    console.log('바닐라 틸트 이펙트 설정')
    VanillaTilt.init(element, TILT_OPTIONS)

    // 클린업 (React 19+)
    return () => {
      console.log('바닐라 틸트 이펙트 제거')
      ;(element as HTMLVanillaTiltElement).vanillaTilt?.destroy()
    }
  }

  // 2. ref 속성 + useRef 훅 + useEffect 훅 설정 방법
  const boxsRef = useRef<HTMLElement[]>([])

  useEffect(() => {
    const boxElements = boxsRef.current

    if (boxElements.length > 0) {
      for (const element of boxElements) {
        if (element) {
          console.log('바닐라 틸트 이펙트 설정')
          VanillaTilt.init(element, TILT_OPTIONS)
        }
      }
    }

    return () => {
      if (boxElements.length > 0) {
        for (const element of boxElements) {
          console.log('바닐라 틸트 이펙트 제거')
          ;(element as HTMLVanillaTiltElement).vanillaTilt?.destroy()
        }
      }
    }
  }, [])

  return (
    <div role="group" className="text-4xl space-y-2">
      {boxs.map((_, index) => (
        <figure
          key={index}
          // ref={_boxRefCallback}
          ref={(element) => {
            if (element) boxsRef.current.push(element)
          }}
          className="size-40 bg-black text-white grid place-content-center uppercase"
        >
          box {index + 1}
        </figure>
      ))}
    </div>
  )
}

// --------------------------------------------------------------------------
// confetti 라이브러리와 리액트 연동
interface Size {
  width: number
  height: number
}

const getSize = (): Size => ({
  width: window.innerWidth,
  height: window.innerHeight,
})

function ConfettiDemo() {
  const [size, setSize] = useState<Size>(getSize)

  // 윈도우 크기 변경 시 사이즈 상태 업데이트
  useEffect(() => {
    const handleSize = () => setSize(getSize)
    window.addEventListener('resize', handleSize)
    return () => window.removeEventListener('resize', handleSize)
  }, [])

  const canvasRef = useRef<HTMLCanvasElement>(null)

  const handleConfetti = () => {
    const canvas = canvasRef.current

    if (!canvas) return

    // confetti 라이브러리에 canvas DOM 전달
    confetti.create(canvas, { resize: true })({
      particleCount: 190,
      spread: 180,
      origin: { y: 0.5 },
    })
  }

  return (
    <>
      <button type="button" className="button" onClick={handleConfetti}>
        폭죽 효과
      </button>
      <canvas
        ref={canvasRef}
        style={{ position: 'absolute', top: 0, left: 0, zIndex: -1, ...size }}
      ></canvas>
    </>
  )
}

// --------------------------------------------------------------------------

function DOMRefDemo() {
  const [attach, setAttach] = useState<boolean>(true)

  // const pRef = useRef(null)
  // const intervalRef = useRef()

  // DOM 참조 (컴포넌트 렌더링 결과로 실제 DOM 요소에 접근)
  const pRef = useRef<HTMLParagraphElement>(null)

  // 값 참조 (웹 API의 타이머 값 참조)
  const intervalRef = useRef<Timeout>(undefined)

  useEffect(() => {
    const pElement = pRef.current

    pElement?.setAttribute('tabindex', '-1')
    pElement?.focus()

    intervalRef.current = setInterval(() => {
      console.log(new Date().toLocaleTimeString())
    }, 1000)

    return () => {
      clearInterval(intervalRef.current)
    }
  }, [])

  return (
    <LearnSection title="DOM 참조" showTitle={false}>
      <div className="paragraphes space-y-2 [&_p]:text-gray-700 [&_p]:font-semibold">
        {attach && (
          <div className="bg-amber-300 p-5 pt-2.5 my-2">
            <p
              ref={pRef}
              className="focus:outline-16 outline-offset-4 outline-blue-500/40"
            >
              하나
            </p>
            <button
              className="button mt-2"
              onClick={() => {
                setAttach((a) => !a)
                clearInterval(intervalRef.current)
              }}
            >
              토글
            </button>
          </div>
        )}
        <p>둘</p>
        <p>셋</p>
      </div>
    </LearnSection>
  )
}
