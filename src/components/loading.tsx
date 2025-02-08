
import { Ripple } from "@/components/ripple";
 
export default function Loading() {
  return (
    <div className='w-full h-screen flex flex-col items-center justify-center bg-muted'>
    <p className="z-10 whitespace-pre-wrap text-center text-2xl font-medium tracking-tighter text-default-500">
        Access Meeting ...
      </p>
      <Ripple />
    </div>
  )
}

