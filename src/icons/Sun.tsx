export const Sun = ({ className }: { className?: string }) => (
  <svg
    fill='currentColor'
    stroke='currentColor'
    viewBox='0 0 512 512'
    className={className}
  >
    <path
      fill='none'
      strokeLinecap='round'
      strokeMiterlimit='10'
      strokeWidth='32'
      d='M256 48v48m0 320v48m147.08-355.08l-33.94 33.94M142.86 369.14l-33.94 33.94M464 256h-48m-320 0H48m355.08 147.08l-33.94-33.94M142.86 142.86l-33.94-33.94'
    />

    <circle
      cx='256'
      cy='256'
      r='80'
      fill='none'
      strokeLinecap='round'
      strokeMiterlimit='10'
      strokeWidth='32'
    />
  </svg>
)
