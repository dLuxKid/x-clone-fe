export default function PageLoader() {
  return (
    <div className="fixed top-0 right-0 left-0 bottom-0 bg-black p-12 flex items-center justify-center">
      <div className="animate-pulse">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 30 30"
          width="120px"
          height="120px"
          fill="#fff"
        >
          <path d="M26.37,26l-8.795-12.822l0.015,0.012L25.52,4h-2.65l-6.46,7.48L11.28,4H4.33l8.211,11.971L12.54,15.97L3.88,26h2.65 l7.182-8.322L19.42,26H26.37z M10.23,6l12.34,18h-2.1L8.12,6H10.23z" />
        </svg>
      </div>
    </div>
  );
}
