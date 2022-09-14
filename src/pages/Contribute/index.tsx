import pixImg from '@images/pix.png'

export function Contribute() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4">
      <div className="mx-auto flex w-1/2 flex-col items-center justify-center">
        <h2 className="text-center text-2xl text-text">
          Contribua com o projeto :)
        </h2>
        <img src={pixImg} alt="" />
      </div>
    </div>
  )
}
