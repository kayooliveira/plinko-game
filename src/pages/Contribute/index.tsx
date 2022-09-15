import pixImg from '@images/pix.png'

export function Contribute() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4">
      <div className="mx-auto flex w-1/2 flex-col items-center justify-center">
        <h2 className="mb-4 flex items-center gap-2 text-center text-xl font-bold text-text">
          Escaneie ou clique no código QR
        </h2>
        <figure>
          <a
            target="_blank"
            href="https://nubank.com.br/pagar/1gxxvt/tqsknp2jam"
            rel="noreferrer"
          >
            <img src={pixImg} alt="" />
          </a>
          <figcaption className="text-center text-text"></figcaption>
        </figure>
        <div className="mt-4">
          <span className="block text-center text-sm font-bold text-text">
            ou copie a chava PIX
          </span>
          <span className="block text-center text-xl font-bold text-purple">
            pix@kayooliveira.com
          </span>
        </div>
      </div>
    </div>
  )
}
